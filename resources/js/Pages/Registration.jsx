import Header from '@/Components/header/header';
import Footer from '@/Components/footer/footer';
import logo from '@/assets/images/mechapuri-logo.svg';
import close from '@/assets/images/close_gray.svg';
import '@/../css/registration.css';
import { useForm, Link, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { vw, vwd, responsiveMetric, responsiveText, responsivePosition } from '@/lib/utils';


export default function Register() {
    const { data, setData, post, processing, errors: backendErrors } = useForm({
        email: '',
        password: '',
        password_confirmation: '',
        email_verified: false,
    });

    // Debug: Log backend errors
    useEffect(() => {
        if (Object.keys(backendErrors).length > 0) {
            console.log('Backend errors:', backendErrors);
            const firstError = Object.values(backendErrors)[0];
            setResultMessage({ type: 'error', message: firstError });
        }
    }, [backendErrors]);
    const [errors, setErrors] = useState({});
    const [resultMessage, setResultMessage] = useState({ type: '', message: '' });

    // Email verification states
    const [showVerificationInput, setShowVerificationInput] = useState(false);
    const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
    const [pendingEmail, setPendingEmail] = useState('');
    const [codeVerifying, setCodeVerifying] = useState(false);
    const [verificationSuccess, setVerificationSuccess] = useState(false);
    const [emailSending, setEmailSending] = useState(false);
    const [storedPassword, setStoredPassword] = useState('');
    const [storedPasswordConfirmation, setStoredPasswordConfirmation] = useState('');

    // Auto-verify when 6 digits are entered
    useEffect(() => {
        const codeString = verificationCode.join('');
        if (codeString.length === 6) {
            handleVerifyCode();
        }
    }, [verificationCode]);

    const handleVerifyCode = async () => {
        const codeString = verificationCode.join('');
        if (!codeString || codeString.length !== 6) {
            return;
        }

        setCodeVerifying(true);
        setErrors({});
        setResultMessage({ type: '', message: '' });

        try {
            const response = await fetch('/api/verify-email-code', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
                body: JSON.stringify({
                    email: pendingEmail,
                    code: codeString
                })
            });

            if (response.ok) {
                const data = await response.json();

                if (data.verified) {
                    // Code is correct, proceed with registration
                    setVerificationSuccess(true);
                    setResultMessage({ type: 'success', message: 'メールアドレスの認証が完了しました。登録を続行します。' });

                    // Set email as verified and proceed with actual registration
                    setData('email_verified', true);

                    // Clear result message after 3 seconds
                    setTimeout(() => {
                        setResultMessage({ type: '', message: '' });
                    }, 3000);

                    // Ensure all form data is set before registration
                    setTimeout(() => {
                        // Make sure all form data is properly set
                        setData('email', pendingEmail);
                        setData('password', storedPassword);
                        setData('password_confirmation', storedPasswordConfirmation);
                        setData('email_verified', true);

                        // Send registration with explicit data
                        const registrationData = {
                            email: pendingEmail,
                            password: storedPassword,
                            password_confirmation: storedPasswordConfirmation,
                            email_verified: true
                        };

                        // Debug: Log the form data being sent
                        console.log('Form data being sent:', registrationData);

                        // Use Inertia router to post the data
                        router.post('/register', registrationData);
                    }, 2000);
                } else {
                    setResultMessage({ type: 'error', message: '認証コードが正しくありません' });
                    setVerificationCode(['', '', '', '', '', '']);

                    // Clear error message after 5 seconds
                    setTimeout(() => {
                        setResultMessage({ type: '', message: '' });
                    }, 5000);
                }
            } else {
                setResultMessage({ type: 'error', message: '認証コードの確認に失敗しました' });

                // Clear error message after 5 seconds
                setTimeout(() => {
                    setResultMessage({ type: '', message: '' });
                }, 5000);
            }
        } catch (error) {
            console.error('Error verifying code:', error);
            setResultMessage({ type: 'error', message: '認証コードの確認に失敗しました' });

            // Clear error message after 5 seconds
            setTimeout(() => {
                setResultMessage({ type: '', message: '' });
            }, 5000);
        } finally {
            setCodeVerifying(false);
        }
    };

    const validate = () => {
        const newErrors = {};
        // Email: must have @ and at least one dot after @
        if (!data.email.match(/^\S+@\S+\.\S+$/)) {
            newErrors.email = '有効なメールアドレスを入力してください。';
        }
        // Password: at least 8 chars
        if (!data.password || data.password.length < 8) {
            newErrors.password = 'パスワードは8文字以上で入力してください。';
        }
        // Password confirmation
        if (data.password !== data.password_confirmation) {
            newErrors.password_confirmation = 'パスワードが一致しません。';
        }
        return newErrors;
    };

    const submit = (e) => {
        e.preventDefault();
        const newErrors = validate();
        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
            // Store password data before sending verification email
            setStoredPassword(data.password);
            setStoredPasswordConfirmation(data.password_confirmation);

            // Send verification email first
            sendVerificationEmail();
        } else {
            // Show first error as result message
            const firstError = Object.values(newErrors)[0];
            setResultMessage({ type: 'error', message: firstError });

            // Clear error message after 5 seconds
            setTimeout(() => {
                setResultMessage({ type: '', message: '' });
            }, 5000);
        }
    };

    const sendVerificationEmail = async () => {
        setEmailSending(true);
        setErrors({});
        setResultMessage({ type: '', message: '' });

        try {
            // Create an AbortController for timeout
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

            const response = await fetch('/api/send-verification-code', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
                body: JSON.stringify({
                    email: data.email
                }),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            const responseData = await response.json();

            if (response.ok) {
                setPendingEmail(data.email);
                setShowVerificationInput(true);
                setResultMessage({ type: 'success', message: '認証コードを送信しました。6桁のコードを入力してください。' });

                // Clear result message after 5 seconds
                setTimeout(() => {
                    setResultMessage({ type: '', message: '' });
                }, 5000);
            } else {
                // Show the specific error message from the server
                setResultMessage({ type: 'error', message: responseData.message || '認証コードの送信に失敗しました' });

                // Clear error message after 5 seconds
                setTimeout(() => {
                    setResultMessage({ type: '', message: '' });
                }, 5000);
            }
        } catch (error) {
            console.error('Error sending verification email:', error);

            if (error.name === 'AbortError') {
                setResultMessage({ type: 'error', message: 'メールの送信がタイムアウトしました。しばらく時間をおいて再度お試しください。' });
            } else {
                setResultMessage({ type: 'error', message: '認証コードの送信に失敗しました。しばらく時間をおいて再度お試しください。' });
            }

            // Clear error message after 5 seconds
            setTimeout(() => {
                setResultMessage({ type: '', message: '' });
            }, 5000);
        } finally {
            setEmailSending(false);
        }
    };

    return (
        <div className="flex flex-col items-center bg-white">
            {/* Result Message */}
            {resultMessage.type && (
                <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-lg shadow-lg ${resultMessage.type === 'success'
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                    }`}>
                    {resultMessage.message}
                </div>
            )}
            <Header />

            <section className="md:flex hidden flex-col justify-center items-center bg-white" style={{ paddingTop: vwd(80), paddingBottom: vwd(80) }}>
                <div className="flex flex-col w-full justify-center items-center bg-white shadow-[0_4px_36px_0_rgba(0,0,0,0.1)] relative" style={{ borderRadius: vwd(16), width: vwd(960), paddingBottom: vwd(30) }}>
                    {/* Close Button */}
                    <div className="flex justify-end w-full p-4">
                        <button 
                            onClick={() => router.visit('/')}
                            className="cursor-pointer hover:opacity-80 transition-opacity"
                        >
                            <img src={close} alt="close" style={{ width: '32px', height: '32px' }} />
                        </button>
                    </div>
                    {/* Registration Form */}
                    <div className="flex flex-col items-center w-[504px] pt-[64px]">
                        <div className="flex flex-col items-center w-full" style={{ gap: '32px' }}>
                            {/* Logo */}
                            <img src={logo} alt="Mechapuri Logo" style={{ width: '203px', height: '36px' }} />
                            <div className="text-[21px] leading-[27px] font-bold font-noto text-[#363636] text-center">
                                新規会員登録
                            </div>
                            <form onSubmit={submit} className="flex flex-col w-full" style={{ gap: '45px' }}>
                                <div className="flex flex-col" style={{ gap: '16px' }}>
                                    {/* Email Field */}
                                    <div className="flex flex-col" style={{ gap: '8px' }}>
                                        <label style={{ fontSize: '16px', fontWeight: 'medium', fontFamily: '"Noto Sans JP", sans-serif', color: '#363636' }}>
                                            メールアドレスを入力
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="example@email.com"
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                            value={data.email}
                                            onChange={e => setData('email', e.target.value)}
                                            autoComplete="email"
                                            style={{ fontSize: '16px', fontFamily: '"Noto Sans JP", sans-serif', color: '#000', height: '50px', borderRadius: '8px' }}
                                        />
                                        {backendErrors.email && (
                                            <div style={{ fontSize: '14px', fontFamily: '"Noto Sans JP", sans-serif', color: '#E53E3E' }}>
                                                {backendErrors.email}
                                            </div>
                                        )}
                                    </div>

                                    {/* Password Field */}
                                    <div className="flex flex-col" style={{ gap: '8px' }}>
                                        <label style={{ fontSize: '16px', fontWeight: 'medium', fontFamily: '"Noto Sans JP", sans-serif', color: '#363636' }}>
                                            パスワードを入力
                                        </label>
                                        <input
                                            type="password"
                                            name="password"
                                            placeholder="半角英数字8文字以上"
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                            value={data.password}
                                            onChange={e => setData('password', e.target.value)}
                                            autoComplete="new-password"
                                            style={{ fontSize: '16px', fontFamily: '"Noto Sans JP", sans-serif', color: '#000', height: '50px', borderRadius: '8px' }}
                                        />
                                        {backendErrors.password && (
                                            <div style={{ fontSize: '14px', fontFamily: '"Noto Sans JP", sans-serif', color: '#E53E3E' }}>
                                                {backendErrors.password}
                                            </div>
                                        )}
                                    </div>

                                    {/* Password Confirmation Field */}
                                    <div className="flex flex-col" style={{ gap: '8px' }}>
                                        <label style={{ fontSize: '16px', fontWeight: 'medium', fontFamily: '"Noto Sans JP", sans-serif', color: '#363636' }}>
                                            パスワードを入力(確認用)
                                        </label>
                                        <input
                                            type="password"
                                            name="password_confirmation"
                                            placeholder="半角英数字8文字以上"
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                            value={data.password_confirmation}
                                            onChange={e => setData('password_confirmation', e.target.value)}
                                            autoComplete="new-password"
                                            style={{ fontSize: '16px', fontFamily: '"Noto Sans JP", sans-serif', color: '#000', height: '50px', borderRadius: '8px' }}
                                        />
                                        {backendErrors.password_confirmation && (
                                            <div style={{ fontSize: '14px', fontFamily: '"Noto Sans JP", sans-serif', color: '#E53E3E' }}>
                                                {backendErrors.password_confirmation}
                                            </div>
                                        )}
                                    </div>
                                    {/* Email Verification Input */}
                                    {showVerificationInput && (
                                        <div className="flex flex-col w-full p-4 border border-gray-200 rounded-lg bg-gray-50" style={{ gap: '16px' }}>
                                            <div style={{ fontSize: '16px', fontWeight: 'medium', fontFamily: '"Noto Sans JP", sans-serif', color: '#363636', textAlign: 'center' }}>
                                                認証コードを入力してください
                                            </div>
                                            <div className="flex justify-center items-center" style={{ gap: '8px' }}>
                                                {[0, 1, 2, 3, 4, 5].map((index) => (
                                                    <div key={index} className="relative">
                                                        <input
                                                            type="text"
                                                            maxLength="1"
                                                            placeholder=""
                                                            value={verificationCode[index]}
                                                            onChange={(e) => {
                                                                const value = e.target.value.replace(/\D/g, '');
                                                                const newCode = [...verificationCode];
                                                                newCode[index] = value;
                                                                setVerificationCode(newCode);

                                                                if (value && index < 5) {
                                                                    const container = e.target.parentNode.parentNode;
                                                                    const inputs = container.querySelectorAll('input[type="text"]');
                                                                    if (inputs[index + 1]) {
                                                                        inputs[index + 1].focus();
                                                                    }
                                                                }
                                                            }}
                                                            onPaste={(e) => {
                                                                e.preventDefault();
                                                                const pastedData = e.clipboardData.getData('text');
                                                                const numbersOnly = pastedData.replace(/\D/g, '');

                                                                if (numbersOnly.length >= 6) {
                                                                    const newCode = ['', '', '', '', '', ''];
                                                                    for (let i = 0; i < 6; i++) {
                                                                        newCode[i] = numbersOnly[i];
                                                                    }
                                                                    setVerificationCode(newCode);

                                                                    const container = e.target.parentNode.parentNode;
                                                                    const inputs = container.querySelectorAll('input[type="text"]');
                                                                    if (inputs[5]) inputs[5].focus();
                                                                } else if (numbersOnly.length > 0) {
                                                                    const newCode = [...verificationCode];
                                                                    for (let i = 0; i < Math.min(numbersOnly.length, 6); i++) {
                                                                        newCode[i] = numbersOnly[i];
                                                                    }
                                                                    setVerificationCode(newCode);

                                                                    const nextIndex = Math.min(numbersOnly.length, 5);
                                                                    const container = e.target.parentNode.parentNode;
                                                                    const inputs = container.querySelectorAll('input[type="text"]');
                                                                    if (inputs[nextIndex]) inputs[nextIndex].focus();
                                                                }
                                                            }}
                                                            onKeyDown={(e) => {
                                                                if (e.key === 'Backspace' || e.key === 'Delete') {
                                                                    e.preventDefault();
                                                                    const newCode = [...verificationCode];

                                                                    if (e.key === 'Backspace') {
                                                                        if (verificationCode[index]) {
                                                                            newCode[index] = '';
                                                                            setVerificationCode(newCode);
                                                                        } else if (index > 0) {
                                                                            newCode[index - 1] = '';
                                                                            setVerificationCode(newCode);
                                                                            const container = e.target.parentNode.parentNode;
                                                                            const inputs = container.querySelectorAll('input[type="text"]');
                                                                            if (inputs[index - 1]) {
                                                                                inputs[index - 1].focus();
                                                                            }
                                                                        }
                                                                    } else if (e.key === 'Delete') {
                                                                        newCode[index] = '';
                                                                        setVerificationCode(newCode);

                                                                        if (index < 5) {
                                                                            const container = e.target.parentNode.parentNode;
                                                                            const inputs = container.querySelectorAll('input[type="text"]');
                                                                            if (inputs[index + 1]) {
                                                                                inputs[index + 1].focus();
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }}
                                                            className="text-center border border-gray-300 rounded focus:outline-none focus:border-blue-500 bg-transparent"
                                                            style={{
                                                                width: '40px',
                                                                height: '50px',
                                                                fontSize: '16px',
                                                                fontFamily: '"Noto Sans JP", sans-serif',
                                                                color: '#000'
                                                            }}
                                                            disabled={codeVerifying}
                                                        />
                                                        {index === 2 && (
                                                            <div className="absolute right-[-6px] top-1/2 transform -translate-y-1/2 w-1 h-px bg-gray-300"></div>
                                                        )}
                                                        {index === 5 && verificationSuccess && (
                                                            <div className="absolute right-[-15px] top-1/2 transform -translate-y-1/2 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                                                                <svg width="12" height="12" fill="white" viewBox="0 0 20 20">
                                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                                </svg>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                            {codeVerifying && (
                                                <div className="flex items-center justify-center gap-2 mt-3">
                                                    <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                                                    <span style={{ fontSize: '14px', fontFamily: '"Noto Sans JP", sans-serif', color: '#363636' }}>
                                                        認証中...
                                                    </span>
                                                </div>
                                            )}
                                            {errors.captcha && (
                                                <div style={{ fontSize: '14px', fontFamily: '"Noto Sans JP", sans-serif', color: '#E53E3E', textAlign: 'center', marginTop: '10px' }}>
                                                    {errors.captcha}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                                {/* Submit Button */}
                                <div className="flex flex-col items-center gap-4">
                                    <button
                                        className="w-[328px] py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-[8px] font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                                        type="submit"
                                        disabled={processing || emailSending}
                                        style={{ fontSize: '16px', fontWeight: 'medium', fontFamily: '"Noto Sans JP", sans-serif', color: '#FFF' }}
                                    >
                                        {emailSending ? '認証コード送信中...' : '登録する'}
                                    </button>
                                    {/* Login Link */}
                                    <div className="text-center">
                                        <Link href="/login" className="inline-flex items-center" style={{ textDecoration: 'none' }}>
                                            <span style={{ fontSize: '14px', fontFamily: '"Noto Sans JP", sans-serif', color: '#0D0D0D' }}>
                                                ログインは
                                            </span>
                                            <span style={{ fontSize: '14px', fontFamily: '"Noto Sans JP", sans-serif', color: '#FF2AA1', marginLeft: '4px' }}>
                                                こちら
                                            </span>
                                        </Link>
                                    </div>
                                </div>

                            </form>
                        </div>

                        {/* Divider */}
                        <div className="flex items-center justify-center w-full my-[16px]">
                            <div className="flex-1 h-px bg-gray-300"></div>
                            <span style={{ fontSize: '14px', fontFamily: '"Noto Sans JP", sans-serif', color: '#000' }}>または</span>
                            <div className="flex-1 h-px bg-gray-300"></div>
                        </div>

                        {/* Social Login Buttons */}
                        <div className="flex flex-row gap-3">
                            <button
                                className="flex items-center justify-center gap-3 w-full h-[50px] py-3 px-[21px] bg-green-500 text-white rounded-lg hover:opacity-90 transition-opacity"
                                type="button"
                                onClick={() => window.location.href = route('auth.line')}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" viewBox="0 0 26 21" fill="none">
                                    <path d="M19.9951 8.58595C19.9951 4.11547 15.5059 0.469727 9.99512 0.469727C4.48434 0.469727 -0.00488281 4.10609 -0.00488281 8.58595C-0.00488281 13.0658 3.55651 15.9524 8.35501 16.5897C8.68303 16.6647 9.12352 16.8052 9.23598 17.0864C9.33908 17.3395 9.30159 17.7331 9.2641 17.9861C9.2641 17.9861 9.14226 18.689 9.12352 18.839C9.07666 19.092 8.92671 19.8231 9.98575 19.3826C11.0542 18.9327 15.7402 15.9899 17.8395 13.5813C19.2922 11.988 19.9857 10.376 19.9857 8.58595H19.9951Z" fill="white" />
                                    <path d="M16.668 11.1729H13.8564C13.7533 11.1729 13.6689 11.0886 13.6689 10.9855V6.62748C13.6689 6.51501 13.7533 6.43066 13.8564 6.43066H16.668C16.7711 6.43066 16.8554 6.51501 16.8554 6.61811V7.33038C16.8554 7.43347 16.7711 7.51782 16.668 7.51782H14.7561V8.25822H16.668C16.7711 8.25822 16.8554 8.34257 16.8554 8.44566V9.15793C16.8554 9.26103 16.7711 9.34538 16.668 9.34538H14.7561V10.0858H16.668C16.7711 10.0858 16.8554 10.1701 16.8554 10.2732V10.9855C16.8554 11.0886 16.7711 11.1729 16.668 11.1729Z" fill="#06C755" />
                                    <path d="M6.27445 11.1729C6.37755 11.1729 6.4619 11.0886 6.4619 10.9855V10.2732C6.4619 10.1701 6.37755 10.0858 6.27445 10.0858H4.36255V6.61811C4.36255 6.51501 4.27821 6.43066 4.17511 6.43066H3.46283C3.35974 6.43066 3.27539 6.51501 3.27539 6.61811V10.9761C3.27539 11.0886 3.35974 11.1729 3.46283 11.1729H6.27445Z" fill="#06C755" />
                                    <path d="M7.96124 6.43066H7.24896C7.14544 6.43066 7.06152 6.51458 7.06152 6.61811V10.9855C7.06152 11.089 7.14544 11.1729 7.24896 11.1729H7.96124C8.06476 11.1729 8.14868 11.089 8.14868 10.9855V6.61811C8.14868 6.51458 8.06476 6.43066 7.96124 6.43066Z" fill="#06C755" />
                                    <path d="M12.7878 6.43066H12.0756C11.9725 6.43066 11.8881 6.51501 11.8881 6.61811V9.21416L9.89188 6.51501C9.89188 6.51501 9.88251 6.50564 9.87314 6.49626C9.87314 6.49626 9.87313 6.49627 9.86376 6.48689C9.86376 6.48689 9.86376 6.48689 9.85439 6.48689C9.85439 6.48689 9.85439 6.48689 9.84502 6.48689C9.84502 6.48689 9.84502 6.48689 9.83564 6.48689C9.83564 6.48689 9.83565 6.48689 9.82628 6.48689C9.82628 6.48689 9.82627 6.48689 9.8169 6.48689C9.8169 6.48689 9.8169 6.48689 9.80753 6.48689C9.80753 6.48689 9.80753 6.48689 9.79816 6.48689H9.08588C8.98279 6.48689 8.89844 6.57124 8.89844 6.67434V11.0417C8.89844 11.1448 8.98279 11.2292 9.08588 11.2292H9.79816C9.90125 11.2292 9.9856 11.1448 9.9856 11.0417V8.45503L11.9819 11.1542C11.9912 11.1729 12.01 11.1917 12.0287 11.201C12.0287 11.201 12.0287 11.201 12.0381 11.201C12.0381 11.201 12.0381 11.201 12.0475 11.201C12.0662 11.201 12.0756 11.201 12.0943 11.201H12.7972C12.9003 11.201 12.9847 11.1167 12.9847 11.0136V6.64622C12.9847 6.54313 12.9003 6.45878 12.7972 6.45878L12.7878 6.43066Z" fill="#06C755" />
                                </svg>
                                <span style={{ fontSize: '12px', fontWeight: 'bold', fontFamily: '"Noto Sans JP", sans-serif', color: '#FFF' }}>LINEでログイン</span>
                            </button>
                            <button
                                className="flex items-center justify-center gap-3 w-full h-[50px] py-3 px-[21px] bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                type="button"
                                onClick={() => window.location.href = route('auth.google')}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 21" fill="none">
                                    <mask id="mask0_2_57217" maskUnits="userSpaceOnUse" x="-1" y="0" width="21" height="21">
                                        <path d="M19.9951 0.469727H-0.00488281V20.4697H19.9951V0.469727Z" fill="white" />
                                    </mask>
                                    <g mask="url(#mask0_2_57217)">
                                        <path d="M19.5951 10.6969C19.5951 9.98777 19.5315 9.30597 19.4133 8.65137H9.99512V12.5196H15.3769C15.1451 13.7696 14.4406 14.8287 13.3815 15.5378V18.0469H16.6133C18.5042 16.306 19.5951 13.7423 19.5951 10.6969Z" fill="#4285F4" />
                                        <path d="M9.99499 20.4701C12.695 20.4701 14.9586 19.5746 16.6131 18.0474L13.3813 15.5383C12.4859 16.1383 11.3404 16.4928 9.99499 16.4928C7.39039 16.4928 5.18589 14.7337 4.39949 12.3701H1.05859V14.961C2.70409 18.2292 6.08589 20.4701 9.99499 20.4701Z" fill="#34A853" />
                                        <path d="M4.39962 12.3694C4.19962 11.7694 4.08602 11.1285 4.08602 10.4694C4.08602 9.81032 4.19962 9.16942 4.39962 8.56942V5.97852H1.05872C0.381517 7.32852 -0.00488281 8.85582 -0.00488281 10.4694C-0.00488281 12.083 0.381517 13.6103 1.05872 14.9603L4.39962 12.3694Z" fill="#FBBC04" />
                                        <path d="M9.99499 4.44703C11.4631 4.44703 12.7813 4.95153 13.8177 5.94243L16.6859 3.07423C14.9541 1.46063 12.6904 0.469727 9.99499 0.469727C6.08589 0.469727 2.70409 2.71063 1.05859 5.97883L4.39949 8.56973C5.18589 6.20613 7.39039 4.44703 9.99499 4.44703Z" fill="#E94235" />
                                    </g>
                                </svg>
                                <span style={{ fontSize: '12px', fontWeight: 'bold', fontFamily: '"Noto Sans JP", sans-serif', color: '#363636', whiteSpace: 'nowrap' }}>Googleでログイン</span>
                            </button>
                        </div>

                        {/* Terms */}
                        <div className="text-center" style={{ fontSize: '12px', fontFamily: '"Noto Sans JP", sans-serif', color: '#ACACAC', paddingTop: '30px' }}>
                            ログインをすることで
                            <span className="text-blue-600 cursor-pointer hover:underline">利用規約</span>
                            及び
                            <span className="text-blue-600 cursor-pointer hover:underline">プライバシーポリシー</span>
                            に同意したものとみなします。
                        </div>
                    </div>
                </div>
            </section>

            {/* Mobile */}
            <section className="md:hidden flex flex-col justify-center items-center w-full bg-white" style={{ paddingTop: vw(80), paddingBottom: vw(80), paddingLeft: vw(16), paddingRight: vw(16) }}>
                <div className="flex flex-col w-full justify-center items-center bg-white shadow-[0_4px_36px_0_rgba(0,0,0,0.1)] relative" style={{ borderRadius: vw(10), paddingBottom: vw(20), paddingTop: vw(20), paddingLeft: vw(16), paddingRight: vw(16) }}>
                    {/* Close Button */}
                    <div className="flex justify-end w-full">
                        <button 
                            onClick={() => router.visit('/')}
                            className="cursor-pointer hover:opacity-80 transition-opacity"
                        >
                            <img src={close} alt="close" style={{ width: '32px', height: '32px' }} />
                        </button>
                    </div>
                    {/* Registration Form */}
                    <div className="flex flex-col items-center w-full pt-[14px]">
                        <div className="flex flex-col items-center w-full" style={{ gap: '32px' }}>
                            {/* Logo */}
                            <img src={logo} alt="Mechapuri Logo" style={{ width: '203px', height: '36px' }} />
                            <div className="text-[21px] leading-[27px] font-bold font-noto text-[#363636] text-center">
                                新規会員登録
                            </div>
                            <form onSubmit={submit} className="flex flex-col w-full" style={{ gap: '45px' }}>
                                <div className="flex flex-col" style={{ gap: '16px' }}>
                                    {/* Email Field */}
                                    <div className="flex flex-col" style={{ gap: '8px' }}>
                                        <label style={{ fontSize: '16px', fontWeight: 'medium', fontFamily: '"Noto Sans JP", sans-serif', color: '#363636' }}>
                                            メールアドレスを入力
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="example@email.com"
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                            value={data.email}
                                            onChange={e => setData('email', e.target.value)}
                                            autoComplete="email"
                                            style={{ fontSize: '16px', fontFamily: '"Noto Sans JP", sans-serif', color: '#000', height: '50px', borderRadius: '8px' }}
                                        />
                                        {backendErrors.email && (
                                            <div style={{ fontSize: '14px', fontFamily: '"Noto Sans JP", sans-serif', color: '#E53E3E' }}>
                                                {backendErrors.email}
                                            </div>
                                        )}
                                    </div>

                                    {/* Password Field */}
                                    <div className="flex flex-col" style={{ gap: '8px' }}>
                                        <label style={{ fontSize: '16px', fontWeight: 'medium', fontFamily: '"Noto Sans JP", sans-serif', color: '#363636' }}>
                                            パスワードを入力
                                        </label>
                                        <input
                                            type="password"
                                            name="password"
                                            placeholder="半角英数字8文字以上"
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                            value={data.password}
                                            onChange={e => setData('password', e.target.value)}
                                            autoComplete="new-password"
                                            style={{ fontSize: '16px', fontFamily: '"Noto Sans JP", sans-serif', color: '#000', height: '50px', borderRadius: '8px' }}
                                        />
                                        {backendErrors.password && (
                                            <div style={{ fontSize: '14px', fontFamily: '"Noto Sans JP", sans-serif', color: '#E53E3E' }}>
                                                {backendErrors.password}
                                            </div>
                                        )}
                                    </div>

                                    {/* Password Confirmation Field */}
                                    <div className="flex flex-col" style={{ gap: '8px' }}>
                                        <label style={{ fontSize: '16px', fontWeight: 'medium', fontFamily: '"Noto Sans JP", sans-serif', color: '#363636' }}>
                                            パスワードを入力(確認用)
                                        </label>
                                        <input
                                            type="password"
                                            name="password_confirmation"
                                            placeholder="半角英数字8文字以上"
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                            value={data.password_confirmation}
                                            onChange={e => setData('password_confirmation', e.target.value)}
                                            autoComplete="new-password"
                                            style={{ fontSize: '16px', fontFamily: '"Noto Sans JP", sans-serif', color: '#000', height: '50px', borderRadius: '8px' }}
                                        />
                                        {backendErrors.password_confirmation && (
                                            <div style={{ fontSize: '14px', fontFamily: '"Noto Sans JP", sans-serif', color: '#E53E3E' }}>
                                                {backendErrors.password_confirmation}
                                            </div>
                                        )}
                                    </div>
                                    {/* Email Verification Input */}
                                    {showVerificationInput && (
                                        <div className="flex flex-col w-full p-4 border border-gray-200 rounded-lg bg-gray-50" style={{ gap: '16px' }}>
                                            <div style={{ fontSize: '16px', fontWeight: 'medium', fontFamily: '"Noto Sans JP", sans-serif', color: '#363636', textAlign: 'center' }}>
                                                認証コードを入力してください
                                            </div>
                                            <div className="flex justify-center items-center" style={{ gap: '8px' }}>
                                                {[0, 1, 2, 3, 4, 5].map((index) => (
                                                    <div key={index} className="relative">
                                                        <input
                                                            type="text"
                                                            maxLength="1"
                                                            placeholder=""
                                                            value={verificationCode[index]}
                                                            onChange={(e) => {
                                                                const value = e.target.value.replace(/\D/g, '');
                                                                const newCode = [...verificationCode];
                                                                newCode[index] = value;
                                                                setVerificationCode(newCode);

                                                                if (value && index < 5) {
                                                                    const container = e.target.parentNode.parentNode;
                                                                    const inputs = container.querySelectorAll('input[type="text"]');
                                                                    if (inputs[index + 1]) {
                                                                        inputs[index + 1].focus();
                                                                    }
                                                                }
                                                            }}
                                                            onPaste={(e) => {
                                                                e.preventDefault();
                                                                const pastedData = e.clipboardData.getData('text');
                                                                const numbersOnly = pastedData.replace(/\D/g, '');

                                                                if (numbersOnly.length >= 6) {
                                                                    const newCode = ['', '', '', '', '', ''];
                                                                    for (let i = 0; i < 6; i++) {
                                                                        newCode[i] = numbersOnly[i];
                                                                    }
                                                                    setVerificationCode(newCode);

                                                                    const container = e.target.parentNode.parentNode;
                                                                    const inputs = container.querySelectorAll('input[type="text"]');
                                                                    if (inputs[5]) inputs[5].focus();
                                                                } else if (numbersOnly.length > 0) {
                                                                    const newCode = [...verificationCode];
                                                                    for (let i = 0; i < Math.min(numbersOnly.length, 6); i++) {
                                                                        newCode[i] = numbersOnly[i];
                                                                    }
                                                                    setVerificationCode(newCode);

                                                                    const nextIndex = Math.min(numbersOnly.length, 5);
                                                                    const container = e.target.parentNode.parentNode;
                                                                    const inputs = container.querySelectorAll('input[type="text"]');
                                                                    if (inputs[nextIndex]) inputs[nextIndex].focus();
                                                                }
                                                            }}
                                                            onKeyDown={(e) => {
                                                                if (e.key === 'Backspace' || e.key === 'Delete') {
                                                                    e.preventDefault();
                                                                    const newCode = [...verificationCode];

                                                                    if (e.key === 'Backspace') {
                                                                        if (verificationCode[index]) {
                                                                            newCode[index] = '';
                                                                            setVerificationCode(newCode);
                                                                        } else if (index > 0) {
                                                                            newCode[index - 1] = '';
                                                                            setVerificationCode(newCode);
                                                                            const container = e.target.parentNode.parentNode;
                                                                            const inputs = container.querySelectorAll('input[type="text"]');
                                                                            if (inputs[index - 1]) {
                                                                                inputs[index - 1].focus();
                                                                            }
                                                                        }
                                                                    } else if (e.key === 'Delete') {
                                                                        newCode[index] = '';
                                                                        setVerificationCode(newCode);

                                                                        if (index < 5) {
                                                                            const container = e.target.parentNode.parentNode;
                                                                            const inputs = container.querySelectorAll('input[type="text"]');
                                                                            if (inputs[index + 1]) {
                                                                                inputs[index + 1].focus();
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }}
                                                            className="text-center border border-gray-300 rounded focus:outline-none focus:border-blue-500 bg-transparent"
                                                            style={{
                                                                width: '40px',
                                                                height: '50px',
                                                                fontSize: '16px',
                                                                fontFamily: '"Noto Sans JP", sans-serif',
                                                                color: '#000'
                                                            }}
                                                            disabled={codeVerifying}
                                                        />
                                                        {index === 2 && (
                                                            <div className="absolute right-[-6px] top-1/2 transform -translate-y-1/2 w-1 h-px bg-gray-300"></div>
                                                        )}
                                                        {index === 5 && verificationSuccess && (
                                                            <div className="absolute right-[-15px] top-1/2 transform -translate-y-1/2 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                                                                <svg width="12" height="12" fill="white" viewBox="0 0 20 20">
                                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                                </svg>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                            {codeVerifying && (
                                                <div className="flex items-center justify-center gap-2 mt-3">
                                                    <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                                                    <span style={{ fontSize: '14px', fontFamily: '"Noto Sans JP", sans-serif', color: '#363636' }}>
                                                        認証中...
                                                    </span>
                                                </div>
                                            )}
                                            {errors.captcha && (
                                                <div style={{ fontSize: '14px', fontFamily: '"Noto Sans JP", sans-serif', color: '#E53E3E', textAlign: 'center', marginTop: '10px' }}>
                                                    {errors.captcha}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                                {/* Submit Button */}
                                <div className="flex flex-col items-center gap-4">
                                    <button
                                        className="w-[240px] py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-[8px] font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                                        type="submit"
                                        disabled={processing || emailSending}
                                        style={{ fontSize: '16px', fontWeight: 'medium', fontFamily: '"Noto Sans JP", sans-serif', color: '#FFF' }}
                                    >
                                        {emailSending ? '認証コード送信中...' : '登録する'}
                                    </button>
                                    {/* Login Link */}
                                    <div className="text-center">
                                        <Link href="/login" className="inline-flex items-center" style={{ textDecoration: 'none' }}>
                                            <span style={{ fontSize: '14px', fontFamily: '"Noto Sans JP", sans-serif', color: '#0D0D0D' }}>
                                                ログインは
                                            </span>
                                            <span style={{ fontSize: '14px', fontFamily: '"Noto Sans JP", sans-serif', color: '#FF2AA1', marginLeft: '4px' }}>
                                                こちら
                                            </span>
                                        </Link>
                                    </div>
                                </div>

                            </form>
                        </div>

                        {/* Divider */}
                        <div className="flex items-center justify-center w-full my-[16px]">
                            <div className="flex-1 h-px bg-gray-300"></div>
                            <span style={{ fontSize: '14px', fontFamily: '"Noto Sans JP", sans-serif', color: '#000' }}>または</span>
                            <div className="flex-1 h-px bg-gray-300"></div>
                        </div>

                        {/* Social Login Buttons */}
                        <div className="flex flex-row gap-5">
                            <button
                                className="flex items-center justify-center w-full h-[50px] py-[13.8px] px-[19.4px] bg-green-500 text-white rounded-lg hover:opacity-90 transition-opacity"
                                type="button"
                                onClick={() => window.location.href = route('auth.line')}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="18" viewBox="0 0 26 21" fill="none">
                                    <path d="M19.9951 8.58595C19.9951 4.11547 15.5059 0.469727 9.99512 0.469727C4.48434 0.469727 -0.00488281 4.10609 -0.00488281 8.58595C-0.00488281 13.0658 3.55651 15.9524 8.35501 16.5897C8.68303 16.6647 9.12352 16.8052 9.23598 17.0864C9.33908 17.3395 9.30159 17.7331 9.2641 17.9861C9.2641 17.9861 9.14226 18.689 9.12352 18.839C9.07666 19.092 8.92671 19.8231 9.98575 19.3826C11.0542 18.9327 15.7402 15.9899 17.8395 13.5813C19.2922 11.988 19.9857 10.376 19.9857 8.58595H19.9951Z" fill="white" />
                                    <path d="M16.668 11.1729H13.8564C13.7533 11.1729 13.6689 11.0886 13.6689 10.9855V6.62748C13.6689 6.51501 13.7533 6.43066 13.8564 6.43066H16.668C16.7711 6.43066 16.8554 6.51501 16.8554 6.61811V7.33038C16.8554 7.43347 16.7711 7.51782 16.668 7.51782H14.7561V8.25822H16.668C16.7711 8.25822 16.8554 8.34257 16.8554 8.44566V9.15793C16.8554 9.26103 16.7711 9.34538 16.668 9.34538H14.7561V10.0858H16.668C16.7711 10.0858 16.8554 10.1701 16.8554 10.2732V10.9855C16.8554 11.0886 16.7711 11.1729 16.668 11.1729Z" fill="#06C755" />
                                    <path d="M6.27445 11.1729C6.37755 11.1729 6.4619 11.0886 6.4619 10.9855V10.2732C6.4619 10.1701 6.37755 10.0858 6.27445 10.0858H4.36255V6.61811C4.36255 6.51501 4.27821 6.43066 4.17511 6.43066H3.46283C3.35974 6.43066 3.27539 6.51501 3.27539 6.61811V10.9761C3.27539 11.0886 3.35974 11.1729 3.46283 11.1729H6.27445Z" fill="#06C755" />
                                    <path d="M7.96124 6.43066H7.24896C7.14544 6.43066 7.06152 6.51458 7.06152 6.61811V10.9855C7.06152 11.089 7.14544 11.1729 7.24896 11.1729H7.96124C8.06476 11.1729 8.14868 11.089 8.14868 10.9855V6.61811C8.14868 6.51458 8.06476 6.43066 7.96124 6.43066Z" fill="#06C755" />
                                    <path d="M12.7878 6.43066H12.0756C11.9725 6.43066 11.8881 6.51501 11.8881 6.61811V9.21416L9.89188 6.51501C9.89188 6.51501 9.88251 6.50564 9.87314 6.49626C9.87314 6.49626 9.87313 6.49627 9.86376 6.48689C9.86376 6.48689 9.86376 6.48689 9.85439 6.48689C9.85439 6.48689 9.85439 6.48689 9.84502 6.48689C9.84502 6.48689 9.84502 6.48689 9.83564 6.48689C9.83564 6.48689 9.83565 6.48689 9.82628 6.48689C9.82628 6.48689 9.82627 6.48689 9.8169 6.48689C9.8169 6.48689 9.8169 6.48689 9.80753 6.48689C9.80753 6.48689 9.80753 6.48689 9.79816 6.48689H9.08588C8.98279 6.48689 8.89844 6.57124 8.89844 6.67434V11.0417C8.89844 11.1448 8.98279 11.2292 9.08588 11.2292H9.79816C9.90125 11.2292 9.9856 11.1448 9.9856 11.0417V8.45503L11.9819 11.1542C11.9912 11.1729 12.01 11.1917 12.0287 11.201C12.0287 11.201 12.0287 11.201 12.0381 11.201C12.0381 11.201 12.0381 11.201 12.0475 11.201C12.0662 11.201 12.0756 11.201 12.0943 11.201H12.7972C12.9003 11.201 12.9847 11.1167 12.9847 11.0136V6.64622C12.9847 6.54313 12.9003 6.45878 12.7972 6.45878L12.7878 6.43066Z" fill="#06C755" />
                                </svg>
                                <span style={{ fontSize: '11px', fontWeight: 'bold', fontFamily: '"Noto Sans JP", sans-serif', color: '#FFF', whiteSpace: 'nowrap' }}>LINEでログイン</span>
                            </button>
                            <button
                                className="flex items-center justify-center gap-1 w-full h-[50px] py-[12.7px] px-[17.7px] bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                type="button"
                                onClick={() => window.location.href = route('auth.google')}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 20 21" fill="none">
                                    <mask id="mask0_2_57217" maskUnits="userSpaceOnUse" x="-1" y="0" width="21" height="21">
                                        <path d="M19.9951 0.469727H-0.00488281V20.4697H19.9951V0.469727Z" fill="white" />
                                    </mask>
                                    <g mask="url(#mask0_2_57217)">
                                        <path d="M19.5951 10.6969C19.5951 9.98777 19.5315 9.30597 19.4133 8.65137H9.99512V12.5196H15.3769C15.1451 13.7696 14.4406 14.8287 13.3815 15.5378V18.0469H16.6133C18.5042 16.306 19.5951 13.7423 19.5951 10.6969Z" fill="#4285F4" />
                                        <path d="M9.99499 20.4701C12.695 20.4701 14.9586 19.5746 16.6131 18.0474L13.3813 15.5383C12.4859 16.1383 11.3404 16.4928 9.99499 16.4928C7.39039 16.4928 5.18589 14.7337 4.39949 12.3701H1.05859V14.961C2.70409 18.2292 6.08589 20.4701 9.99499 20.4701Z" fill="#34A853" />
                                        <path d="M4.39962 12.3694C4.19962 11.7694 4.08602 11.1285 4.08602 10.4694C4.08602 9.81032 4.19962 9.16942 4.39962 8.56942V5.97852H1.05872C0.381517 7.32852 -0.00488281 8.85582 -0.00488281 10.4694C-0.00488281 12.083 0.381517 13.6103 1.05872 14.9603L4.39962 12.3694Z" fill="#FBBC04" />
                                        <path d="M9.99499 4.44703C11.4631 4.44703 12.7813 4.95153 13.8177 5.94243L16.6859 3.07423C14.9541 1.46063 12.6904 0.469727 9.99499 0.469727C6.08589 0.469727 2.70409 2.71063 1.05859 5.97883L4.39949 8.56973C5.18589 6.20613 7.39039 4.44703 9.99499 4.44703Z" fill="#E94235" />
                                    </g>
                                </svg>
                                <span style={{ fontSize: '10px', fontWeight: 'bold', fontFamily: '"Noto Sans JP", sans-serif', color: '#363636', whiteSpace: 'nowrap' }}>Googleでログイン</span>
                            </button>
                        </div>

                        {/* Terms */}
                        <div className="text-center" style={{ fontSize: '12px', fontFamily: '"Noto Sans JP", sans-serif', color: '#ACACAC', paddingTop: '30px' }}>
                            ログインをすることで
                            <span className="text-[#363636] cursor-pointer hover:underline">利用規約</span>
                            及び
                            <span className="text-[#363636] cursor-pointer hover:underline">プライバシーポリシー</span>
                            に同意したものとみなします。
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}