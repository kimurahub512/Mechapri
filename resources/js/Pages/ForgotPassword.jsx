import Header from '@/Components/header/header';
import logo from '@/assets/images/mechapuri-logo.svg';
import '@/../css/login.css';
import { useForm, Link } from '@inertiajs/react';
import { useState } from 'react';
import Modal from '@/Components/Modal';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors: backendErrors } = useForm({
        email: '',
    });
    const [errors, setErrors] = useState({});
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    // Frontend validation
    const validate = () => {
        const newErrors = {};
        if (!data.email.match(/^\S+@\S+\.\S+$/)) {
            newErrors.email = '有効なメールアドレスを入力してください。';
        }
        return newErrors;
    };

    const submit = (e) => {
        e.preventDefault();
        const newErrors = validate();
        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
            post(route('password.email'));
        } else {
            // Show first error in modal
            const firstError = Object.values(newErrors)[0];
            setModalMessage(firstError);
            setShowErrorModal(true);
        }
    };

    return (
        <>
            <Modal show={showErrorModal} maxWidth="sm" onClose={() => setShowErrorModal(false)}>
                <div className="p-6 text-center">
                    <div className="text-lg text-red-600 mb-4">{modalMessage}</div>
                    <button
                        className="login-button"
                        type="button"
                        onClick={() => setShowErrorModal(false)}
                    >
                        閉じる
                    </button>
                </div>
            </Modal>
            <Header />
            <div className="login-container">
                <div className="login-modal">
                    {/* X Button */}
                    <button
                        className="login-close"
                        aria-label="Close forgot password"
                        onClick={() => window.location.href = '/login'}
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
                    <img src={logo} alt="Mechapuri Logo" className="login-logo" />
                    
                    {/* Forgot password form fields */}
                    <form className="login-form" onSubmit={submit}>
                        <div className="login-title">
                        パスワードを忘れた場合
                        </div>
                        <div className="login-label">
                            メールアドレスを入力
                        </div>
                        <input
                            type="email"
                            name="email"
                            placeholder="example@email.com"
                            className="login-input placeholder-styled"
                            value={data.email}
                            onChange={e => setData('email', e.target.value)}
                            autoComplete="email"
                        />
                        {errors.email && <div className="login-error">{errors.email}</div>}
                        {backendErrors.email && <div className="login-error">{backendErrors.email}</div>}
                        
                        {status && (
                            <div className="login-success">
                                {status}
                            </div>
                        )}
                        
                        <button className="login-button" type="submit" disabled={processing}>
                            パスワードリセットリンクを送信
                        </button>
                        <div className="login-login-link">
                            <Link
                                href="/login"
                                style={{ textDecoration: 'none' }}
                            >
                                <span style={{ color: '#0D0D0D', fontFamily: '"Hiragino Sans"' }}>
                                    ログインに戻る場合は
                                </span>
                                <span style={{ color: '#FF2AA1', fontFamily: '"Hiragino Sans"', marginLeft: 4 }}>
                                    こちら
                                </span>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
