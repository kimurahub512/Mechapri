import React from 'react';
import { Link } from '@inertiajs/react';
import Header from '@/Components/header/header';
import Footer from '@/Components/footer/footer';

const Failed = ({ error }) => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="container mx-auto px-4 py-12">
                <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>

                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        お支払いに失敗しました
                    </h1>

                    <p className="text-gray-600 mb-8">
                        {error || 'エラーが発生しました。もう一度お試しください。'}
                    </p>

                    <div className="flex justify-center gap-4">
                        <Link
                            href={route('dashboard')}
                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#FF2AA1] hover:bg-opacity-90"
                        >
                            ダッシュボードへ戻る
                        </Link>
                        <button
                            onClick={() => window.history.back()}
                            className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                            戻る
                        </button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Failed;
