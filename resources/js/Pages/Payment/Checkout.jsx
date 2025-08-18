import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { router } from '@inertiajs/react';
import Header from '@/Components/header/header';
import Footer from '@/Components/footer/footer';

// Load Stripe outside of components to avoid recreating Stripe object
let stripePromise;
function getStripePromise(stripeKeyFromProps) {
    const key = stripeKeyFromProps || import.meta.env.VITE_STRIPE_KEY;
    if (!key) return null;
    if (!stripePromise) {
        stripePromise = loadStripe(key);
    }
    return stripePromise;
}

const CheckoutForm = ({ product, clientSecret }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (!stripe || !elements) {
            return;
        }

        setProcessing(true);

        const { error: submitError } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/payment/complete?redirect=purchasehistory`,
            },
        });

        if (submitError) {
            setError(submitError.message);
            setProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="text-xl font-bold text-[#FF2AA1]">¥{product.price}</div>
            </div>

            <PaymentElement />

            {error && (
                <div className="text-red-500 mt-4">
                    {error}
                </div>
            )}

            <button
                type="submit"
                disabled={!stripe || processing}
                className={`w-full mt-6 px-6 py-3 rounded-lg text-white font-bold ${
                    processing ? 'bg-gray-400' : 'bg-[#FF2AA1] hover:bg-opacity-90'
                }`}
            >
                {processing ? '処理中...' : '支払う'}
            </button>
        </form>
    );
};

const Checkout = ({ product, clientSecret, stripeKey }) => {
    const options = {
        clientSecret,
        appearance: {
            theme: 'stripe',
            variables: {
                colorPrimary: '#FF2AA1',
            },
        },
    };

    const stripe = getStripePromise(stripeKey);

    if (!stripe) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Header />
                <main className="container mx-auto px-4 py-12">
                    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
                        <h1 className="text-2xl font-bold mb-4">設定エラー</h1>
                        <p className="text-gray-600">Stripeの公開キーが設定されていません。STRIPE_KEY または VITE_STRIPE_KEY を設定してください。</p>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="container mx-auto px-4 py-12">
                <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
                    <h1 className="text-3xl font-bold text-center mb-8">お支払い</h1>
                    <Elements stripe={stripe} options={options}>
                        <CheckoutForm product={product} clientSecret={clientSecret} />
                    </Elements>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Checkout;
