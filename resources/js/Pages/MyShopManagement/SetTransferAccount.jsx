import React, { useState, useEffect } from 'react';
import Header from '@/Components/header/header';
import Footer from '@/Components/footer/footer';
import ShopSidebar from '@/Components/ShopSidebar';
import ShopMobileTopBlock from '@/Components/ShopMobileTopBlocks';
import TransferAccountConfirmModal from '@/Components/TransferAccountConfirmModal';
import '@/../../resources/css/shopmanagement.css';
import radio from '@/assets/images/beginner_radio.svg';
import {vw, vwd, responsiveText, responsivePosition, responsiveMetric, responsiveTextD, responsivePositionD, responsiveMetricD} from '@/lib/utils';

const SetTransferAccount = ({ bankAccount = null }) => {
    const [showModal, setShowModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null
    const [hasChanges, setHasChanges] = useState(false);
    const [formData, setFormData] = useState({
        bank_name: bankAccount?.bank_name || '',
        account_type: bankAccount?.account_type || '普通',
        branch_code: bankAccount?.branch_code || '',
        account_number: bankAccount?.account_number || '',
        account_holder_sei: bankAccount?.account_holder_sei || '',
        account_holder_mei: bankAccount?.account_holder_mei || '',
    });

    // Check if form has changes
    useEffect(() => {
        const originalData = {
            bank_name: bankAccount?.bank_name || '',
            account_type: bankAccount?.account_type || '普通',
            branch_code: bankAccount?.branch_code || '',
            account_number: bankAccount?.account_number || '',
            account_holder_sei: bankAccount?.account_holder_sei || '',
            account_holder_mei: bankAccount?.account_holder_mei || '',
        };
        
        const hasFormChanges = Object.keys(formData).some(key => {
            return formData[key] !== originalData[key];
        });
        
        setHasChanges(hasFormChanges);
    }, [formData, bankAccount]);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = () => {
        // Show confirmation modal instead of submitting directly
        setShowModal(true);
    };

    const handleConfirm = async () => {
        setIsSubmitting(true);
        setSubmitStatus(null);
        
        try {
            const response = await fetch('/myshop/settransferaccount', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSubmitStatus('success');
                setHasChanges(false); // Reset changes state after successful submission
                // Close modal after a short delay to show success
                setTimeout(() => {
                    setShowModal(false);
                    setSubmitStatus(null);
                }, 1500);
            } else {
                setSubmitStatus('error');
                console.error('Failed to save bank account');
            }
        } catch (error) {
            setSubmitStatus('error');
            console.error('Error saving bank account:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Header />
            <div className="shopmanagement-root flex flex-col w-full overflow-x-hidden md:flex-row">
                {/* Sidebar Section */}
                <div className="hidden md:block">
                    <ShopSidebar />
                </div>
                <ShopMobileTopBlock />
                {/* Main Section */}
                {/* MOBILE ONLY */}
                <div className="block md:hidden px-[16px] pb-[80px] flex flex-col items-start gap-4">

                    {/* Title */}
                    <div className="flex flex-row items-center justify-between w-full">
                        <h1 className="text-[#363636] font-['Noto_Sans_JP'] text-[24px] font-bold leading-[24px]">振込先口座の指定</h1>
                    </div>
                    <div className="flex flex-col items-start py-[20px] px-[16px] gap-[10px] rounded-[16px] bg-white shadow-[0px_4px_36px_0px_rgba(0,0,0,0.10)] self-stretch">
                        <div className="flex flex-col items-start gap-[4px] w-full">
                            <span className="text-[#363636] font-['Noto_Sans_JP'] text-[14px] font-bold leading-[14px] mt-[12px] mb-[6px]">銀行</span>
                            <div className="flex flex-row justify-between items-center py-[14px] w-full border-b border-[#E9E9E9]">
                                <input 
                                    type="text" 
                                    value={formData.bank_name}
                                    onChange={(e) => handleInputChange('bank_name', e.target.value)}
                                    className="text-[#363636] font-['Noto_Sans_JP'] text-[13px] font-normal leading-[24px] bg-transparent border-none outline-none flex-1"
                                    placeholder="銀行名を入力"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col items-start gap-[4px] w-full">
                            <span className="text-[#363636] font-['Noto_Sans_JP'] text-[14px] font-bold leading-[14px] mt-[12px] mb-[6px]">口座種別</span>
                            <div className="flex flex-col items-start gap-[8px] w-full">
                                <div className="flex items-start">
                                    <input 
                                        type="radio" 
                                        name="account_type" 
                                        value="普通"
                                        checked={formData.account_type === '普通'}
                                        onChange={(e) => handleInputChange('account_type', e.target.value)}
                                        className="w-[20px] h-[20px] mr-[10px]"
                                    />
                                    <span className="text-[#363636] font-normal text-[14px] leading-[24px] font-['Noto Sans JP']">普通</span>
                                </div>
                                <div className="flex items-start flex-shrink-0">
                                    <input 
                                        type="radio" 
                                        name="account_type" 
                                        value="当座"
                                        checked={formData.account_type === '当座'}
                                        onChange={(e) => handleInputChange('account_type', e.target.value)}
                                        className="w-[20px] h-[20px] mr-[10px]"
                                    />
                                    <span className="text-[#363636] font-normal text-[14px] leading-[24px] font-['Noto Sans JP'] whitespace-nowrap">当座</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-start gap-[4px] w-full">
                            <span className="text-[#363636] font-['Noto_Sans_JP'] text-[14px] font-bold leading-[14px] mt-[12px] mb-[6px]">支店コード</span>
                            <input 
                                type="text" 
                                value={formData.branch_code}
                                onChange={(e) => handleInputChange('branch_code', e.target.value)}
                                className="w-full h-[46px] p-[12px] rounded-[5.71px] border-[#E9E9E9] bg-white shadow-[0px_0px_0px_1.143px_rgba(0,0,0,0.10) inset] placeholder-[#ACACAC] placeholder:font-noto placeholder:text-[14px] placeholder:font-normal placeholder:leading-normal" 
                                placeholder="支店コードを入力" 
                            />
                        </div>
                        <div className="flex flex-col items-start gap-[4px] w-full">
                            <span className="text-[#363636] font-['Noto_Sans_JP'] text-[14px] font-bold leading-[14px] mt-[12px] mb-[6px]">口座番号</span>
                            <input 
                                type="text" 
                                value={formData.account_number}
                                onChange={(e) => handleInputChange('account_number', e.target.value)}
                                className="w-full h-[46px] p-[12px] rounded-[5.71px] border-[#E9E9E9] bg-white shadow-[0px_0px_0px_1.143px_rgba(0,0,0,0.10) inset] placeholder-[#ACACAC] placeholder:font-noto placeholder:text-[14px] placeholder:font-normal placeholder:leading-normal" 
                                placeholder="口座番号を入力" 
                            />
                        </div>
                        <div className="flex flex-col items-start gap-[4px] w-full">
                            <span className="text-[#363636] font-['Noto_Sans_JP'] text-[14px] font-bold leading-[14px] mt-[12px] mb-[6px]">口座名義 (セイ)</span>
                            <input 
                                type="text" 
                                value={formData.account_holder_sei}
                                onChange={(e) => handleInputChange('account_holder_sei', e.target.value)}
                                className="w-full h-[46px] p-[12px] rounded-[5.71px] border-[#E9E9E9] bg-white shadow-[0px_0px_0px_1.143px_rgba(0,0,0,0.10) inset] placeholder-[#ACACAC] placeholder:font-noto placeholder:text-[14px] placeholder:font-normal placeholder:leading-normal" 
                                placeholder="姓を入力" 
                            />
                        </div>
                        <div className="flex flex-col items-start gap-[4px] w-full">
                            <span className="text-[#363636] font-['Noto_Sans_JP'] text-[14px] font-bold leading-[14px] mt-[12px] mb-[6px]">口座名義 (メイ)</span>
                            <input 
                                type="text" 
                                value={formData.account_holder_mei}
                                onChange={(e) => handleInputChange('account_holder_mei', e.target.value)}
                                className="w-full h-[46px] p-[12px] rounded-[5.71px] border-[#E9E9E9] bg-white shadow-[0px_0px_0px_1.143px_rgba(0,0,0,0.10) inset] placeholder-[#ACACAC] placeholder:font-noto placeholder:text-[14px] placeholder:font-normal placeholder:leading-normal" 
                                placeholder="名を入力" 
                            />
                        </div>
                        <div className="flex flex-col items-start gap-[4px] w-full">
                            <div className="flex items-start">
                                <span className="text-[#272B2B] font-['Noto_Sans_JP'] text-[12px] font-normal leading-[19px] mx-[8px]">•</span>
                                <span className="text-[#272B2B] font-['Noto_Sans_JP'] text-[12px] font-normal leading-[19px]">振込先が間違っている場合、再度振込手数料が発生します。</span>
                            </div>
                        </div>
                        <div className="flex flex-col items-center w-full">
                            <div className={`flex w-[240px] p-[17px] flex-col justify-center items-center rounded-[8px] shadow-[0px_4px_8px_0px_rgba(255, 42, 161, 0.20)] ${hasChanges ? 'bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3]' : 'bg-[#E9EEF1]'} ${hasChanges ? 'cursor-pointer' : 'cursor-not-allowed'}`} onClick={hasChanges ? handleSubmit : undefined}>
                                <span className={`text-center font-noto text-[18px] font-bold leading-[21px] ${hasChanges ? 'text-white' : 'text-[#969696] opacity-60'}`}>登録する</span>
                            </div>
                        </div>
                    </div>
                </div>
                <main
                    className="hidden md:flex flex-col items-left gap-[22px] max-w-[928px] py-[40px] px-[15px] w-full ml-[109px] mr-[169px] pt-[130px]"
                >
                    {/* Title */}
                    <div className="flex flex-row items-center justify-between w-full">
                        <h1 className="text-[#363636] font-['Noto_Sans_JP'] text-[36px] font-bold leading-[54px]">振込先口座の指定</h1>
                    </div>
                    <div className="flex flex-col items-start py-[32px] px-[36px] gap-[10px] rounded-[16px] bg-white shadow-[0px_4px_36px_0px_rgba(0,0,0,0.10)] self-stretch">
                        <div className="flex flex-col items-start gap-[22px] w-full">
                            <div className="flex flex-col items-start gap-[4px] w-full">
                                <span className="text-[#363636] font-['Noto_Sans_JP'] text-[21px] font-bold leading-[27px] mt-[25px] mb-[6px]">銀行</span>
                                <div className="flex flex-row justify-between items-center py-[14px] w-full border-b border-[#E9E9E9]">
                                    <input 
                                        type="text" 
                                        value={formData.bank_name}
                                        onChange={(e) => handleInputChange('bank_name', e.target.value)}
                                        className="text-[#363636] font-['Noto_Sans_JP'] text-[18px] font-normal leading-[24px] bg-transparent border-none outline-none flex-1"
                                        placeholder="銀行名を入力"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col items-start gap-[4px] w-full">
                                <span className="text-[#363636] font-['Noto_Sans_JP'] text-[21px] font-bold leading-[27px] mt-[25px] mb-[6px]">口座種別</span>
                                <div className="flex flex-col items-start gap-[8px] w-full">
                                    <div className="flex items-start">
                                        <input 
                                            type="radio" 
                                            name="account_type_desktop" 
                                            value="普通"
                                            checked={formData.account_type === '普通'}
                                            onChange={(e) => handleInputChange('account_type', e.target.value)}
                                            className="w-[20px] h-[20px] mr-[10px]"
                                        />
                                        <span className="text-[#363636] font-normal text-[18px] leading-[24px] font-['Noto Sans JP']">普通</span>
                                    </div>
                                    <div className="flex items-start flex-shrink-0">
                                        <input 
                                            type="radio" 
                                            name="account_type_desktop" 
                                            value="当座"
                                            checked={formData.account_type === '当座'}
                                            onChange={(e) => handleInputChange('account_type', e.target.value)}
                                            className="w-[20px] h-[20px] mr-[10px]"
                                        />
                                        <span className="text-[#363636] font-normal text-[18px] leading-[24px] font-['Noto Sans JP'] whitespace-nowrap">当座</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col items-start gap-[4px] w-full">
                                <span className="text-[#363636] font-['Noto_Sans_JP'] text-[21px] font-bold leading-[27px] mt-[25px] mb-[6px]">支店コード</span>
                                <input 
                                    type="text" 
                                    value={formData.branch_code}
                                    onChange={(e) => handleInputChange('branch_code', e.target.value)}
                                    className="w-full h-[46px] p-[12px] rounded-[5.71px] border-[#E9E9E9] bg-white shadow-[0px_0px_0px_1.143px_rgba(0,0,0,0.10) inset] placeholder-[#ACACAC] placeholder:font-noto placeholder:text-[14px] placeholder:font-normal placeholder:leading-normal" 
                                    placeholder="支店コードを入力" 
                                />
                            </div>
                            <div className="flex flex-col items-start gap-[4px] w-full">
                                <span className="text-[#363636] font-['Noto_Sans_JP'] text-[21px] font-bold leading-[27px] mt-[25px] mb-[6px]">口座番号</span>
                                <input 
                                    type="text" 
                                    value={formData.account_number}
                                    onChange={(e) => handleInputChange('account_number', e.target.value)}
                                    className="w-full h-[46px] p-[12px] rounded-[5.71px] border-[#E9E9E9] bg-white shadow-[0px_0px_0px_1.143px_rgba(0,0,0,0.10) inset] placeholder-[#ACACAC] placeholder:font-noto placeholder:text-[14px] placeholder:font-normal placeholder:leading-normal" 
                                    placeholder="口座番号を入力" 
                                />
                            </div>
                            <div className="flex flex-col items-start gap-[4px] w-full">
                                <span className="text-[#363636] font-['Noto_Sans_JP'] text-[21px] font-bold leading-[27px] mt-[25px] mb-[6px]">口座名義 (セイ)</span>
                                <input 
                                    type="text" 
                                    value={formData.account_holder_sei}
                                    onChange={(e) => handleInputChange('account_holder_sei', e.target.value)}
                                    className="w-full h-[46px] p-[12px] rounded-[5.71px] border-[#E9E9E9] bg-white shadow-[0px_0px_0px_1.143px_rgba(0,0,0,0.10) inset] placeholder-[#ACACAC] placeholder:font-noto placeholder:text-[14px] placeholder:font-normal placeholder:leading-normal" 
                                    placeholder="姓を入力" 
                                />
                            </div>
                            <div className="flex flex-col items-start gap-[4px] w-full">
                                <span className="text-[#363636] font-['Noto_Sans_JP'] text-[21px] font-bold leading-[27px] mt-[25px] mb-[6px]">口座名義 (メイ)</span>
                                <input 
                                    type="text" 
                                    value={formData.account_holder_mei}
                                    onChange={(e) => handleInputChange('account_holder_mei', e.target.value)}
                                    className="w-full h-[46px] p-[12px] rounded-[5.71px] border-[#E9E9E9] bg-white shadow-[0px_0px_0px_1.143px_rgba(0,0,0,0.10) inset] placeholder-[#ACACAC] placeholder:font-noto placeholder:text-[14px] placeholder:font-normal placeholder:leading-normal" 
                                    placeholder="名を入力" 
                                />
                            </div>
                            <div className="flex flex-col items-start gap-[4px] w-full">
                                <div className="flex items-start">
                                    <span className="text-[#272B2B] font-['Noto_Sans_JP'] text-[12px] font-normal leading-[19px] mx-[8px]">•</span>
                                    <span className="text-[#272B2B] font-['Noto_Sans_JP'] text-[12px] font-normal leading-[19px]">振込先が間違っている場合、再度振込手数料が発生します。</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-center w-full">
                                <div className={`flex w-full p-[17px] flex-col justify-center items-center rounded-[8px] shadow-[0px_4px_8px_0px_rgba(255, 42, 161, 0.20)] ${hasChanges ? 'bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3]' : 'bg-[#E9EEF1]'} ${hasChanges ? 'cursor-pointer' : 'cursor-not-allowed'}`} onClick={hasChanges ? handleSubmit : undefined}>
                                    <span className={`text-center font-noto text-[18px] font-bold leading-[21px] ${hasChanges ? 'text-white' : 'text-[#969696] opacity-60'}`}>登録する</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* Modal Overlay */}
            {showModal && (
                <div 
                    className="fixed top-[60px] md:top-[90px] left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-start z-[1000] pt-[60px] md:pt-[90px] pb-[40px] overflow-y-auto"
                    onClick={() => setShowModal(false)}
                >
                    <div onClick={(e) => e.stopPropagation()} className="flex justify-center px-[16px]" style={{width: vw(375)}}>
                        <TransferAccountConfirmModal 
                            isOpen={showModal} 
                            onClose={() => setShowModal(false)} 
                            formData={formData}
                            onConfirm={handleConfirm}
                            isSubmitting={isSubmitting}
                            submitStatus={submitStatus}
                        />
                    </div>
                </div>
            )}

            <Footer />
        </>
    );
};

export default SetTransferAccount;