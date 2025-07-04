import Header from '@/Components/header/header';
import logo from '@/assets/images/mechapuri-logo.svg';
import '@/../css/registration.css';


export default function Register() {

    return (
        <>
            <Header />
            <div className="registration-container">
                <div className="registration-modal">
                    {/* X Button */}
                    <button
                        className="registration-close"
                        aria-label="Close registration"
                        onClick={() => window.location.href = '/'}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                            <g opacity="0.8">
                                <rect width="32" height="32" rx="16" fill="#E9E9E9" />
                                <rect x="11.0498" y="9.63965" width="16" height="2.00001" rx="1" transform="rotate(45 11.0498 9.63965)" fill="#969696" />
                                <rect x="9.63965" y="20.9502" width="16" height="2.00001" rx="1" transform="rotate(-45 9.63965 20.9502)" fill="#969696" />
                            </g>
                        </svg>
                    </button>
                    {/* Logo at the top */}
                    <img src={logo} alt="Mechapuri Logo" className="registration-logo" />
                    
                    {/* Registration form fields */}
                    <div className="registration-form">
                        <div className="registration-title">
                            新規会員登録
                        </div>
                        <div className="registration-label">
                            メールアドレスを入力
                        </div>
                        <input
                            type="email"
                            placeholder="example@email.com"
                            className="registration-input placeholder-styled"
                        />
                        <div className="registration-label">
                            パスワードを入力
                        </div>
                        <input
                            type="password"
                            placeholder="半角英数字8文字以上"
                            className="registration-input placeholder-styled"
                        />
                        <div className="registration-label">
                            パスワードを入力(確認用)
                        </div>
                        <input
                            type="password"
                            placeholder="半角英数字8文字以上"
                            className="registration-input placeholder-styled"
                        />
                        <button className="registration-button">
                            登録する
                        </button>
                        <div className="registration-login-link">
                            <span style={{ color: '#0D0D0D', fontFamily: '"Hiragino Sans"' }}>
                                ログインは
                            </span>
                            <span style={{ color: '#FF2AA1', fontFamily: '"Hiragino Sans"' }}>
                                こちら
                            </span>
                        </div>
                        <div className="registration-divider">
                            <span className="registration-divider-text">または</span>
                        </div>
                        <div className="registration-socials">
                            <button className="registration-social-btn line">
                                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="20" viewBox="0 0 26 21" fill="none">
                                    <path d="M19.9951 8.58595C19.9951 4.11547 15.5059 0.469727 9.99512 0.469727C4.48434 0.469727 -0.00488281 4.10609 -0.00488281 8.58595C-0.00488281 13.0658 3.55651 15.9524 8.35501 16.5897C8.68303 16.6647 9.12352 16.8052 9.23598 17.0864C9.33908 17.3395 9.30159 17.7331 9.2641 17.9861C9.2641 17.9861 9.14226 18.689 9.12352 18.839C9.07666 19.092 8.92671 19.8231 9.98575 19.3826C11.0542 18.9327 15.7402 15.9899 17.8395 13.5813C19.2922 11.988 19.9857 10.376 19.9857 8.58595H19.9951Z" fill="white"/>
                                    <path d="M16.668 11.1729H13.8564C13.7533 11.1729 13.6689 11.0886 13.6689 10.9855V6.62748C13.6689 6.51501 13.7533 6.43066 13.8564 6.43066H16.668C16.7711 6.43066 16.8554 6.51501 16.8554 6.61811V7.33038C16.8554 7.43347 16.7711 7.51782 16.668 7.51782H14.7561V8.25822H16.668C16.7711 8.25822 16.8554 8.34257 16.8554 8.44566V9.15793C16.8554 9.26103 16.7711 9.34538 16.668 9.34538H14.7561V10.0858H16.668C16.7711 10.0858 16.8554 10.1701 16.8554 10.2732V10.9855C16.8554 11.0886 16.7711 11.1729 16.668 11.1729Z" fill="#06C755"/>
                                    <path d="M6.27445 11.1729C6.37755 11.1729 6.4619 11.0886 6.4619 10.9855V10.2732C6.4619 10.1701 6.37755 10.0858 6.27445 10.0858H4.36255V6.61811C4.36255 6.51501 4.27821 6.43066 4.17511 6.43066H3.46283C3.35974 6.43066 3.27539 6.51501 3.27539 6.61811V10.9761C3.27539 11.0886 3.35974 11.1729 3.46283 11.1729H6.27445Z" fill="#06C755"/>
                                    <path d="M7.96124 6.43066H7.24896C7.14544 6.43066 7.06152 6.51458 7.06152 6.61811V10.9855C7.06152 11.089 7.14544 11.1729 7.24896 11.1729H7.96124C8.06476 11.1729 8.14868 11.089 8.14868 10.9855V6.61811C8.14868 6.51458 8.06476 6.43066 7.96124 6.43066Z" fill="#06C755"/>
                                    <path d="M12.7878 6.43066H12.0756C11.9725 6.43066 11.8881 6.51501 11.8881 6.61811V9.21416L9.89188 6.51501C9.89188 6.51501 9.88251 6.50564 9.87314 6.49626C9.87314 6.49626 9.87313 6.49627 9.86376 6.48689C9.86376 6.48689 9.86376 6.48689 9.85439 6.48689C9.85439 6.48689 9.85439 6.48689 9.84502 6.48689C9.84502 6.48689 9.84502 6.48689 9.83564 6.48689C9.83564 6.48689 9.83565 6.48689 9.82628 6.48689C9.82628 6.48689 9.82627 6.48689 9.8169 6.48689C9.8169 6.48689 9.8169 6.48689 9.80753 6.48689C9.80753 6.48689 9.80753 6.48689 9.79816 6.48689H9.08588C8.98279 6.48689 8.89844 6.57124 8.89844 6.67434V11.0417C8.89844 11.1448 8.98279 11.2292 9.08588 11.2292H9.79816C9.90125 11.2292 9.9856 11.1448 9.9856 11.0417V8.45503L11.9819 11.1542C11.9912 11.1729 12.01 11.1917 12.0287 11.201C12.0287 11.201 12.0287 11.201 12.0381 11.201C12.0381 11.201 12.0381 11.201 12.0475 11.201C12.0662 11.201 12.0756 11.201 12.0943 11.201H12.7972C12.9003 11.201 12.9847 11.1167 12.9847 11.0136V6.64622C12.9847 6.54313 12.9003 6.45878 12.7972 6.45878L12.7878 6.43066Z" fill="#06C755"/>
                                </svg>
                                LINEでログイン
                            </button>
                            <button className="registration-social-btn google">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 21" fill="none">
                                    <mask id="mask0_2_57217" maskUnits="userSpaceOnUse" x="-1" y="0" width="21" height="21">
                                        <path d="M19.9951 0.469727H-0.00488281V20.4697H19.9951V0.469727Z" fill="white"/>
                                    </mask>
                                    <g mask="url(#mask0_2_57217)">
                                        <path d="M19.5951 10.6969C19.5951 9.98777 19.5315 9.30597 19.4133 8.65137H9.99512V12.5196H15.3769C15.1451 13.7696 14.4406 14.8287 13.3815 15.5378V18.0469H16.6133C18.5042 16.306 19.5951 13.7423 19.5951 10.6969Z" fill="#4285F4"/>
                                        <path d="M9.99499 20.4701C12.695 20.4701 14.9586 19.5746 16.6131 18.0474L13.3813 15.5383C12.4859 16.1383 11.3404 16.4928 9.99499 16.4928C7.39039 16.4928 5.18589 14.7337 4.39949 12.3701H1.05859V14.961C2.70409 18.2292 6.08589 20.4701 9.99499 20.4701Z" fill="#34A853"/>
                                        <path d="M4.39962 12.3694C4.19962 11.7694 4.08602 11.1285 4.08602 10.4694C4.08602 9.81032 4.19962 9.16942 4.39962 8.56942V5.97852H1.05872C0.381517 7.32852 -0.00488281 8.85582 -0.00488281 10.4694C-0.00488281 12.083 0.381517 13.6103 1.05872 14.9603L4.39962 12.3694Z" fill="#FBBC04"/>
                                        <path d="M9.99499 4.44703C11.4631 4.44703 12.7813 4.95153 13.8177 5.94243L16.6859 3.07423C14.9541 1.46063 12.6904 0.469727 9.99499 0.469727C6.08589 0.469727 2.70409 2.71063 1.05859 5.97883L4.39949 8.56973C5.18589 6.20613 7.39039 4.44703 9.99499 4.44703Z" fill="#E94235"/>
                                    </g>
                                </svg>
                                Googleでログイン
                            </button>
                        </div>
                        <div className="registration-terms">
                            ログインをすることで
                            <span>
                                利用規約
                            </span>
                            及び
                            <span>
                                プライバシーポリシー
                            </span>
                            に同意したものとみなします。
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}