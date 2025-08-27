import React from 'react';
import { Head } from '@inertiajs/react';
import Header from '@/Components/header/header';
import Footer from '@/Components/footer/footer';

const Tokushoho = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Head title="特定商取引法に基づく表示 - めちゃプリ" />
            <Header />

            <main className="pb-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                                                 <div className="px-6 py-8">
                             <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                                 特定商取引に関する法律に基づく表示
                             </h1>
                             
                             <div className="prose prose-lg max-w-none">
                                 <div className="space-y-6">
                                     <div className="border-b border-gray-200 pb-4">
                                         <h2 className="text-xl font-semibold text-gray-800 mb-2">提供事業者名</h2>
                                         <p className="text-gray-600">OverX株式会社</p>
                                     </div>
                                     
                                     <div className="border-b border-gray-200 pb-4">
                                         <h2 className="text-xl font-semibold text-gray-800 mb-2">業務の責任者</h2>
                                         <p className="text-gray-600">KH・リー</p>
                                     </div>
                                     
                                     <div className="border-b border-gray-200 pb-4">
                                         <h2 className="text-xl font-semibold text-gray-800 mb-2">営業所在地</h2>
                                         <p className="text-gray-600">東京都豊島区東池袋1-34-5 いちご東池袋ビル6階</p>
                                     </div>
                                     
                                     <div className="border-b border-gray-200 pb-4">
                                         <h2 className="text-xl font-semibold text-gray-800 mb-2">電子メールアドレス</h2>
                                         <p className="text-gray-600">contact@over-x.tech</p>
                                     </div>
                                     
                                     <div className="border-b border-gray-200 pb-4">
                                         <h2 className="text-xl font-semibold text-gray-800 mb-2">営業時間</h2>
                                         <p className="text-gray-600">11:00～16:00（土日、祝祭日および夏季休業、年末年始は除く）</p>
                                     </div>
                                     
                                     <div className="border-b border-gray-200 pb-4">
                                         <h2 className="text-xl font-semibold text-gray-800 mb-2">申込方法及び役務の提供時期について</h2>
                                         <p className="text-gray-600">サービスを通じて申込み頂き、所定の手続きを完了することで、本サービスをご利用頂くことができます。</p>
                                     </div>
                                     
                                     <div className="border-b border-gray-200 pb-4">
                                         <h2 className="text-xl font-semibold text-gray-800 mb-2">販売価格又は役務の対価について</h2>
                                         <p className="text-gray-600">
                                             • 各商品ページにて販売価格をご確認ください<br />
                                             • 通信料<br />
                                             • マルチコピー機におけるプリント料金
                                         </p>
                                     </div>
                                     
                                     <div className="border-b border-gray-200 pb-4">
                                         <h2 className="text-xl font-semibold text-gray-800 mb-2">消費税について</h2>
                                         <p className="text-gray-600">当社の商品価格は、すべて税込表示となります。</p>
                                     </div>
                                     
                                     <div className="border-b border-gray-200 pb-4">
                                         <h2 className="text-xl font-semibold text-gray-800 mb-2">対価の支払時期及び方法</h2>
                                         <p className="text-gray-600">
                                             商品購入はサービスページ内の各商品ページにてお支払いください。<br />
                                             印刷時に印刷料金を株式会社セブン-イレブン・ジャパン、株式会社ローソン、株式会社ファミリーマート、株式会社ポプラ、またはミニストップ株式会社が日本国内に展開する店舗に設置された複写機にてお支払いください。<br />
                                             ※一部店舗ではご利用頂けない場合があります。
                                         </p>
                                     </div>
                                     
                                     <div className="border-b border-gray-200 pb-4">
                                         <h2 className="text-xl font-semibold text-gray-800 mb-2">返品対応について</h2>
                                         <p className="text-gray-600">
                                             デジタルコンテンツの性質上、ユーザー都合での、キャンセルや返品はできません。<br />
                                             エラー・不具合については、商品の状態をできるだけ詳しく明記した上で、お問い合わせフォームからご連絡ください。
                                         </p>
                                     </div>
                                     
                                     <div className="border-b border-gray-200 pb-4">
                                         <h2 className="text-xl font-semibold text-gray-800 mb-2">動作環境</h2>
                                         <p className="text-gray-600">
                                             推奨動作環境は以下のとおりです。<br />
                                             (1)スマートフォン<br />
                                             iOS12以降<br />
                                             Android7.0以降<br />
                                             (2)ブラウザ版推奨環境<br />
                                             Google Chrome 最新版、Microsoft Edge 最新版、Safari 最新版
                                         </p>
                                     </div>
                                     
                                     <div className="border-b border-gray-200 pb-4">
                                         <h2 className="text-xl font-semibold text-gray-800 mb-2">準拠法および管轄裁判所について</h2>
                                         <p className="text-gray-600">日本法に準拠し、紛争が生じた場合は東京地方裁判所または東京簡易裁判所を専属的合意管轄裁判所とします。</p>
                                     </div>
                                     
                                     <div className="pb-4">
                                         <h2 className="text-xl font-semibold text-gray-800 mb-2">お問い合わせ先</h2>
                                         <p className="text-gray-600">
                                             カスタマーセンター<br />
                                             contact@over-x.tech<br />
                                             【営業時間】11：00～16：00（土日、祝祭日および夏季休業、年末年始は除く）
                                         </p>
                                     </div>
                                 </div>
                             </div>
                         </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Tokushoho;
