import Header from '@/Components/header/header';
import logo from '@/assets/images/mechapuri-logo.svg';


export default function Register() {

    return (
        <>
            <style>
                {`
                    .placeholder-styled::placeholder {
                        color: #ACACAC;
                        font-family: "Noto Sans JP";
                        font-size: 14px;
                        font-style: normal;
                        font-weight: 400;
                        line-height: 25.664px;
                    }
                `}
            </style>
            <Header />
            <div style={{
                minHeight: 'calc(100vh - 98px)', // header height
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: '#fff',
                paddingTop: '80px',
                paddingBottom: '80px',
            }}>
                <div style={{
                    position: 'relative',
                    display: 'flex',
                    width: '960px',
                    height: '787px',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    gap: '40px',
                    flexShrink: 0,
                    borderRadius: '16px',
                    background: '#FFF',
                    boxShadow: '0px 4px 36px 0px rgba(0, 0, 0, 0.10)',
                }}>
                    {/* X Button */}
                    <button
                        style={{
                            position: 'absolute',
                            right: '16px',
                            top: '16px',
                            width: '32px',
                            height: '32px',
                            background: 'none',
                            border: 'none',
                            padding: 0,
                            cursor: 'pointer',
                            zIndex: 10,
                        }}
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
                    <img src={logo} alt="Mechapuri Logo" style={{ 
                        position: 'absolute',
                        top: '64px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '202.849px', 
                        height: '36px',
                        zIndex: 5
                    }} />
                    
                    {/* Registration title */}
                    <div style={{
                        position: 'absolute',
                        top: '132px', // 64px + 36px + 32px
                        left: '50%',
                        transform: 'translateX(-50%)',
                        alignSelf: 'stretch',
                        color: '#363636',
                        textAlign: 'center',
                        fontFamily: '"Noto Sans JP"',
                        fontSize: '21px',
                        fontStyle: 'normal',
                        fontWeight: '700',
                        lineHeight: '27px',
                        zIndex: 5
                    }}>
                        新規会員登録
                    </div>
                    
                    {/* Email label */}
                    <div style={{
                        position: 'absolute',
                        top: '191px', // 132px + 27px + 32px
                        left: '25%', // left edge with some padding
                        alignSelf: 'stretch',
                        color: '#363636',
                        fontFamily: '"Hiragino Sans"',
                        fontSize: '16px',
                        fontStyle: 'normal',
                        fontWeight: '400',
                        lineHeight: '24px',
                        zIndex: 5
                    }}>
                        メールアドレスを入力
                    </div>
                    
                    {/* Email input */}
                    <input
                        type="email"
                        placeholder="example@email.com"
                        style={{
                            position: 'absolute',
                            top: '221px', // 191px + 24px + 6px
                            left: '25%',
                            height: '50px',
                            width: '480px',
                            alignSelf: 'stretch',
                            borderRadius: '5.71px',
                            background: '#FFF',
                            boxShadow: '0px 0px 0px 1.143px #E9E9E9 inset',
                            border: 'none',
                            padding: '0 16px',
                            fontFamily: '"Hiragino Sans"',
                            fontSize: '16px',
                            zIndex: 5,
                            color: '#363636'
                        }}
                        className="placeholder-styled"
                    />
                    
                    {/* Password label */}
                    <div style={{
                        position: 'absolute',
                        top: '287px', // 221px + 50px + 16px
                        left: '25%',
                        alignSelf: 'stretch',
                        color: '#363636',
                        fontFamily: '"Hiragino Sans"',
                        fontSize: '16px',
                        fontStyle: 'normal',
                        fontWeight: '400',
                        lineHeight: '24px',
                        zIndex: 5
                    }}>
                        パスワードを入力
                    </div>
                    
                    {/* Password input */}
                    <input
                        type="password"
                        placeholder="半角英数字8文字以上"
                        style={{
                            position: 'absolute',
                            top: '317px', // 287px + 24px + 6px
                            left: '25%',
                            height: '50px',
                            width: '480px',
                            alignSelf: 'stretch',
                            borderRadius: '5.71px',
                            background: '#FFF',
                            boxShadow: '0px 0px 0px 1.143px #E9E9E9 inset',
                            border: 'none',
                            padding: '0 16px',
                            fontFamily: '"Hiragino Sans"',
                            fontSize: '16px',
                            zIndex: 5,
                            color: '#363636'
                        }}
                        className="placeholder-styled"
                    />
                    
                    {/* Password confirmation label */}
                    <div style={{
                        position: 'absolute',
                        top: '383px', // 317px + 50px + 16px
                        left: '25%',
                        alignSelf: 'stretch',
                        color: '#363636',
                        fontFamily: '"Hiragino Sans"',
                        fontSize: '16px',
                        fontStyle: 'normal',
                        fontWeight: '400',
                        lineHeight: '24px',
                        zIndex: 5
                    }}>
                        パスワードを入力(確認用)
                    </div>
                    
                    {/* Password confirmation input */}
                    <input
                        type="password"
                        placeholder="半角英数字8文字以上"
                        style={{
                            position: 'absolute',
                            top: '413px', // 383px + 24px + 6px
                            left: '25%',
                            height: '50px',
                            width: '480px',
                            alignSelf: 'stretch',
                            borderRadius: '5.71px',
                            background: '#FFF',
                            boxShadow: '0px 0px 0px 1.143px #E9E9E9 inset',
                            border: 'none',
                            padding: '0 16px',
                            fontFamily: '"Hiragino Sans"',
                            fontSize: '16px',
                            zIndex: 5,
                            color: '#363636'
                        }}
                        className="placeholder-styled"
                    />
                    
                    {/* Register button */}
                    <button
                        style={{
                            position: 'absolute',
                            top: '508px', // 413px + 50px + 45px
                            left: '50%',
                            transform: 'translateX(-50%)',
                            display: 'flex',
                            width: '328px',
                            maxWidth: '328px',
                            padding: '15px 36px',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: '8px',
                            opacity: 1,
                            background: 'linear-gradient(270deg, #FF2AA1 0%, #AB31D3 100%)',
                            boxShadow: '0px 2px 8px 0px rgba(0, 0, 0, 0.25)',
                            border: 'none',
                            cursor: 'pointer',
                            zIndex: 5
                        }}
                    >
                        <span style={{
                            color: '#FFF',
                            textAlign: 'center',
                            fontFamily: '"Noto Sans JP"',
                            fontSize: '14px',
                            fontStyle: 'normal',
                            fontWeight: '500',
                            lineHeight: '14px'
                        }}>
                            登録する
                        </span>
                    </button>
                    
                    {/* Login link text */}
                    <div style={{
                        position: 'absolute',
                        top: '580px', // 508px + 58px + 16px (button height is ~58px)
                        left: '50%',
                        transform: 'translateX(-50%)',
                        textAlign: 'center',
                        zIndex: 5
                    }}>
                        <span style={{
                            color: '#0D0D0D',
                            fontFamily: '"Hiragino Sans"',
                            fontSize: '12px',
                            fontStyle: 'normal',
                            fontWeight: '400',
                            lineHeight: '24px'
                        }}>
                            ログインは
                        </span>
                        <span style={{
                            color: '#FF2AA1',
                            fontFamily: '"Hiragino Sans"',
                            fontSize: '12px',
                            fontStyle: 'normal',
                            fontWeight: '400',
                            lineHeight: '24px'
                        }}>
                            こちら
                        </span>
                    </div>
                    
                    {/* Divider line with centered text */}
                    <div style={{
                        position: 'absolute',
                        top: '622px', // 580px + 24px + 26px (text line height + spacing)
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '480px',
                        height: '1px',
                        background: '#E9E9E9',
                        zIndex: 5
                    }} />
                    
                    {/* "または" text centered on line */}
                    <div style={{
                        position: 'absolute',
                        top: '612px', // 622px - 10px to center on the line
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: '#FFF', // white background to cover the line
                        padding: '0 16px',
                        zIndex: 6
                    }}>
                        <span style={{
                            color: '#000',
                            textAlign: 'center',
                            fontFamily: '"Noto Sans JP"',
                            fontSize: '14px',
                            fontStyle: 'normal',
                            fontWeight: '500',
                            lineHeight: '21px'
                        }}>
                            または
                        </span>
                    </div>
                    
                    {/* Social login buttons container */}
                    <div style={{
                        position: 'absolute',
                        top: '649px', // 612px + 21px + 16px
                        left: '50%',
                        transform: 'translateX(-50%)',
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '20px',
                        zIndex: 5
                    }}>
                        {/* LINE login button */}
                        <button style={{
                            display: 'flex',
                            height: '49.5px',
                            padding: '15px 21px',
                            alignItems: 'center',
                            borderRadius: '8px',
                            background: '#06C755',
                            border: 'none',
                            cursor: 'pointer',
                            color: '#FFF',
                            fontFamily: '"Noto Sans JP"',
                            fontSize: '12px',
                            fontStyle: 'normal',
                            fontWeight: '700',
                            lineHeight: '12px'
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="20" viewBox="0 0 26 21" fill="none">
                                <path d="M19.9951 8.58595C19.9951 4.11547 15.5059 0.469727 9.99512 0.469727C4.48434 0.469727 -0.00488281 4.10609 -0.00488281 8.58595C-0.00488281 13.0658 3.55651 15.9524 8.35501 16.5897C8.68303 16.6647 9.12352 16.8052 9.23598 17.0864C9.33908 17.3395 9.30159 17.7331 9.2641 17.9861C9.2641 17.9861 9.14226 18.689 9.12352 18.839C9.07666 19.092 8.92671 19.8231 9.98575 19.3826C11.0542 18.9327 15.7402 15.9899 17.8395 13.5813C19.2922 11.988 19.9857 10.376 19.9857 8.58595H19.9951Z" fill="white"/>
                                <path d="M16.668 11.1729H13.8564C13.7533 11.1729 13.6689 11.0886 13.6689 10.9855V6.62748C13.6689 6.51501 13.7533 6.43066 13.8564 6.43066H16.668C16.7711 6.43066 16.8554 6.51501 16.8554 6.61811V7.33038C16.8554 7.43347 16.7711 7.51782 16.668 7.51782H14.7561V8.25822H16.668C16.7711 8.25822 16.8554 8.34257 16.8554 8.44566V9.15793C16.8554 9.26103 16.7711 9.34538 16.668 9.34538H14.7561V10.0858H16.668C16.7711 10.0858 16.8554 10.1701 16.8554 10.2732V10.9855C16.8554 11.0886 16.7711 11.1729 16.668 11.1729Z" fill="#06C755"/>
                                <path d="M6.27445 11.1729C6.37755 11.1729 6.4619 11.0886 6.4619 10.9855V10.2732C6.4619 10.1701 6.37755 10.0858 6.27445 10.0858H4.36255V6.61811C4.36255 6.51501 4.27821 6.43066 4.17511 6.43066H3.46283C3.35974 6.43066 3.27539 6.51501 3.27539 6.61811V10.9761C3.27539 11.0886 3.35974 11.1729 3.46283 11.1729H6.27445Z" fill="#06C755"/>
                                <path d="M7.96124 6.43066H7.24896C7.14544 6.43066 7.06152 6.51458 7.06152 6.61811V10.9855C7.06152 11.089 7.14544 11.1729 7.24896 11.1729H7.96124C8.06476 11.1729 8.14868 11.089 8.14868 10.9855V6.61811C8.14868 6.51458 8.06476 6.43066 7.96124 6.43066Z" fill="#06C755"/>
                                <path d="M12.7878 6.43066H12.0756C11.9725 6.43066 11.8881 6.51501 11.8881 6.61811V9.21416L9.89188 6.51501C9.89188 6.51501 9.88251 6.50564 9.87314 6.49626C9.87314 6.49626 9.87313 6.49627 9.86376 6.48689C9.86376 6.48689 9.86376 6.48689 9.85439 6.48689C9.85439 6.48689 9.85439 6.48689 9.84502 6.48689C9.84502 6.48689 9.84502 6.48689 9.83564 6.48689C9.83564 6.48689 9.83565 6.48689 9.82628 6.48689C9.82628 6.48689 9.82627 6.48689 9.8169 6.48689C9.8169 6.48689 9.8169 6.48689 9.80753 6.48689C9.80753 6.48689 9.80753 6.48689 9.79816 6.48689C9.79816 6.48689 9.79816 6.48689 9.78878 6.48689H9.08588C8.98279 6.48689 8.89844 6.57124 8.89844 6.67434V11.0417C8.89844 11.1448 8.98279 11.2292 9.08588 11.2292H9.79816C9.90125 11.2292 9.9856 11.1448 9.9856 11.0417V8.45503L11.9819 11.1542C11.9912 11.1729 12.01 11.1917 12.0287 11.201C12.0287 11.201 12.0287 11.201 12.0381 11.201C12.0381 11.201 12.0381 11.201 12.0475 11.201C12.0662 11.201 12.0756 11.201 12.0943 11.201H12.7972C12.9003 11.201 12.9847 11.1167 12.9847 11.0136V6.64622C12.9847 6.54313 12.9003 6.45878 12.7972 6.45878L12.7878 6.43066Z" fill="#06C755"/>
                            </svg>
                            LINEでログイン
                        </button>
                        
                        {/* Google login button */}
                        <button style={{
                            display: 'flex',
                            height: '49.5px',
                            padding: '15px 21px',
                            alignItems: 'center',
                            gap: '4px',
                            borderRadius: '8px',
                            border: '0.999px solid #ACACAC',
                            background: '#FFF',
                            cursor: 'pointer',
                            color: '#363636',
                            fontFamily: '"Noto Sans JP"',
                            fontSize: '12px',
                            fontStyle: 'normal',
                            fontWeight: '700',
                            lineHeight: '12px'
                        }}>
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
                    
                    {/* Terms and Privacy Policy text */}
                    <div style={{
                        position: 'absolute',
                        top: '734.5px', // 649px + 49.5px + 36px
                        left: '50%',
                        transform: 'translateX(-50%)',
                        alignSelf: 'stretch',
                        color: '#969696',
                        textAlign: 'center',
                        fontFamily: '"Noto Sans JP"',
                        fontSize: '12px',
                        fontStyle: 'normal',
                        fontWeight: '400',
                        lineHeight: '18px',
                        zIndex: 5,
                        maxWidth: '480px'
                    }}>
                        ログインをすることで
                        <span style={{
                            color: '#363636',
                            fontFamily: '"Noto Sans JP"',
                            fontSize: '12px',
                            fontStyle: 'normal',
                            fontWeight: '400',
                            lineHeight: '18px'
                        }}>
                            利用規約
                        </span>
                        及び
                        <span style={{
                            color: '#363636',
                            fontFamily: '"Noto Sans JP"',
                            fontSize: '12px',
                            fontStyle: 'normal',
                            fontWeight: '400',
                            lineHeight: '18px'
                        }}>
                            プライバシーポリシー
                        </span>
                        に同意したものとみなします。
                    </div>
                    
                    {/* Registration outer frame */}
                    <div style={{
                        display: 'flex',
                        padding: '64px 24px 0px 0px',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        background: '#FFF',
                        width: '100%',
                        height: '100%',
                        borderRadius: '16px',
                    }}>

                        
                        {/* Registration form will go here */}
                    </div>
                </div>
            </div>
        </>
    );
}