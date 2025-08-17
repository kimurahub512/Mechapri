import React from 'react';
import { Link } from '@inertiajs/react';
import Header from '@/Components/header/header';
import Footer from '@/Components/footer/footer';

const Success = ({ payment }) => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="container mx-auto px-4 py-12">
                <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>

                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        お支払いが完了しました
                    </h1>

                    <p className="text-gray-600 mb-8">
                        ご購入ありがとうございます。商品の詳細は以下でご確認いただけます。
                    </p>

                    <div className="bg-gray-50 rounded-lg p-6 mb-8">
                        <h2 className="text-xl font-bold mb-4">{payment.productBatch.title}</h2>
                        <p className="text-gray-600 mb-2">金額: ¥{payment.amount}</p>
                        <p className="text-gray-600">支払日: {new Date(payment.paid_at).toLocaleDateString('ja-JP')}</p>
                    </div>

                    <div className="flex justify-center gap-4">
                        <Link
                            href={route('product.purchased', { id: payment.product_batch_id })}
                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#FF2AA1] hover:bg-opacity-90"
                        >
                            商品を見る
                        </Link>
                        <Link
                            href={route('dashboard')}
                            className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                            ダッシュボードへ
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Success;
