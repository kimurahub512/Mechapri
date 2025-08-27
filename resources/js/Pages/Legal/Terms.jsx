import React from 'react';
import { Head } from '@inertiajs/react';
import Header from '@/Components/header/header';
import Footer from '@/Components/footer/footer';

const Terms = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Head title="利用規約 - めちゃプリ" />
            <Header />

            <main className="pb-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="px-6 py-8">
                            <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                                『めちゃプリ』利用規約
                            </h1>
                            
                            <div className="prose prose-lg max-w-none">
                                <div className="space-y-6">
                                    <div className="border-b border-gray-200 pb-4">
                                        <h2 className="text-xl font-semibold text-gray-800 mb-2">第1条（本規約の適用）</h2>
                                        <p className="text-gray-600">
                                            本規約は、OverX株式会社（以下「当社」といいます）が運営する「めちゃプリ」（以下「本サービス」といいます）に関する利用条件を定めるものです。ユーザーは、本サービスを利用することにより、本規約および本サービスと連携するAPIの利用に関する定めにも同意したものとみなされます。本規約は、当社とユーザーとの間の本サービスの利用に関する一切の関係に適用されます。
                                        </p>
                                    </div>
                                    
                                    <div className="border-b border-gray-200 pb-4">
                                        <h2 className="text-xl font-semibold text-gray-800 mb-2">第2条（用語の定義）</h2>
                                        <p className="text-gray-600">
                                            本規約における主な用語の定義は以下のとおりとします。<br />
                                            (1)「画像等データ」：イラスト、写真、テキスト等、本サービス上で投稿または共有されるすべての情報<br />
                                            (2)「登録ユーザー」：所定の手続きを経て登録を完了したユーザー<br />
                                            (3)「未登録ユーザー」：本サービスを利用するが登録手続きを完了していないユーザー<br />
                                            (4)「ユーザー」：登録ユーザーおよび未登録ユーザー
                                        </p>
                                    </div>
                                    
                                    <div className="border-b border-gray-200 pb-4">
                                        <h2 className="text-xl font-semibold text-gray-800 mb-2">第3条（規約の変更）</h2>
                                        <p className="text-gray-600">
                                            当社は、当社が必要と判断する場合、あらかじめユーザーに通知することなく、いつでも、本規約を変更できるものとします。当社が本規約を変更した時点からその効力が生じるものとし、ユーザーは本規約の変更後も本サービスを利用することにより、変更後の本規約に対する有効かつ取消不能な同意をしたものとみなされます。かかる変更の内容をユーザーに個別に通知することはいたしかねますので、本サービスをご利用の際には、随時、最新の本規約をご参照ください。
                                        </p>
                                    </div>
                                    
                                    <div className="border-b border-gray-200 pb-4">
                                        <h2 className="text-xl font-semibold text-gray-800 mb-2">第4条（サービス内容の変更）</h2>
                                        <p className="text-gray-600">
                                            当社は、ユーザーの事前の承諾を要することなく、本サービスの内容を変更することができるものとします。ユーザーはこれに異議を述べないものとします。
                                        </p>
                                    </div>
                                    
                                    <div className="border-b border-gray-200 pb-4">
                                        <h2 className="text-xl font-semibold text-gray-800 mb-2">第5条（サービスの中断・終了）</h2>
                                        <p className="text-gray-600">
                                            当社は、以下のいずれかの事由が生じた場合、本サービスの全部または一部の提供を停止または終了することができるものとします。<br />
                                            (1) システム保守、障害対応、ネットワーク負荷の増大等、やむを得ない事情がある場合<br />
                                            (2) 外部システムの停止または連携不能となった場合<br />
                                            (3) サイバー攻撃、自然災害、疫病、戦争その他の非常事態によりサービス提供が困難となった場合<br />
                                            (4) その他、当社が合理的にサービス提供の継続が困難と判断した場合
                                        </p>
                                    </div>
                                    
                                    <div className="border-b border-gray-200 pb-4">
                                        <h2 className="text-xl font-semibold text-gray-800 mb-2">第6条（業務委託）</h2>
                                        <p className="text-gray-600">
                                            当社は、本サービスの運営に関する業務の全部または一部を、第三者に委託することがあります。
                                        </p>
                                    </div>
                                    
                                    <div className="border-b border-gray-200 pb-4">
                                        <h2 className="text-xl font-semibold text-gray-800 mb-2">第7条（料金）</h2>
                                        <p className="text-gray-600">
                                            本サービスの基本的な利用は無料ですが、プリント代金、通信費、インターネット接続費、販売手数料等は、すべてユーザーの負担とします。
                                        </p>
                                    </div>
                                    
                                    <div className="border-b border-gray-200 pb-4">
                                        <h2 className="text-xl font-semibold text-gray-800 mb-2">第8条（ユーザー間の有償提供）</h2>
                                        <p className="text-gray-600">
                                            登録ユーザーは、自ら投稿した画像等データに対して、他の登録ユーザーに印刷番号等を通じて有償提供することができます。<br /><br />
                                            2. 売買契約は、購入手続きの完了をもって成立するものとします。<br />
                                            3. 販売価格は50円から100,000円までの範囲で販売ユーザーが自由に設定可能とし、税込表示とします。<br />
                                            4. 当社は、購入代金を回収し販売ユーザーへ送金しますが、その義務は保証しません。<br />
                                            5. 振込手数料は販売ユーザー負担とします。また、口座情報の不備により送金できない場合も同様とします。<br />
                                            6. 代金の支払いは、毎月末日時点の収益残高が5,000円以上である登録ユーザーに対し、翌月から起算して45営業日以内に、登録ユーザー指定の方法で支払うものとします。収益残高が5,000円未満である場合は、その金額は翌月以降に繰り越され、残高が5,000円以上となった時点で支払いが実行されます。<br />
                                            7. 退会時に未収金が5,000円未満の場合は放棄されたものとみなします。<br />
                                            8. 当社は、販売ユーザーの売上の一部を、販売手数料として徴収するものとします。手数料の割合および算出方法は、当社が別途定める方針に従うものとします。<br />
                                            9. 最後に売上が発生した月の末日より180日間売上受取申請が行われなかった場合、販売ユーザーは当該支払い請求権を放棄したものとみなします。<br />
                                            10. 提供される印刷番号や閲覧権限は著作権譲渡を意味せず、コンテンツの権利は販売ユーザーに帰属します。<br />
                                            11. ユーザー間でのトラブルは当事者間で解決し、当社は一切の責任を負いません。<br />
                                            12. 販売ユーザーは、法令（特定商取引法など）を遵守し、必要な表示義務を果たすものとします。
                                        </p>
                                    </div>
                                    
                                    <div className="border-b border-gray-200 pb-4">
                                        <h2 className="text-xl font-semibold text-gray-800 mb-2">第9条（支払い方法）</h2>
                                        <p className="text-gray-600">
                                            1. 有料サービスや画像等データの購入代金は、当社が指定する決済方法で支払うものとします。<br />
                                            2. 決済トラブルについて、当社は責任を負いません。<br />
                                            3. クレジットカードの利用条件は発行会社に準じ、当社は不正使用と判断した場合に利用を拒否できます。
                                        </p>
                                    </div>
                                    
                                    <div className="border-b border-gray-200 pb-4">
                                        <h2 className="text-xl font-semibold text-gray-800 mb-2">第10条（登録）</h2>
                                        <p className="text-gray-600">
                                            ユーザーは、本規約に同意のうえ、当社所定の方法で会員登録を申請するものとします。当社は、申請内容を審査し、不適当と判断した場合は、承諾を取り消すことができます。
                                        </p>
                                    </div>
                                    
                                    <div className="border-b border-gray-200 pb-4">
                                        <h2 className="text-xl font-semibold text-gray-800 mb-2">第11条（承諾取り消し）</h2>
                                        <p className="text-gray-600">
                                            当社は、前条に基づき会員登録を承諾した後でも、事後に不適切と判断した場合は、会員登録の取消を行うことがあります。
                                        </p>
                                    </div>
                                    
                                    <div className="border-b border-gray-200 pb-4">
                                        <h2 className="text-xl font-semibold text-gray-800 mb-2">第12条（登録期間）</h2>
                                        <p className="text-gray-600">
                                            登録の有効期間は無期限とします。ただし、当社が必要と認めた場合には当社の判断により登録を解除できるものとします。
                                        </p>
                                    </div>
                                    
                                    <div className="border-b border-gray-200 pb-4">
                                        <h2 className="text-xl font-semibold text-gray-800 mb-2">第13条（登録情報の変更）</h2>
                                        <p className="text-gray-600">
                                            登録ユーザーは、登録情報に変更があった場合は速やかに所定の方法で変更手続きを行うものとします。
                                        </p>
                                    </div>
                                    
                                    <div className="border-b border-gray-200 pb-4">
                                        <h2 className="text-xl font-semibold text-gray-800 mb-2">第14条（退会）</h2>
                                        <p className="text-gray-600">
                                            登録ユーザーがアカウントを削除した時点で退会の申し出があったものとみなし、当社はデータを削除することができます。
                                        </p>
                                    </div>
                                    
                                    <div className="border-b border-gray-200 pb-4">
                                        <h2 className="text-xl font-semibold text-gray-800 mb-2">第15条（権利帰属）</h2>
                                        <p className="text-gray-600">
                                            投稿された画像等データの著作権は投稿者に帰属します。ただし、サービス運営上必要な範囲での使用・表示を当社に許諾するものとします。<br /><br />
                                            2. 利用者は、当社が本サービスの運営、機能改善、広告宣伝等の目的で、投稿された画像等データを、無償で使用（複製、編集、公開、配信、掲載等を含みます）することをあらかじめ許諾したものとします。なお、当社はその際、著作者人格権を侵害しない範囲で利用するものとします。
                                        </p>
                                    </div>
                                    
                                    <div className="border-b border-gray-200 pb-4">
                                        <h2 className="text-xl font-semibold text-gray-800 mb-2">第16条（遵守事項）</h2>
                                        <p className="text-gray-600">
                                            ユーザーは以下の事項を遵守してください：<br />
                                            • 権利を持たないデータの使用は規約確認を必須とすること<br />
                                            • アカウント情報の適切な管理<br />
                                            • 他人が推測しにくいパスワードの設定<br />
                                            • 投稿データの適切なフィルタリング<br />
                                            • SNS等における発言の自己責任による管理<br />
                                            • 自己責任にて必要な機器環境の整備<br />
                                            • ウイルス対策<br />
                                            • セキュリティ対策の実施<br />
                                            • ガイドラインや当社の指示に従うこと
                                        </p>
                                    </div>
                                    
                                    <div className="border-b border-gray-200 pb-4">
                                        <h2 className="text-xl font-semibold text-gray-800 mb-2">第17条（禁止事項）</h2>
                                        <p className="text-gray-600">
                                            ユーザーは、本サービスの利用に際して、以下に記載することを行なってはなりません。<br /><br />
                                            1. 法令、裁判所の判決、決定もしくは命令、または法令上拘束力のある行政措置に違反する行為<br />
                                            2. 公の秩序または善良の風俗を害するおそれのある行為<br />
                                            3. 当社または第三者の著作権、商標権、特許権等の知的財産権、名誉権、プライバシー権、その他法令上または契約上の権利を侵害する行為<br />
                                            4. 過度に暴力的な表現、露骨な性的表現、人種、国籍、信条、性別、社会的身分、門地等による差別につながる表現、自殺、自傷行為、薬物乱用を誘引または助長する表現、その他反社会的な内容を含み他人に不快感を与える表現を、投稿または送信する行為<br />
                                            5. 当社または第三者になりすます行為または意図的に虚偽の情報を流布させる行為<br />
                                            6. 勧誘、性行為やわいせつな行為を目的とする行為、他のユーザーに対する嫌がらせや誹謗中傷を目的とする行為、その他本サービスが予定している利用目的と異なる目的で本サービスを利用する行為<br />
                                            7. 反社会的勢力に対する利益供与その他の協力行為<br />
                                            8. 宗教活動または宗教団体への勧誘行為<br />
                                            9. 他人の個人情報、登録情報、利用履歴情報などを、不正に収集、開示または提供する行為<br />
                                            10. 本サービスのサーバやネットワークシステムに支障を与える行為、BOT、チートツール、その他の技術的手段を利用してサービスを不正に操作する行為、本サービスの不具合を意図的に利用する行為、同様の質問を必要以上に繰り返す等、当社に対し不当な問い合わせまたは要求をする行為、その他当社による本サービスの運営または他のユーザーによる本サービスの利用を妨害し、これらに支障を与える行為<br />
                                            11. 上記1から10のいずれかに該当する行為を援助または助長する行為<br />
                                            12. その他、当社が不適切と判断した行為
                                        </p>
                                    </div>
                                    
                                    <div className="border-b border-gray-200 pb-4">
                                        <h2 className="text-xl font-semibold text-gray-800 mb-2">第18条（個人情報）</h2>
                                        <p className="text-gray-600">
                                            当社は、プライバシーポリシーに従って、ユーザーの個人情報を適切に取り扱います。
                                        </p>
                                    </div>
                                    
                                    <div className="border-b border-gray-200 pb-4">
                                        <h2 className="text-xl font-semibold text-gray-800 mb-2">第19条（利用停止・登録解除）</h2>
                                        <p className="text-gray-600">
                                            当社は、以下に該当する場合、通知なくアカウントの停止や削除を行うことがあります：登録情報の虚偽、規約違反、権利侵害、公的機関からの指摘など。
                                        </p>
                                    </div>
                                    
                                    <div className="border-b border-gray-200 pb-4">
                                        <h2 className="text-xl font-semibold text-gray-800 mb-2">第20条（第三者サービス連携）</h2>
                                        <p className="text-gray-600">
                                            本サービスは外部サービス（例：ネットワークプリント、SNS等）と連携することがありますが、その継続性は保証されません。ユーザーは自己責任にて利用してください。
                                        </p>
                                    </div>
                                    
                                    <div className="border-b border-gray-200 pb-4">
                                        <h2 className="text-xl font-semibold text-gray-800 mb-2">第21条（免責）</h2>
                                        <p className="text-gray-600">
                                            本サービスの利用により発生した損害について、当社は一切の責任を負いません。<br /><br />
                                            2. 当社は、本サービスに事実上または法律上の瑕疵（安全性、信頼性、正確性、完全性、有効性、特定の目的への適合性、セキュリティなどに関する欠陥、エラーやバグ、権利侵害などを含みます。）がないことを明示的にも黙示的にも保証しておらず、また、かかる瑕疵を除去して提供する義務を負うものではありません。<br /><br />
                                            3. 当社は、本サービスに起因または関連してユーザーに生じた一切の損害について、いかなる責任も負わないものとします。
                                        </p>
                                    </div>
                                    
                                    <div className="border-b border-gray-200 pb-4">
                                        <h2 className="text-xl font-semibold text-gray-800 mb-2">第22条（損害賠償）</h2>
                                        <p className="text-gray-600">
                                            ユーザーが当社に損害を与えた場合、当社は、損害額および関連費用（弁護士費用等）を請求できるものとします。
                                        </p>
                                    </div>
                                    
                                    <div className="border-b border-gray-200 pb-4">
                                        <h2 className="text-xl font-semibold text-gray-800 mb-2">第23条（反社会的勢力の排除）</h2>
                                        <p className="text-gray-600">
                                            ユーザーは、暴力団等の反社会的勢力と関係を持たないことを表明・保証し、将来も関与しないことを誓約します。違反が判明した場合、当社はアカウントを解除することができます。
                                        </p>
                                    </div>
                                    
                                    <div className="border-b border-gray-200 pb-4">
                                        <h2 className="text-xl font-semibold text-gray-800 mb-2">第24条（権利義務の譲渡）</h2>
                                        <p className="text-gray-600">
                                            ユーザーは、当社の事前の承諾なく、本サービスに関する権利・義務を第三者に譲渡・処分できません。
                                        </p>
                                    </div>
                                    
                                    <div className="border-b border-gray-200 pb-4">
                                        <h2 className="text-xl font-semibold text-gray-800 mb-2">第25条（分離可能性）</h2>
                                        <p className="text-gray-600">
                                            本規約の一部が無効であると判断された場合でも、その他の条項は有効に存続するものとします。
                                        </p>
                                    </div>
                                    
                                    <div className="border-b border-gray-200 pb-4">
                                        <h2 className="text-xl font-semibold text-gray-800 mb-2">第26条（存続条項）</h2>
                                        <p className="text-gray-600">
                                            本サービスの終了後も、一部の条項（料金、知的財産、免責、損害賠償など）は引き続き効力を有します。
                                        </p>
                                    </div>
                                    
                                    <div className="border-b border-gray-200 pb-4">
                                        <h2 className="text-xl font-semibold text-gray-800 mb-2">第27条（準拠法および管轄）</h2>
                                        <p className="text-gray-600">
                                            本規約は日本法に準拠し、紛争が生じた場合は東京地方裁判所または東京簡易裁判所を専属的合意管轄裁判所とします。
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

export default Terms;
