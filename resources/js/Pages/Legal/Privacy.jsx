import React from 'react';
import { Head } from '@inertiajs/react';
import Header from '@/Components/header/header';
import Footer from '@/Components/footer/footer';

const Privacy = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Head title="プライバシーポリシー - めちゃプリ" />
            <Header />

            <main className="pb-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                                                 <div className="px-6 py-8">
                             <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                                 『めちゃプリ』プライバシーポリシー
                             </h1>
                             
                             <div className="prose prose-lg max-w-none">
                                 <div className="space-y-6">
                                     <div className="pb-4">
                                         <p className="text-gray-600 leading-relaxed">
                                             OverX株式会社（以下「当社」といいます）が運営する『めちゃプリ』（以下「本サービス」といいます）は、本サービスのユーザー（本サービスを利用する者をいいます。以下同じ）のプライバシーを尊重し、 ユーザーの個人情報の保護に細心の注意を払い適切に管理するものとします。
                                         </p>
                                     </div>
                                     
                                     <div className="border-b border-gray-200 pb-4">
                                         <h2 className="text-xl font-semibold text-gray-800 mb-2">1. 個人情報の定義</h2>
                                         <p className="text-gray-600">
                                             個人情報とは、個人に関する情報であり、当該情報に含まれる氏名、生年月日、性別その他の記述等により特定の個人を識別することができるもの（他の情報と容易に照合することができ、 それにより特定の個人を識別することができることとなるものを含む。）を指します。
                                         </p>
                                     </div>
                                     
                                     <div className="border-b border-gray-200 pb-4">
                                         <h2 className="text-xl font-semibold text-gray-800 mb-2">2. 個人情報の適正な取得に関して</h2>
                                         <p className="text-gray-600">当社は、適法、かつ公正な手段によって個人情報を取得いたします。</p>
                                     </div>
                                     
                                     <div className="border-b border-gray-200 pb-4">
                                         <h2 className="text-xl font-semibold text-gray-800 mb-2">3. 個人情報利用目的に関して</h2>
                                         <p className="text-gray-600">
                                             当社は、ユーザーの個人情報を、以下の目的で利用いたします。<br />
                                             • ユーザーが本サービスを円滑に利用できるようにするため<br />
                                             • 本サービス利用に関する統計データを作成するため<br />
                                             • ユーザーからのお問い合わせに対応するため<br />
                                             • 本サービスに関する企画立案を行いユーザーに提供するため<br />
                                             • キャンペーン等の抽選及び賞品発送のため<br />
                                             • その他、重要なお知らせなど、必要に応じた連絡をにユーザー行うため<br />
                                             • 広告配信の最適化のため
                                         </p>
                                     </div>
                                     
                                     <div className="border-b border-gray-200 pb-4">
                                         <h2 className="text-xl font-semibold text-gray-800 mb-2">4. 個人情報利用目的の変更に関して</h2>
                                         <p className="text-gray-600">
                                             当社は、個人情報の利用目的を相当の関連性を有すると合理的に認められる範囲内において変更できるものとし、 変更した場合には本サービス上に公表及び本プライバシーポリシーを更新することで、ユーザーに通知します。
                                         </p>
                                     </div>
                                     
                                     <div className="border-b border-gray-200 pb-4">
                                         <h2 className="text-xl font-semibold text-gray-800 mb-2">5. 個人情報利用の制限に関して</h2>
                                         <p className="text-gray-600">
                                             当社は、法令により許容される場合を除き、ユーザーの同意を得ず、取得した個人情報の目的外利用はいたしません。
                                         </p>
                                     </div>
                                     
                                     <div className="border-b border-gray-200 pb-4">
                                         <h2 className="text-xl font-semibold text-gray-800 mb-2">6. 個人情報の安全管理に関して</h2>
                                         <p className="text-gray-600">
                                             当社は、個人情報の正確性を保つよう努力すると同時に、個人情報の安全管理のための対策を実施し、 個人情報への不正アクセス、個人情報の紛失、破壊、改竄及び漏洩を防止すると共に、必要に応じて改善を行います。
                                         </p>
                                     </div>
                                     
                                     <div className="border-b border-gray-200 pb-4">
                                         <h2 className="text-xl font-semibold text-gray-800 mb-2">7. 第三者提供に関して</h2>
                                         <p className="text-gray-600">
                                             当社は、あらかじめユーザーの同意を得ることなく、第三者への個人情報の提供はいたしません。 但し、以下の場合には提供、開示することがあります。<br />
                                             • 「個人情報利用目的」に定めた内容の実行にあたり、当社の関係会社、当社が秘密保持義務を課して業務委託している企業に作業を委託する場合<br />
                                             • 官公庁により開示を要求された場合で、法令上の開示義務がある場合
                                         </p>
                                     </div>
                                     
                                     <div className="border-b border-gray-200 pb-4">
                                         <h2 className="text-xl font-semibold text-gray-800 mb-2">8. Cookie（クッキー）その他の技術の利用に関して</h2>
                                         <p className="text-gray-600">
                                             当社は、本サービスの運営において、Cookie及びこれに類する技術を利用することがあります。 これらの技術は、当社サービスの利用状況等の把握に役立ち、サービス向上に資するものです。 Cookieを無効化されたいユーザーは、ウェブブラウザの設定を変更することによりCookieを無効化することができます。 但し、Cookieを無効化することにより、本サービスの一部の機能をご利用いただけなくなる場合があります。<br /><br />
                                             また当社では、本サービスに対し、第三者から配信される広告を掲載する場合があります。 その際、当該第三者が本サービスのユーザーのCookie情報等を取得する場合があり、取得されたCookie情報等は当該第三者のプライバシーポリシーに従って取り扱われます。 なお、Cookie情報等の広告配信への利用は停止することができます。Cookie情報等によってユーザーを特定したり、プライバシーを侵害したりすることはありません。
                                         </p>
                                     </div>
                                     
                                     <div className="border-b border-gray-200 pb-4">
                                         <h2 className="text-xl font-semibold text-gray-800 mb-2">9. 外部サービスの利用について</h2>
                                         <p className="text-gray-600">
                                             本サービスのリンク先のｗebページは、本サービスとは異なるサービス（以下、外部サービスという）である場合があります。 当社は、外部サービスについていかなる責任も負いません。 ユーザーは、外部サービスを利用する場合は、当該外部サービスに定める利用規約・プライバシーポリシー等各種規約に従うものとします。
                                         </p>
                                     </div>
                                     
                                     <div className="border-b border-gray-200 pb-4">
                                         <h2 className="text-xl font-semibold text-gray-800 mb-2">10. 本プライバシーポリシーの変更に関して</h2>
                                         <p className="text-gray-600">
                                             当社は、本サービス内容の変更、又は情報通信技術の進歩等に応じ合理的必要性に基づいて適宜内容の見直しを行い、 必要に応じて、本プライバシーポリシーを変更することがあります。
                                         </p>
                                     </div>
                                     
                                     <div className="border-b border-gray-200 pb-4">
                                         <h2 className="text-xl font-semibold text-gray-800 mb-2">11. 苦情・相談に関して</h2>
                                         <p className="text-gray-600">
                                             本プライバシーポリシー及び本サービスにおける個人情報の取り扱いに関する、苦情・相談・お問合せについては、適切かつ速やかに対応いたします。
                                         </p>
                                     </div>
                                     
                                     <div className="pt-4">
                                         <p className="text-gray-600 text-right">
                                             2025年8月1日　制定
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

export default Privacy;
