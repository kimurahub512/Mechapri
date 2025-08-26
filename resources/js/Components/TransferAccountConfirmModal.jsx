import React from 'react';

import photo1 from '@/assets/images/shopcontents/photo1.jpg';
import qr from '@/assets/images/productdetails/qr.jpg';
import girl from '@/assets/images/favoriteproducts/girl.svg';
import shop1 from '@/assets/images/productdetails/printshop.svg';
import shop2 from '@/assets/images/productdetails/lawson.svg';
import shop3 from '@/assets/images/productdetails/ministop.svg';
import eleven from '@/assets/images/productdetails/eleven.png';
import question_circle from '@/assets/images/question_circle.svg';
import face from '@/assets/images/face_blue.svg';
import line from '@/assets/images/line_green.svg';
import x from '@/assets/images/x_black.svg';
import instagram from '@/assets/images/instagram_black.svg';
import close from '@/assets/images/close_gray.svg';

const TransferAccountConfirmModal = ({ isOpen, onClose, formData, onConfirm, isSubmitting = false, submitStatus = null }) => {

    if (!isOpen) return null;

    const handleConfirm = () => {
        if (onConfirm && !isSubmitting) {
            onConfirm();
        }
    };

    const handleCancel = () => {
        if (!isSubmitting) {
            onClose();
        }
    };

    return (
        <>
            {/* Desktop version */}
            <section className="hidden md:flex flex-col items-center w-[960px] h-fit rounded-[40px] pb-[60px] bg-white shadow-[0_4px_36px_0_rgba(0,0,0,0.10)] gap-[32px] relative ">
                {/* Header Section */}
                <div className="flex h-[98px] p-[20px_0_1px_0] flex-col items-center flex-shrink-0 border-b border-[#D1D1D1] bg-white rounded-t-[40px] w-full">
                    <h1 className="text-[#363636] text-center font-noto text-[36px] font-bold leading-[54px]">登録内容の確認</h1>
                </div>
                <img src={close} alt="close" className="absolute top-[34px] right-[32px] w-[40px] h-[40px] cursor-pointer" onClick={handleCancel} />

                <span className="text-[#363636] font-noto text-[21px] font-bold leading-[27px]">こちらの振込先で登録してよろしいですか？</span>
                <div className="flex flex-col items-start gap-[4px] w-[271px]">
                    <div className="flex flex-row items-center gap-[21px]">
                        <span className="text-[#000] text-left font-noto text-[18px] font-normal leading-[24px] w-[160px]">銀行:</span>
                        <span className="text-[#000] text-left font-noto text-[18px] font-normal leading-[24px] whitespace-nowrap">{formData?.bank_name || '未入力'}</span>
                    </div>
                    <div className="flex flex-row items-center gap-[21px]">
                        <span className="text-[#000] text-left font-noto text-[18px] font-normal leading-[24px] w-[160px]">口座種別：</span>
                        <span className="text-[#000] text-left font-noto text-[18px] font-normal leading-[24px]">{formData?.account_type || '未選択'}</span>
                    </div>
                    <div className="flex flex-row items-center gap-[21px]">
                        <span className="text-[#000] text-left font-noto text-[18px] font-normal leading-[24px] w-[160px] whitespace-nowrap">支店コード：</span>
                        <span className="text-[#000] text-left font-noto text-[18px] font-normal leading-[24px]">{formData?.branch_code || '未入力'}</span>
                    </div>
                    <div className="flex flex-row items-center gap-[21px]">
                        <span className="text-[#000] text-left font-noto text-[18px] font-normal leading-[24px] w-[160px] whitespace-nowrap">口座番号：</span>
                        <span className="text-[#000] text-left font-noto text-[18px] font-normal leading-[24px]">{formData?.account_number || '未入力'}</span>
                    </div>
                    <div className="flex flex-row items-center gap-[21px]">
                        <span className="text-[#000] text-left font-noto text-[18px] font-normal leading-[24px] w-[160px] whitespace-nowrap">口座名義 (セイ) ：</span>
                        <span className="text-[#000] text-left font-noto text-[18px] font-normal leading-[24px]">{formData?.account_holder_sei || '未入力'}</span>
                    </div>
                    <div className="flex flex-row items-center gap-[21px]">
                        <span className="text-[#000] text-left font-noto text-[18px] font-normal leading-[24px] w-[160px] whitespace-nowrap">口座名義 (メイ) ：</span>
                        <span className="text-[#000] text-left font-noto text-[18px] font-normal leading-[24px]">{formData?.account_holder_mei || '未入力'}</span>
                    </div>
                </div>
                <div className="flex flex-row items-center gap-[16px]">
                    {submitStatus === 'success' ? (
                        <div className="flex items-center justify-center w-[240px] h-[48px] rounded-[6px] bg-green-500">
                            <span className="text-white font-noto text-[18px] font-bold leading-[21px]">登録完了！</span>
                        </div>
                    ) : (
                        <button 
                            className={`flex items-center justify-center w-[240px] h-[48px] rounded-[6px] ${
                                isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#FF2AA1] cursor-pointer hover:bg-[#E61E8F]'
                            } transition-colors`}
                            onClick={handleConfirm}
                            disabled={isSubmitting}
                        >
                            <span className="text-white font-noto text-[18px] font-bold leading-[21px]">
                                {isSubmitting ? '登録中...' : '登録する'}
                            </span>
                        </button>
                    )}
                    {submitStatus !== 'success' && (
                        <button 
                            className={`flex items-center justify-center w-[240px] h-[48px] rounded-[6px] border border-[#FF2AA1] ${
                                isSubmitting ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-[#FFF5F9]'
                            } transition-colors`}
                            onClick={handleCancel}
                            disabled={isSubmitting}
                        >
                            <span className="text-[#FF2AA1] font-noto text-[18px] font-bold leading-[21px]">修正</span>
                        </button>
                    )}
                </div>
            </section>
            {/* mobile version */}
            <section className="flex md:hidden items-center flex-col w-full h-fit rounded-[16px] bg-white shadow-[0_4px_36px_0_rgba(0,0,0,0.10)] pb-[101px] relative">

                {/* Header Section */}
                <div className="flex p-[20px_0_20px_0] flex-col items-center flex-shrink-0 border-b border-[#D1D1D1] bg-white rounded-t-[40px] w-full">
                    <h1 className="text-[#363636] text-center font-noto text-[24px] font-bold leading-[24px]">登録内容の確認</h1>
                </div>
                <img src={close} alt="close" className="absolute top-[16px] right-[12px] w-[22px] h-[22px] cursor-pointer" onClick={handleCancel} />

                <span className="text-center text-[#363636] font-noto text-[18px] font-bold leading-[27px] mt-[16px]">こちらの振込先で登録して<br/>よろしいですか？</span>
                <div className="flex flex-col items-start gap-[4px] w-[271px] mt-[24px]">
                    <div className="flex flex-row items-center gap-[21px]">
                        <span className="text-[#000] text-left font-noto text-[16px] font-normal leading-[24px] w-[160px]">銀行:</span>
                        <span className="text-[#000] text-left font-noto text-[16px] font-normal leading-[24px] whitespace-nowrap">{formData?.bank_name || '未入力'}</span>
                    </div>
                    <div className="flex flex-row items-center gap-[21px]">
                        <span className="text-[#000] text-left font-noto text-[16px] font-normal leading-[24px] w-[160px]">口座種別：</span>
                        <span className="text-[#000] text-left font-noto text-[16px] font-normal leading-[24px]">{formData?.account_type || '未選択'}</span>
                    </div>
                    <div className="flex flex-row items-center gap-[21px]">
                        <span className="text-[#000] text-left font-noto text-[16px] font-normal leading-[24px] w-[160px] whitespace-nowrap">支店コード：</span>
                        <span className="text-[#000] text-left font-noto text-[16px] font-normal leading-[24px]">{formData?.branch_code || '未入力'}</span>
                    </div>
                    <div className="flex flex-row items-center gap-[21px]">
                        <span className="text-[#000] text-left font-noto text-[16px] font-normal leading-[24px] w-[160px] whitespace-nowrap">口座番号：</span>
                        <span className="text-[#000] text-left font-noto text-[16px] font-normal leading-[24px]">{formData?.account_number || '未入力'}</span>
                    </div>
                    <div className="flex flex-row items-center gap-[21px]">
                        <span className="text-[#000] text-left font-noto text-[16px] font-normal leading-[24px] w-[160px] whitespace-nowrap">口座名義 (セイ) ：</span>
                        <span className="text-[#000] text-left font-noto text-[16px] font-normal leading-[24px]">{formData?.account_holder_sei || '未入力'}</span>
                    </div>
                    <div className="flex flex-row items-center gap-[21px]">
                        <span className="text-[#000] text-left font-noto text-[16px] font-normal leading-[24px] w-[160px] whitespace-nowrap">口座名義 (メイ) ：</span>
                        <span className="text-[#000] text-left font-noto text-[16px] font-normal leading-[24px]">{formData?.account_holder_mei || '未入力'}</span>
                    </div>
                </div>
                <div className="flex flex-row items-center gap-[16px] mt-[32px]">
                    {submitStatus === 'success' ? (
                        <div className="flex items-center justify-center w-[144px] h-[48px] rounded-[8px] bg-green-500">
                            <span className="text-white font-noto text-[16px] font-bold leading-[21px]">登録完了！</span>
                        </div>
                    ) : (
                        <button 
                            className={`flex items-center justify-center w-[144px] h-[48px] rounded-[8px] ${
                                isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#FF2AA1] cursor-pointer hover:bg-[#E61E8F]'
                            } transition-colors`}
                            onClick={handleConfirm}
                            disabled={isSubmitting}
                        >
                            <span className="text-white font-noto text-[16px] font-bold leading-[21px]">
                                {isSubmitting ? '登録中...' : '登録する'}
                            </span>
                        </button>
                    )}
                    {submitStatus !== 'success' && (
                        <button 
                            className={`flex items-center justify-center w-[144px] h-[48px] rounded-[8px] border border-[#FF2AA1] ${
                                isSubmitting ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-[#FFF5F9]'
                            } transition-colors`}
                            onClick={handleCancel}
                            disabled={isSubmitting}
                        >
                            <span className="text-[#FF2AA1] font-noto text-[16px] font-bold leading-[21px]">修正</span>
                        </button>
                    )}
                </div>
            </section>
        </>
    );
};

export default TransferAccountConfirmModal;