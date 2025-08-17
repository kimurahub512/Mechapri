<?php

namespace App\Http\Middleware;

use Closure;
use Stripe\Webhook;
use Stripe\Exception\SignatureVerificationException;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class VerifyStripeSignature
{
    public function handle(Request $request, Closure $next): Response
    {
        if (!$request->header('Stripe-Signature')) {
            return response()->json(['error' => 'Stripe signature not found.'], 400);
        }

        try {
            Webhook::constructEvent(
                $request->getContent(),
                $request->header('Stripe-Signature'),
                config('cashier.webhook.secret')
            );
        } catch (SignatureVerificationException $e) {
            return response()->json(['error' => 'Invalid signature.'], 400);
        }

        return $next($request);
    }
}
