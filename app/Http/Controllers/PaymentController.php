<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Models\ProductBatch;
use App\Models\UserPurchasedProduct;
use App\Services\NWPSService;
use App\Jobs\UploadToNWPSJob;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Stripe\Stripe;
use Stripe\PaymentIntent;
use Stripe\Exception\ApiErrorException;

class PaymentController extends Controller
{
    public function __construct()
    {
        Stripe::setApiKey(config('cashier.secret'));
    }

    public function checkout(Request $request, ProductBatch $product)
    {
        try {
            // Create or retrieve Stripe Customer
            $stripeCustomer = $request->user()->createOrGetStripeCustomer();

            // Create Payment Intent
            $paymentIntent = PaymentIntent::create([
                'amount' => $product->price * 100, // Convert to cents
                'currency' => 'jpy',
                'customer' => $stripeCustomer->id,
                'automatic_payment_methods' => [
                    'enabled' => true,
                ],
                'metadata' => [
                    'product_id' => $product->id,
                    'user_id' => $request->user()->id,
                ],
            ]);

            // Create payment record
            Payment::create([
                'user_id' => $request->user()->id,
                'product_batch_id' => $product->id,
                'stripe_payment_id' => $paymentIntent->id,
                'stripe_customer_id' => $stripeCustomer->id,
                'amount' => $product->price,
                'currency' => 'jpy',
                'status' => 'pending',
            ]);

            return Inertia::render('Payment/Checkout', [
                'product' => $product,
                'clientSecret' => $paymentIntent->client_secret,
                'stripeKey' => config('services.stripe.key'),
            ]);

        } catch (ApiErrorException $e) {
            Log::error('Stripe error: ' . $e->getMessage());
            return back()->with('error', 'お支払い処理中にエラーが発生しました。');
        }
    }

    public function complete(Request $request)
    {
        $payment_intent = $request->get('payment_intent');
        
        try {
            $paymentIntent = PaymentIntent::retrieve($payment_intent);
            $payment = Payment::where('stripe_payment_id', $payment_intent)->first();

            if ($payment) {
                $payment->update([
                    'status' => $paymentIntent->status,
                    'payment_method_type' => $paymentIntent->payment_method_types[0],
                    'paid_at' => $paymentIntent->status === 'succeeded' ? now() : null,
                ]);

                if ($paymentIntent->status === 'succeeded') {
                    // Ensure a purchase is recorded (useful when webhooks are not configured locally)
                    try {
                        $product = ProductBatch::find($payment->product_batch_id);
                        if ($product) {
                            $purchase = UserPurchasedProduct::firstOrCreate(
                                [
                                    'user_id' => $payment->user_id,
                                    'batch_id' => $product->id,
                                ],
                                [
                                    'price' => $payment->amount,
                                    'cnt' => 0,
                                    'purchase_time' => now(),
                                    'nwps_upload_status' => 'pending',
                                    'print_status' => 'not_printed',
                                    'print_expires_at' => now()->addDays(30),
                                ]
                            );

                            if ($purchase->wasRecentlyCreated) {
                                $purchase->cnt = 1;
                                $purchase->save();
                            } else {
                                $purchase->increment('cnt');
                                $purchase->update([
                                    'purchase_time' => now(),
                                    'print_expires_at' => now()->addDays(30),
                                ]);
                            }

                            // Kick off NWPS upload
                            UploadToNWPSJob::dispatch($purchase->id);

                            // If requester asked to redirect to purchase history, do so with purchase id
                            if ($request->query('redirect') === 'purchasehistory') {
                                return redirect()->route('purchase.history', [
                                    'purchase_id' => $purchase->id,
                                ]);
                            }
                        }
                    } catch (\Throwable $e) {
                        Log::error('Failed to upsert purchase on complete(): ' . $e->getMessage());
                    }

                    return Inertia::render('Payment/Success', [
                        'payment' => $payment->load('productBatch'),
                    ]);
                }
            }

            return Inertia::render('Payment/Failed', [
                'error' => 'お支払いに失敗しました。'
            ]);

        } catch (ApiErrorException $e) {
            Log::error('Stripe error in webhook: ' . $e->getMessage());
            return Inertia::render('Payment/Failed', [
                'error' => 'お支払い処理中にエラーが発生しました。'
            ]);
        }
    }

    public function webhook(Request $request)
    {
        $payload = $request->getContent();
        $sig_header = $request->header('Stripe-Signature');

        try {
            $event = \Stripe\Webhook::constructEvent(
                $payload,
                $sig_header,
                config('cashier.webhook.secret')
            );

            switch ($event->type) {
                case 'payment_intent.succeeded':
                    $paymentIntent = $event->data->object;
                    $payment = Payment::where('stripe_payment_id', $paymentIntent->id)->first();
                    
                    if ($payment) {
                        $payment->update([
                            'status' => 'succeeded',
                            'paid_at' => now(),
                        ]);

                        // Create purchase record and initialize NWPS fields
                        try {
                            $product = ProductBatch::find($payment->product_batch_id);
                            if ($product) {
                                $purchase = UserPurchasedProduct::create([
                                    'user_id' => $payment->user_id,
                                    'batch_id' => $product->id,
                                    'price' => $payment->amount,
                                    'cnt' => 1,
                                    'purchase_time' => now(),
                                    'nwps_upload_status' => 'pending',
                                    'print_status' => 'not_printed',
                                    'print_expires_at' => now()->addDays(30),
                                ]);

                                // Trigger async job to upload to NWPS
                                UploadToNWPSJob::dispatch($purchase->id);
                            }
                        } catch (\Throwable $e) {
                            Log::error('Failed to create purchase or initialize NWPS: ' . $e->getMessage());
                        }
                    }
                    break;

                case 'payment_intent.payment_failed':
                    $paymentIntent = $event->data->object;
                    $payment = Payment::where('stripe_payment_id', $paymentIntent->id)->first();
                    
                    if ($payment) {
                        $payment->update([
                            'status' => 'failed',
                        ]);
                    }
                    break;
            }

            return response()->json(['status' => 'success']);

        } catch (\Exception $e) {
            Log::error('Webhook error: ' . $e->getMessage());
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }
}
