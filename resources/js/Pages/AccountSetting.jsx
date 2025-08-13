import React, { useEffect, useState } from 'react';
import Header from '@/Components/header/header';
import Footer from '@/Components/footer/footer';
import '@/../../resources/css/shopmanagement.css';
import { vw, vwd, responsiveText, responsivePosition, responsiveMetric, responsiveTextD, responsivePositionD, responsiveMetricD } from '@/lib/utils';

const AccountSetting = () => {
  const [userData, setUserData] = useState({
    id: '',
    name: '',
    email: '',
    notificationSettings: {
      '商品が購入されたら通知を受け取る': true,
      '販売終了した商品の再販リクエスト': true,
      'ユーザーからのフォロー': true,
      'フォロー中のショップの新規出品': true,
      'メディパンネップリからのお知らせ': true
    }
  });
  const [originalEmail, setOriginalEmail] = useState(''); // Store original email from DB
  const [emailInput, setEmailInput] = useState(''); // Separate state for email input
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [resultMessage, setResultMessage] = useState({ type: '', message: '' });
  const [emailVerifying, setEmailVerifying] = useState(false);

  // Email verification states
  const [showVerificationInput, setShowVerificationInput] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [pendingEmail, setPendingEmail] = useState('');
  const [codeVerifying, setCodeVerifying] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(false);

  // Map notification settings from database to UI
  const notificationMapping = {
    'notification_purchase': '商品が購入されたら通知を受け取る',
    'notification_relist': '販売終了した商品の再販リクエスト',
    'notification_follow': 'ユーザーからのフォロー',
    'notification_new_item': 'フォロー中のショップの新規出品',
    'notification_medi_panel': 'メディパンネップリからのお知らせ'
  };

  // Check if email verification button should be disabled
  const isEmailButtonDisabled = () => {
    return !emailInput || emailInput === originalEmail;
  };

  // Fetch user data on component mount
  useEffect(() => {
    fetchUserData();
  }, []);

  // Auto-verify when 6 digits are entered
  useEffect(() => {
    if (verificationCode.length === 6) {
      handleVerifyCode();
    }
  }, [verificationCode]);

  const fetchUserData = async () => {
    try {
      const response = await fetch('/api/account-settings', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        }
      });

      if (response.ok) {
        const data = await response.json();

        // Map database notification settings to UI format
        const mappedNotifications = {};
        Object.keys(notificationMapping).forEach(dbKey => {
          const uiKey = notificationMapping[dbKey];
          mappedNotifications[uiKey] = data.notification_settings[dbKey];
        });

        setUserData({
          id: data.id || '',
          name: data.name || '',
          email: data.email || '',
          notificationSettings: mappedNotifications
        });
        setOriginalEmail(data.email || '');
        setEmailInput(data.email || '');
      } else {
        console.error('Failed to fetch user data');
        setResultMessage({ type: 'error', message: 'データの取得に失敗しました' });
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setResultMessage({ type: 'error', message: 'データの取得に失敗しました' });
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = (setting) => {
    setUserData(prev => ({
      ...prev,
      notificationSettings: {
        ...prev.notificationSettings,
        [setting]: !prev.notificationSettings[setting]
      }
    }));
  };

  const handleNameChange = (e) => {
    setUserData(prev => ({
      ...prev,
      name: e.target.value
    }));
  };

  const handleEmailChange = (e) => {
    setEmailInput(e.target.value);
  };

  const handleEmailVerification = async () => {
    if (isEmailButtonDisabled()) return;

    setEmailVerifying(true);
    setResultMessage({ type: '', message: '' });

    try {
      // First check if email exists
      const checkResponse = await fetch('/api/check-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
        body: JSON.stringify({
          email: emailInput
        })
      });

      if (checkResponse.ok) {
        const checkData = await checkResponse.json();

        if (checkData.exists) {
          // Email already exists in database
          setResultMessage({
            type: 'error',
            message: 'このメールアドレスは既に使用されています'
          });
        } else {
          // Email doesn't exist, send verification code
          const sendCodeResponse = await fetch('/api/send-verification-code', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
            body: JSON.stringify({
              email: emailInput
            })
          });

          if (sendCodeResponse.ok) {
            setPendingEmail(emailInput);
            setShowVerificationInput(true);
            setResultMessage({
              type: 'success',
              message: '認証コードを送信しました。6桁のコードを入力してください。'
            });
          } else {
            setResultMessage({
              type: 'error',
              message: '認証コードの送信に失敗しました'
            });
          }
        }
      } else {
        setResultMessage({
          type: 'error',
          message: 'メールアドレスの確認に失敗しました'
        });
      }
    } catch (error) {
      console.error('Error checking email:', error);
      setResultMessage({
        type: 'error',
        message: 'メールアドレスの確認に失敗しました'
      });
    } finally {
      setEmailVerifying(false);
    }
  };



  const handleVerifyCode = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      return;
    }

    setCodeVerifying(true);
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
          code: verificationCode
        })
      });

      if (response.ok) {
        const data = await response.json();

        if (data.verified) {
          // Code is correct, update email
          const updateResponse = await fetch('/api/update-email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
            body: JSON.stringify({
              email: pendingEmail
            })
          });

          if (updateResponse.ok) {
            setUserData(prev => ({ ...prev, email: pendingEmail }));
            setOriginalEmail(pendingEmail);
            setVerificationSuccess(true);
            setResultMessage({
              type: 'success',
              message: 'メールアドレスが正常に更新されました。'
            });
            // Clear verification state after a delay
            setTimeout(() => {
              setShowVerificationInput(false);
              setVerificationCode('');
              setPendingEmail('');
              setVerificationSuccess(false);
            }, 2000);
          } else {
            setResultMessage({
              type: 'error',
              message: 'メールアドレスの更新に失敗しました'
            });
          }
        } else {
          setResultMessage({
            type: 'error',
            message: '認証コードが正しくありません'
          });
          setVerificationCode(''); // Clear the input for retry
        }
      } else {
        setResultMessage({
          type: 'error',
          message: '認証コードの確認に失敗しました'
        });
      }
    } catch (error) {
      console.error('Error verifying code:', error);
      setResultMessage({
        type: 'error',
        message: '認証コードの確認に失敗しました'
      });
    } finally {
      setCodeVerifying(false);
    }
  };

  const handleCloseVerificationInput = () => {
    setShowVerificationInput(false);
    setVerificationCode('');
    setPendingEmail('');
  };

  const handleSaveClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirmSave = async () => {
    setShowConfirmation(false);
    setSaving(true);
    setResultMessage({ type: '', message: '' });

    try {
      // Map UI notification settings back to database format
      const dbNotificationSettings = {};
      Object.keys(notificationMapping).forEach(dbKey => {
        const uiKey = notificationMapping[dbKey];
        dbNotificationSettings[dbKey] = userData.notificationSettings[uiKey];
      });

      const response = await fetch('/api/account-settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
        body: JSON.stringify({
          name: userData.name,
          notification_settings: dbNotificationSettings
        })
      });

      if (response.ok) {
        const data = await response.json();
        setResultMessage({ type: 'success', message: '設定が正常に保存されました' });
        // Auto-hide success message after 3 seconds
        setTimeout(() => {
          setResultMessage({ type: '', message: '' });
        }, 3000);
      } else {
        const errorData = await response.json();
        setResultMessage({
          type: 'error',
          message: errorData.message || '設定の保存に失敗しました'
        });
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      setResultMessage({ type: 'error', message: '設定の保存に失敗しました' });
    } finally {
      setSaving(false);
    }
  };

  const handleCancelSave = () => {
    setShowConfirmation(false);
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="flex justify-center items-center min-h-screen">
          <div>Loading...</div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      {/* Result Message */}
      {resultMessage.type && (
        <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-lg shadow-lg ${resultMessage.type === 'success'
          ? 'bg-green-500 text-white'
          : 'bg-red-500 text-white'
          }`}>
          {resultMessage.message}
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-bold mb-4">確認</h3>
            <p className="mb-6">設定を保存しますか？</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={handleCancelSave}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
              >
                キャンセル
              </button>
              <button
                onClick={handleConfirmSave}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}



      {/* Main Section (Desktop) */}
      <main className="hidden md:flex justify-center items-start gap-[10px] flex-1 self-stretch p-[32px_0_80px_0]">
        {/* Frame 1 */}
        <div className="flex flex-col items-center gap-[16px]" style={{ width: vwd(874) }}>
          {/* Frame 11 */}
          <div className="flex flex-col items-start w-full gap-[8px]">
            <span style={{ ...responsiveTextD(36, 54, null, 'bold', 'noto, "#363636"') }}>アカウント</span>
            <span style={{ ...responsiveTextD(18, 32.4, null, 'normal', 'noto, "#363636"') }}>ユーザーID: {userData.id}</span>
          </div>
          {/* Frame 12 */}
          <div className="flex flex-col items-center w-full p-[32px_36px] gap-[10px] bg-white shadow-[0_4px_36px_0_rgba(0,0,0,0.10)]">
            {/* 121 */}
            <div className="flex flex-col items-start gap-[25px]" style={{ width: vwd(802) }}>
              {/* 1211 */}
              <div className="flex flex-col gap-[4px]" style={{ ...responsiveMetricD(802, 116) }}>
                {/* 12111 */}
                <div className="flex items-center gap-[12px] p-[25px_0_6px_0] self-stretch">
                  <span style={{ ...responsiveTextD(21, 27, null, 'bold', 'noto', '#363636') }}>ユーザー名</span>
                  <span style={{ ...responsiveTextD(16, 24, null, 'normal', 'noto', '#ACACAC') }}>(20文字まで)</span>
                </div>
                {/* 12112 */}
                <div className="flex flex-col pb-[8px] self-stretch">
                  <input
                    type="text"
                    className="p-[12.5px_11.99px_12.49px_11.99px] rounded-[5.71px] bg-white border border-[#E9E9E9] focus:outline-none placeholder:text-[#ACACAC] placeholder:font-normal placeholder:font-noto"
                    placeholder="入力するとQRコードに表示されてわかりやすくなります"
                    value={userData.name}
                    onChange={handleNameChange}
                    style={{ ...responsiveMetricD(802, 46), ...responsiveTextD(16, 24, null, 'normal', 'noto', '#363636') }}
                  />
                </div>
              </div>
              {/* 1212 */}
              <div className="flex flex-col gap-[4px]" style={{ ...responsiveMetricD(802) }}>
                {/* 12121 */}
                <div className="flex items-center gap-[12px] p-[25px_0_6px_0] self-stretch">
                  <span style={{ ...responsiveTextD(21, 27, null, 'bold', 'noto', '#363636') }}>メールアドレス</span>
                  <span style={{ ...responsiveTextD(16, 24, null, 'normal', 'noto', '#ACACAC') }}>(非公開)</span>
                </div>
                {/* 12122 */}
                <div className="flex items-center gap-[16px] pb-[8px] self-stretch">
                  <input
                    type="text"
                    className="flex-1 p-[12.5px_11.99px_12.49px_11.99px] rounded-[5.71px] bg-white border border-[#E9E9E9] focus:outline-none"
                    placeholder=""
                    value={emailInput}
                    onChange={handleEmailChange}
                    style={{ ...responsiveMetricD(null, 46) }}
                  />
                  {/* 121222 */}
                  <div className={`flex p-[2px] justify-center items-center rounded-[8px] ${isEmailButtonDisabled() || emailVerifying
                    ? 'bg-[#E9EEF1]'
                    : 'bg-green-500'
                    }`} style={{ width: vwd(320) }}>
                    {/* 1212221 */}
                    <button
                      className={`flex flex-col items-center flex-1 p-[4.5px_17px_11.5px_17px] transition-all duration-200 ${isEmailButtonDisabled() || emailVerifying
                        ? 'opacity-50 cursor-not-allowed'
                        : 'text-white'
                        }`}
                      onClick={handleEmailVerification}
                      disabled={isEmailButtonDisabled() || emailVerifying}
                    >
                      <span className={`whitespace-nowrap ${isEmailButtonDisabled() || emailVerifying
                        ? 'text-[#969696]'
                        : 'text-white'
                        }`} style={{ ...responsiveTextD(14, 21, null, 'normal', 'noto') }}>メールアドレス変更にはメール認証が必要です</span>
                      <span className={
                        isEmailButtonDisabled() || emailVerifying
                          ? 'text-[#969696]'
                          : 'text-white'
                      } style={{ ...responsiveTextD(18, 21, null, 'black', 'noto') }}>
                        {emailVerifying ? '確認中...' : '認証コードを送る'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Email Verification Input */}
                {showVerificationInput && (
                  <div className="flex flex-col gap-[8px] w-full">
                    <span className="text-center" style={{ ...responsiveTextD(16, 24, null, 'normal', 'noto', '#363636') }}>認証コードを入力してください</span>
                    <div className="flex flex-row gap-[8px] justify-center items-center relative">
                      {[0, 1, 2, 3, 4, 5].map((index) => (
                        <React.Fragment key={index}>
                          <input
                            type="text"
                            maxLength="1"
                            placeholder=""
                            value={verificationCode[index] || ''}
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, '');
                              if (value) {
                                const newCode = verificationCode.split('');
                                newCode[index] = value;
                                const updatedCode = newCode.join('');
                                setVerificationCode(updatedCode);
                                
                                // Move to next input if not the last one
                                if (index < 5) {
                                  const nextInput = e.target.parentNode.children[index + 1];
                                  if (nextInput) nextInput.focus();
                                }
                              }
                            }}
                            onKeyDown={(e) => {
                              if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
                                const newCode = verificationCode.split('');
                                newCode[index - 1] = '';
                                setVerificationCode(newCode.join(''));
                                const prevInput = e.target.parentNode.children[index - 1];
                                if (prevInput) prevInput.focus();
                              }
                            }}
                            className="text-center p-[12.5px_11.99px_12.49px_11.99px] rounded-[5.71px] bg-gray-200 border border-[#E9E9E9] focus:outline-none focus:border-blue-500"
                            style={{ ...responsiveMetricD(48, 64) }}
                            disabled={codeVerifying}
                          />
                          {index === 2 && (
                            <div className="border-b border-gray-200" style={{ width: vwd(48) }}></div>
                          )}
                          {index === 5 && verificationSuccess && (
                            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 flex items-center justify-center w-6 h-6 bg-green-500 rounded-full">
                              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                    {codeVerifying && (
                      <div className="flex items-center gap-[8px] justify-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                        <span style={{ ...responsiveTextD(14, 21, null, 'normal', 'noto', '#363636') }}>認証中...</span>
                      </div>
                    )}
                  </div>
                )}
                  </div>
              {/* 1213 */}
                <div className="flex flex-col gap-[4px]" style={{ width: vwd(809) }}>
                  {/* 12131 */}
                  <div className="flex items-center gap-[12px] p-[25px_0_6px_0] self-stretch">
                    <span style={{ ...responsiveTextD(21, 27, null, 'bold', 'noto', '#363636') }}>メール通知設定</span>
                  </div>
                  {/* 12132 */}
                  <div className="flex flex-col items-start gap-[8px] self-stretch">
                    {[
                      '商品が購入されたら通知を受け取る',
                      '販売終了した商品の再販リクエスト',
                      'ユーザーからのフォロー',
                      'フォロー中のショップの新規出品',
                      'メディパンネップリからのお知らせ'
                    ].map((text, idx) => (
                      <div key={idx} className="flex flex-col p-[14px_0] gap-[10px] self-stretch border-b border-[#E9E9E9]">
                        <div className="flex justify-between items-center self-stretch">
                          <div className="flex items-center flex-1" style={{ paddingRight: vwd(440), paddingTop: vwd(8) }}>
                            <span className="whitespace-nowrap" style={{ ...responsiveTextD(18, 24, null, 'normal', 'noto', '#363636') }}>{text}</span>
                          </div>
                          <div className="flex items-center" style={{ height: vwd(32), paddingRight: vwd(16) }}>
                            <button
                              onClick={() => handleToggle(text)}
                              className="rounded-full flex items-center transition-all duration-200 ease-in-out"
                              style={{
                                ...responsiveMetricD(62, 32),
                                backgroundColor: userData.notificationSettings[text] ? '#AB31D3' : '#E9E9E9'
                              }}
                            >
                              <div
                                className="rounded-full bg-white transition-all duration-200 ease-in-out"
                                style={{
                                  ...responsiveMetricD(28, 28),
                                  marginLeft: userData.notificationSettings[text] ? vwd(2) : vwd(32)
                                }}
                              ></div>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* 1234: 保存する button */}
              <button
                className="flex p-[2px] justify-center items-center self-stretch rounded-[8px] bg-[#E9EEF1]"
                style={{ ...responsiveMetricD('full', 60), marginTop: vwd(24) }}
                onClick={handleSaveClick}
                disabled={saving}
              >
                <span style={{ ...responsiveTextD(18, 21, null, 'black', 'noto', '#969696') }}>
                  {saving ? '保存中...' : '保存する'}
                </span>
              </button>
            </div>
          </div>
      </main>
      {/* Mobile Main Section */}
      <main className="inline-flex md:hidden flex-col items-start w-full" style={{ gap: vw(16) }}>
        {/* Frame 1 */}
        <div className="flex flex-row items-center w-full" style={{ gap: vw(16), paddingTop: vw(32), paddingLeft: vw(16), paddingRight: vw(16) }}>
          <span style={{ ...responsiveText(24, 24, null, 'bold', 'noto', '#363636') }}>アカウント</span>
          <span style={{ ...responsiveText(18, 32.4, null, 'normal', 'noto', '#363636') }}>ユーザーID: {userData.id}</span>
        </div>
        {/* Frame 12 */}
        <div className="flex flex-col items-center self-stretch rounded-[10px] bg-white shadow-[0_4px_36px_0_rgba(0,0,0,0.10)] mx-auto" style={{ gap: vw(16), paddingTop: vw(20), paddingBottom: vw(20), paddingLeft: vw(16), paddingRight: vw(16), width: vw(343) }}>
          {/* 121 */}
          <div className="flex flex-col items-center gap-[16px] w-full">
            {/* 1211 */}
            <div className="flex flex-col items-start gap-[4px] w-full">
              {/* 12111 */}
              <div className="flex items-center gap-[12px] p-[12px_0_6px_0] self-stretch">
                <span style={{ ...responsiveText(14, 14, null, 'bold', 'noto', '#363636') }}>ユーザー名</span>
                <span style={{ ...responsiveText(14, 21, 0.7, 'normal', 'noto', '#ACACAC') }}>(20文字まで)</span>
              </div>
              {/* 12112 */}
              <div className="flex flex-col pb-[8px] self-stretch w-full">
                <input
                  type="text"
                  className="w-full p-[12.5px_11.99px_12.49px_11.99px] rounded-[5.71px] bg-white border border-[#E9E9E9] focus:outline-none placeholder:text-[#ACACAC] placeholder:font-normal placeholder:font-noto placeholder:text-[14px]"
                  placeholder="入力するとQRコードに表示されてわかりやすくなります"
                  value={userData.name}
                  onChange={handleNameChange}
                  style={{ ...responsiveMetric(null, 46) }}
                />
              </div>
            </div>
            {/* 1212 */}
            <div className="flex flex-col items-start gap-[4px] w-full">
              {/* 12121 */}
              <div className="flex items-center gap-[12px] p-[12px_0_6px_0] self-stretch">
                <span style={{ ...responsiveText(14, 14, null, 'bold', 'noto', '#363636') }}>メールアドレス</span>
                <span style={{ ...responsiveText(14, 21, null, 'normal', 'noto', '#ACACAC') }}>(非公開)</span>
              </div>
              {/* 12122 */}
              <div className="flex flex-col justify-center items-start gap-[16px] self-stretch w-full">
                <input
                  type="text"
                  className="w-full p-[12.5px_11.99px_12.49px_11.99px] rounded-[5.71px] bg-white border border-[#E9E9E9] focus:outline-none placeholder:text-[#ACACAC] placeholder:font-normal placeholder:font-noto placeholder:text-[14px]"
                  placeholder=""
                  value={emailInput}
                  onChange={handleEmailChange}
                  style={{ ...responsiveMetric(311, 46) }}
                />
                {/* 121222 */}
                <div className="flex p-[2px_0] justify-center items-center rounded-[8px] bg-[#E9EEF1]" style={{ width: vw(311) }}>
                  {/* 1212221 */}
                  <button
                    className={`flex flex-col items-center p-[4.5px_0_11.5px_0] rounded-[8px] transition-all duration-200 ${isEmailButtonDisabled() || emailVerifying
                      ? 'opacity-50 cursor-not-allowed'
                      : 'bg-green-500 text-white'
                      }`}
                    style={{ width: vw(316) }}
                    onClick={handleEmailVerification}
                    disabled={isEmailButtonDisabled() || emailVerifying}
                  >
                    <span className={
                      isEmailButtonDisabled() || emailVerifying
                        ? 'text-[#969696]'
                        : 'text-white'
                    } style={{ ...responsiveText(12, 20.4, null, 'normal', 'noto') }}>メールアドレス変更にはメール認証が必要です</span>
                    <span className={
                      isEmailButtonDisabled() || emailVerifying
                        ? 'text-[#969696]'
                        : 'text-white'
                    } style={{ ...responsiveText(18, 21, null, 'black', 'noto') }}>
                      {emailVerifying ? '確認中...' : '認証コードを送る'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Email Verification Input (Mobile) */}
              {showVerificationInput && (
                <div className="flex flex-col gap-[8px] w-full">
                  <span className="text-center" style={{ ...responsiveText(16, 24, null, 'normal', 'noto', '#363636') }}>認証コードを入力してください</span>
                  <div className="flex flex-row gap-[8px] justify-center items-center relative">
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                      <React.Fragment key={index}>
                        <input
                          type="text"
                          maxLength="1"
                          placeholder=""
                          value={verificationCode[index] || ''}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '');
                            if (value) {
                              const newCode = verificationCode.split('');
                              newCode[index] = value;
                              const updatedCode = newCode.join('');
                              setVerificationCode(updatedCode);
                              
                              // Move to next input if not the last one
                              if (index < 5) {
                                const nextInput = e.target.parentNode.children[index + 1];
                                if (nextInput) nextInput.focus();
                              }
                            }
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
                              const newCode = verificationCode.split('');
                              newCode[index - 1] = '';
                              setVerificationCode(newCode.join(''));
                              const prevInput = e.target.parentNode.children[index - 1];
                              if (prevInput) prevInput.focus();
                            }
                          }}
                          className="text-center rounded-[5.71px] bg-gray-200 border border-[#E9E9E9] focus:outline-none focus:border-blue-500"
                          style={{ ...responsiveMetric(36, 48) }}
                          disabled={codeVerifying}
                        />
                        {index === 2 && (
                          <div className="border-b border-gray-200" style={{ width: vw(24) }}></div>
                        )}
                        {index === 5 && verificationSuccess && (
                          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 flex items-center justify-center w-6 h-6 bg-green-500 rounded-full">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                  {codeVerifying && (
                    <div className="flex items-center gap-[8px] justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                      <span style={{ ...responsiveText(14, 21, null, 'normal', 'noto', '#363636') }}>認証中...</span>
                    </div>
                  )}
                </div>
              )}
            </div>
            {/* 1213 */}
            <div className="flex flex-col items-start gap-[4px] w-full">
              {/* 12131 */}
              <div className="flex items-center gap-[12px] p-[12px_0_6px_0] self-stretch">
                <span style={{ ...responsiveText(14, 14, null, 'bold', 'noto', '#363636') }}>メール通知設定</span>
              </div>
              {/* 12132 */}
              <div className="flex flex-col items-start gap-[8px] self-stretch w-full">
                {[
                  '商品が購入されたら通知を受け取る',
                  '販売終了した商品の再販リクエスト',
                  'ユーザーからのフォロー',
                  'フォロー中のショップの新規出品',
                  'メディパンネップリからのお知らせ'
                ].map((text, idx) => (
                  <div key={idx} className="flex flex-col p-[14px_0] gap-[10px] self-stretch border-b border-[#E9E9E9]" style={{ width: vw(311) }}>
                    <div className="flex justify-between items-center self-stretch">
                      <div className="flex items-center flex-1" style={{ paddingRight: vw(25), paddingTop: vw(8) }}>
                        <span className="whitespace-nowrap" style={{ ...responsiveText(13, 24, null, 'normal', 'noto', '#363636') }}>{text}</span>
                      </div>
                      <div className="flex items-center" style={{ height: vw(32), paddingRight: vw(16) }}>
                        <button
                          onClick={() => handleToggle(text)}
                          className="rounded-full flex items-center transition-all duration-200 ease-in-out"
                          style={{
                            ...responsiveMetric(62, 32),
                            backgroundColor: userData.notificationSettings[text] ? '#AB31D3' : '#E9E9E9'
                          }}
                        >
                          <div
                            className="rounded-full bg-white transition-all duration-200 ease-in-out"
                            style={{
                              ...responsiveMetric(28, 28),
                              marginLeft: userData.notificationSettings[text] ? vw(2) : vw(32)
                            }}
                          ></div>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* 1234: 保存する button */}
          <button
            className="flex p-[2px] justify-center items-center rounded-[8px] bg-[#E9EEF1]"
            style={{ ...responsiveMetric(240, 48), marginTop: vw(24) }}
            onClick={handleSaveClick}
            disabled={saving}
          >
            <span style={{ ...responsiveText(18, 21, null, 'black', 'noto', '#969696') }}>
              {saving ? '保存中...' : '保存する'}
            </span>
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AccountSetting;