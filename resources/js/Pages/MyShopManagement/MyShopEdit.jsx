
import React, { useEffect, useState, useRef } from 'react';
import { usePage, router } from '@inertiajs/react';
import Header from '@/Components/header/header';
import Footer from '@/Components/footer/footer';
import ShopSidebar from '@/Components/ShopSidebar';
import ShopMobileTopBlock from '@/Components/ShopMobileTopBlocks';
import '@/../../resources/css/shopmanagement.css';
import photo1 from '@/assets/images/shopedit/photo1.png';
import default_user from '@/assets/images/default-user.png';
import circle_plus from '@/assets/images/shopedit/circle_plus.svg';
import {vwd, vw, responsiveTextD, responsiveMetricD, responsiveText, responsiveMetric, responsivePosition, responsivePositionD} from '@/lib/utils';

const MyShopEdit = () => {
    const { shopData, flash } = usePage().props;
    
    // Show success message if it exists in flash
    useEffect(() => {
        if (flash?.success) {
            setShowSuccessMessage(true);
            setTimeout(() => setShowSuccessMessage(false), 3000);
        }
    }, [flash?.success]);
    
    const [formData, setFormData] = useState({
        shop_title: shopData?.shop_title || '',
        shop_description: shopData?.shop_description || '',
        xlink: shopData?.xlink || '',
        instagram: shopData?.instagram || '',
        youtube: shopData?.youtube || '',
    });
    
    const [userImage, setUserImage] = useState(shopData?.image || default_user);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);
    const fileInputRef = useRef(null);
    
    // Check if form has changes
    useEffect(() => {
        const originalData = {
            shop_title: shopData?.shop_title || '',
            shop_description: shopData?.shop_description || '',
            xlink: shopData?.xlink || '',
            instagram: shopData?.instagram || '',
            youtube: shopData?.youtube || '',
        };
        
        const hasFormChanges = Object.keys(formData).some(key => {
            if (key === 'image') return false; // Skip image comparison for now
            return formData[key] !== originalData[key];
        });
        
        setHasChanges(hasFormChanges);
    }, [formData, shopData]);
    
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Check file size (2MB limit)
            if (file.size > 2 * 1024 * 1024) {
                alert('ファイルサイズは2MB以下にしてください。');
                return;
            }
            
            // Check file type
            if (!file.type.startsWith('image/')) {
                alert('画像ファイルを選択してください。');
                return;
            }
            
            // Create preview
            const reader = new FileReader();
            reader.onload = (e) => {
                setUserImage(e.target.result);
            };
            reader.readAsDataURL(file);
            
            // Update formData with the file
            setFormData(prev => ({
                ...prev,
                image: file
            }));
            
            // Set hasChanges to true when image is uploaded
            setHasChanges(true);
        }
    };
    
    const handleImageClick = () => {
        fileInputRef.current?.click();
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setShowConfirmModal(true);
    };
    
    const confirmSubmit = () => {
        setShowConfirmModal(false);
        
        // Create FormData for file upload
        const submitData = new FormData();
        Object.keys(formData).forEach(key => {
            if (formData[key] !== null && formData[key] !== undefined) {
                submitData.append(key, formData[key]);
            }
        });
        
        router.post('/myshop/update', submitData, {
            onSuccess: () => {
                setShowSuccessMessage(true);
                setTimeout(() => setShowSuccessMessage(false), 3000);
                setHasChanges(false); // Reset changes state after successful submission
            }
        });
    };
    
    const cancelSubmit = () => {
        setShowConfirmModal(false);
    };
 
    return (
        <>
        <Header/>
        <div className="shopmanagement-root flex flex-col w-full overflow-x-hidden md:flex-row">
            {/* Sidebar Section */}
            <div className="hidden md:block">
                <ShopSidebar/>
            </div>
            <ShopMobileTopBlock/>
            
            {/* Desktop Main Section */}
            <main className="hidden md:flex justify-center items-start flex-1 self-stretch" style={{gap: vwd(22), padding: vwd(32), paddingBottom: vwd(80), paddingTop: vwd(130)}}>
                {/* Frame 1 */}
                <div className="flex flex-col items-center" style={{ width: vwd(874), gap: vwd(16) }}>
                    {/* Frame 11 */}
                    <div className="flex flex-col items-start w-full" style={{ gap: vwd(8) }}>
                        <span style={{ ...responsiveTextD(36, 54, null, 'bold', 'noto', "#363636") }}>ショップ情報編集</span>
                    </div>
                    {/* Frame 12 */}
                    <div className="flex flex-col items-center w-full bg-white shadow-[0_4px_36px_0_rgba(0,0,0,0.10)]" style={{ width: vwd(874), padding: vwd(32), paddingLeft: vwd(36), paddingRight: vwd(36), gap: vwd(10) }}>
                        {/* Inner frame 21 */}
                        <div className="flex flex-col items-start w-full" style={{gap: vwd(22) }}>
                            {/* Frame 211 */}
                            <div className="flex flex-col items-start w-full" style={{gap: vwd(4) }}>
                                {/* Text and frame 2111 */}
                                <div className="flex flex-row items-end self-stretch" style={{ gap: vwd(12), paddingTop: vwd(25), paddingBottom: vwd(6) }}>
                                    <span style={{ ...responsiveTextD(21, 27, null, 'bold', 'noto', '#363636') }}>
                                        ユーザー画像
                                    </span>
                                    <span style={{ ...responsiveTextD(16, 24, null, 'normal', 'noto', '#ACACAC') }}>
                                        (2MBまで)
                                    </span>
                                </div>
                                {/* Frame 2111 */}
                                <div 
                                    className="relative flex flex-col justify-center items-center cursor-pointer hover:opacity-80 transition-opacity" 
                                    style={{ ...responsiveMetricD(194, 194) }}
                                    onClick={handleImageClick}
                                >
                                    <img
                                        src={userImage}
                                        alt="User photo"
                                        className="object-cover rounded-[120px] opacity-100"
                                        style={{ ...responsiveMetricD(194, 194) }}
                                    />
                                    <div className="flex justify-center items-center absolute opacity-100" style={{ ...responsiveMetricD(48, 48), ...responsivePositionD(73, 73, 'left', 'top') }}>
                                        <img src={circle_plus} alt="Add" className="w-full h-full" />
                                    </div>
                                </div>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImageUpload}
                                    accept="image/*"
                                    className="hidden"
                                />
                            </div>
                            
                            {/* Frame 212 */}
                            <div className="flex flex-col items-start w-full" style={{gap: vwd(4) }}>
                                {/* Frame 2121 */}
                                <div className="flex flex-row items-center" style={{ gap: vwd(12), paddingTop: vwd(25), paddingBottom: vwd(6) }}>
                                    <span style={{ ...responsiveTextD(21, 27, null, 'bold', 'noto', '#363636') }}>
                                        ショップのタイトル
                                    </span>
                                    <span style={{ ...responsiveTextD(16, 24, null, 'normal', 'noto', '#ACACAC') }}>
                                        (20文字まで)
                                    </span>
                                </div>
                                {/* Frame 2122 */}
                                <div className="flex flex-col items-start self-stretch" style={{ paddingBottom: vwd(8) }}>
                                    <input
                                        type="text"
                                        placeholder="私のめちゃプリショップ"
                                        value={formData.shop_title}
                                        onChange={(e) => setFormData({...formData, shop_title: e.target.value})}
                                        className="rounded-[5.71px] bg-white border border-[#E9E9E9] focus:outline-none placeholder:text-[#ACACAC] placeholder:font-normal placeholder:font-noto"
                                        style={{ ...responsiveMetricD(802, 45.99), ...responsiveTextD(16, 24, null, 'normal', 'noto', '#222'), padding: vwd(12.5), paddingLeft: vwd(11.99), paddingRight: vwd(11.99), paddingBottom: vwd(12.49) }}
                                    />
                                </div>
                            </div>
                            
                            {/* Frame 213 */}
                            <div className="flex flex-col items-start w-full" style={{ width: vwd(802), gap: vwd(4) }}>
                                {/* Frame 2131 */}
                                <div className="flex items-center self-stretch" style={{ gap: vwd(12), paddingTop: vwd(25), paddingBottom: vwd(6) }}>
                                    <span style={{ ...responsiveTextD(21, 27, null, 'bold', 'noto', '#363636') }}>
                                        ショップの紹介文
                                    </span>
                                    <span style={{ ...responsiveTextD(16, 24, null, 'normal', 'noto', '#ACACAC') }}>
                                        (100文字まで)
                                    </span>
                                </div>
                                {/* Frame 2132 */}
                                <div className="flex flex-col items-start self-stretch" style={{ paddingBottom: vwd(8) }}>
                                    <textarea
                                        placeholder="入力するとQRコードに表示されてわかりやすくなります"
                                        value={formData.shop_description}
                                        onChange={(e) => setFormData({...formData, shop_description: e.target.value})}
                                        className="rounded-[5.71px] bg-white border border-[#E9E9E9] focus:outline-none placeholder:text-[#ACACAC] placeholder:font-normal placeholder:font-noto resize-none"
                                        style={{ ...responsiveMetricD(802, 186), ...responsiveTextD(16, 24, null, 'normal', 'noto', '#222'), padding: vwd(12.5), paddingLeft: vwd(11.99), paddingRight: vwd(11.99), paddingBottom: vwd(12.49) }}
                                    />
                                </div>
                            </div>
                            
                            {/* Frame 214 */}
                            <div className="flex flex-col items-start w-full" style={{ width: vwd(802), height: vwd(115.99), gap: vwd(4) }}>
                                {/* Frame 2141 */}
                                <div className="flex items-center self-stretch" style={{ gap: vwd(12), padding: vwd(25), paddingTop: vwd(25), paddingBottom: vwd(6) }}>
                                    <span style={{ ...responsiveTextD(21, 27, null, 'bold', 'noto', '#363636') }}>
                                        X(旧Twitter)
                                    </span>
                                </div>
                                {/* Frame 2142 */}
                                <div className="flex items-center self-stretch" style={{ width: vwd(802), gap: vwd(12), paddingBottom: vwd(8) }}>
                                    <span style={{ ...responsiveTextD(14, 14, null, 'normal', 'noto', '#ACACAC') }}>
                                        @https://x.com/
                                    </span>
                                    {/* Frame 21423 */}
                                    <div className="flex flex-col items-start flex-1 w-full" style={{ height: vwd(45.99) }}>
                                        <input
                                            type="text"
                                            placeholder="mechapri"
                                            value={formData.xlink}
                                            onChange={(e) => setFormData({...formData, xlink: e.target.value})}
                                            className="w-full h-full rounded-[5.71px] bg-white border border-[#E9E9E9] focus:outline-none placeholder:text-[#ACACAC] placeholder:font-normal placeholder:font-noto"
                                            style={{ ...responsiveTextD(14, 14, null, 'normal', 'noto', '#222'), padding: vwd(12.5), paddingLeft: vwd(11.99), paddingRight: vwd(11.99), paddingBottom: vwd(12.49) }}
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            {/* Frame 215 */}
                            <div className="flex flex-col items-start w-full" style={{ width: vwd(802), height: vwd(115.99), gap: vwd(4) }}>
                                {/* Frame 2151 */}
                                <div className="flex items-center self-stretch" style={{ gap: vwd(12), padding: vwd(25), paddingTop: vwd(25), paddingBottom: vwd(6) }}>
                                    <span style={{ ...responsiveTextD(21, 27, null, 'bold', 'noto', '#363636') }}>
                                        Instagram
                                    </span>
                                </div>
                                {/* Frame 2152 */}
                                <div className="flex items-center self-stretch" style={{ width: vwd(802), gap: vwd(12), paddingBottom: vwd(8) }}>
                                    <span style={{ ...responsiveTextD(14, 14, null, 'normal', 'noto', '#ACACAC') }}>
                                        @https://instagram.com/
                                    </span>
                                    {/* Frame 21523 */}
                                    <div className="flex flex-col items-start flex-1 w-full" style={{ height: vwd(45.99) }}>
                                        <input
                                            type="text"
                                            placeholder="mechapri"
                                            value={formData.instagram}
                                            onChange={(e) => setFormData({...formData, instagram: e.target.value})}
                                            className="w-full h-full rounded-[5.71px] bg-white border border-[#E9E9E9] focus:outline-none placeholder:text-[#ACACAC] placeholder:font-normal placeholder:font-noto"
                                            style={{ ...responsiveTextD(14, 14, null, 'normal', 'noto', '#222'), padding: vwd(12.5), paddingLeft: vwd(11.99), paddingRight: vwd(11.99), paddingBottom: vwd(12.49) }}
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            {/* Frame 216 */}
                            <div className="flex flex-col items-start w-full" style={{ width: vwd(802), height: vwd(115.99), gap: vwd(4) }}>
                                {/* Frame 2161 */}
                                <div className="flex items-center self-stretch" style={{ gap: vwd(12), padding: vwd(25), paddingTop: vwd(25), paddingBottom: vwd(6) }}>
                                    <span style={{ ...responsiveTextD(21, 27, null, 'bold', 'noto', '#363636') }}>
                                        YouTube
                                    </span>
                                </div>
                                {/* Frame 2162 */}
                                <div className="flex items-center self-stretch" style={{ width: vwd(802), gap: vwd(12), paddingBottom: vwd(8) }}>
                                    <span style={{ ...responsiveTextD(14, 14, null, 'normal', 'noto', '#ACACAC') }}>
                                        @https://youtube.com/
                                    </span>
                                    {/* Frame 21623 */}
                                    <div className="flex flex-col items-start flex-1 w-full" style={{ height: vwd(45.99) }}>
                                        <input
                                            type="text"
                                            placeholder="mechapri"
                                            value={formData.youtube}
                                            onChange={(e) => setFormData({...formData, youtube: e.target.value})}
                                            className="w-full h-full rounded-[5.71px] bg-white border border-[#E9E9E9] focus:outline-none placeholder:text-[#ACACAC] placeholder:font-normal placeholder:font-noto"
                                            style={{ ...responsiveTextD(14, 14, null, 'normal', 'noto', '#222'), padding: vwd(12.5), paddingLeft: vwd(11.99), paddingRight: vwd(11.99), paddingBottom: vwd(12.49) }}
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            {/* Frame 217 */}
                            <div className="w-full">
                                <div className={`flex w-full justify-center items-center rounded-[8px] ${hasChanges ? 'bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3]' : 'bg-[#E9EEF1]'}`} style={{ width: vwd(802), height: vwd(60), padding: vwd(2) }}>
                                    <button 
                                        onClick={hasChanges ? handleSubmit : undefined}
                                        disabled={!hasChanges}
                                        className={`w-full h-full text-center transition-colors ${hasChanges ? 'cursor-pointer hover:opacity-90 text-white' : 'cursor-not-allowed text-[#969696] opacity-60'}`}
                                        style={{ ...responsiveTextD(18, 21, null, 'black', 'noto') }}
                                    >
                                        保存する
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Mobile Main Section */}
            <main className="inline-flex md:hidden flex-col items-start" style={{width: vw(343), paddingTop: vw(24), paddingBottom: vw(80), marginRight: vw(16), marginLeft: vw(16), gap: vw(16)}}>
                {/* First element: text ショップ情報編集 */}
                <h1 className="text-left w-full" style={{...responsiveText(24, 24, null, 'bold', 'noto', '#363636')}}>
                    ショップ情報編集
                </h1>
                
                {/* Second elements frame (frame 2) */}
                <div className="flex flex-col items-center self-stretch rounded-[10px] bg-white shadow-[0px_4px_36px_0px_rgba(0,0,0,0.10)]" style={{ width: vw(343), gap: vw(16), paddingTop: vw(20), paddingBottom: vw(20), paddingLeft: vw(16), paddingRight: vw(16) }}>
                    {/* Inner frame 21 */}
                    <div className="flex flex-col items-center w-full" style={{ gap: vw(16) }}>
                        {/* Frame 211 */}
                        <div className="flex flex-col items-start w-full" style={{ gap: vw(4) }}>
                            {/* Text and frame 2111 */}
                            <div className="flex flex-row items-end self-stretch" style={{ gap: vw(12) }}>
                                <span style={{ ...responsiveText(14, 14, null, 'bold', 'noto', '#363636') }}>
                                ユーザー画像
                              </span>
                                <span style={{ ...responsiveText(14, 21, 0.7, 'normal', 'noto', '#ACACAC') }}>
                                (2MBまで)
                              </span>
                            </div>
                            {/* Frame 2111 */}
                            <div 
                                className="relative flex flex-col justify-center items-center cursor-pointer hover:opacity-80 transition-opacity" 
                                style={{ ...responsiveMetric(80, 80) }}
                                onClick={handleImageClick}
                            >
                              <img
                                src={userImage}
                                alt="User photo"
                                    className="object-cover rounded-full opacity-100"
                                    style={{ ...responsiveMetric(80, 80) }}
                                />
                                <div className="flex justify-center items-center absolute opacity-100" style={{ ...responsiveMetric(19.794, 19.794), ...responsivePosition(30.103, 30.103, 'right', 'bottom') }}>
                                <img src={circle_plus} alt="Add" className="w-full h-full" />
                              </div>
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageUpload}
                                accept="image/*"
                                className="hidden"
                            />
                          </div>
                        
                        {/* Frame 212 */}
                        <div className="flex flex-col items-start w-full" style={{ gap: vw(4) }}>
                            {/* Frame 2121 */}
                            <div className="flex items-center self-stretch" style={{ gap: vw(12), paddingTop: vw(12), paddingBottom: vw(6) }}>
                                <span style={{ ...responsiveText(14, 14, null, 'bold', 'noto', '#363636') }}>
                                    ショップのタイトル
                                </span>
                                <span style={{ ...responsiveText(14, 21, 0.7, 'normal', 'noto', '#ACACAC') }}>
                                    (20文字まで)
                                </span>
                            </div>
                            {/* Frame 2122 */}
                            <div className="flex flex-col items-start w-full" style={{ paddingBottom: vw(8) }}>
                                <input
                                    type="text"
                                    placeholder="私のめちゃプリショップ"
                                    value={formData.shop_title}
                                    onChange={(e) => setFormData({...formData, shop_title: e.target.value})}
                                    className="w-full rounded-[5.71px] bg-white border border-[#E9E9E9] focus:outline-none placeholder:text-[#ACACAC] placeholder:font-normal placeholder:font-noto placeholder:text-[14px]"
                                    style={{ ...responsiveMetric(311, 46), ...responsiveText(14, 14, null, 'normal', 'noto', '#ACACAC'), padding: vw(12.5), paddingLeft: vw(11.99), paddingRight: vw(11.99), paddingBottom: vw(12.49) }}
                                />
                            </div>
                        </div>
                        
                        {/* Frame 213 */}
                        <div className="flex flex-col items-start w-full" style={{ gap: vw(4) }}>
                            {/* Frame 2131 */}
                            <div className="flex items-center self-stretch" style={{ gap: vw(12), paddingTop: vw(12), paddingBottom: vw(6) }}>
                                <span style={{ ...responsiveText(14, 14, null, 'bold', 'noto', '#363636') }}>
                                    ショップの紹介文
                                </span>
                                <span style={{ ...responsiveText(14, 21, 0.7, 'normal', 'noto', '#ACACAC') }}>
                                    (100文字まで)
                                </span>
                            </div>
                            {/* Frame 2132 */}
                            <div className="flex flex-col items-start w-full" style={{ paddingBottom: vw(8) }}>
                                <textarea
                                    placeholder="入力するとQRコードに表示されてわかりやすくなります"
                                    value={formData.shop_description}
                                    onChange={(e) => setFormData({...formData, shop_description: e.target.value})}
                                    className="w-full rounded-[5.71px] bg-white border border-[#E9E9E9] focus:outline-none placeholder:text-[#ACACAC] placeholder:font-normal placeholder:font-noto placeholder:text-[14px] resize-none"
                                    style={{ ...responsiveMetric(311, 128), ...responsiveText(14, 14, null, 'normal', 'noto', '#ACACAC'), lineHeight: vw(25.664), padding: vw(12.5), paddingLeft: vw(11.99), paddingRight: vw(11.99), paddingBottom: vw(12.49) }}
                                />
                            </div>
                        </div>
                        
                        {/* Frame 214 */}
                        <div className="flex flex-col items-start w-full" style={{ gap: vw(4) }}>
                            {/* Frame 2141 */}
                            <div className="flex items-center self-stretch" style={{ gap: vw(12), paddingTop: vw(12), paddingBottom: vw(6) }}>
                                <span style={{ ...responsiveText(14, 14, null, 'bold', 'noto', '#363636') }}>
                                    X(旧Twitter)
                                </span>
                            </div>
                            {/* Frame 2142 */}
                            <div className="flex items-center w-full" style={{ width: vw(311), gap: vw(12), paddingBottom: vw(8) }}>
                                <span style={{ ...responsiveText(14, 14, null, 'normal', 'noto', '#ACACAC') }}>
                                    @https://x.com/
                                </span>
                                {/* Frame 21423 */}
                                <div className="flex flex-col items-start flex-1 w-full">
                                    <input
                                        type="text"
                                        placeholder="mechapri"
                                        value={formData.xlink}
                                        onChange={(e) => setFormData({...formData, xlink: e.target.value})}
                                        className="w-full h-full rounded-[5.71px] bg-white border border-[#E9E9E9] focus:outline-none placeholder:text-[#ACACAC] placeholder:font-normal placeholder:font-noto placeholder:text-[14px]"
                                        style={{ ...responsiveMetric(null, 46), ...responsiveText(14, 14, null, 'normal', 'noto', '#ACACAC'), padding: vw(12.5), paddingLeft: vw(11.99), paddingRight: vw(11.99), paddingBottom: vw(12.49) }}
                                    />
                                </div>
                            </div>
                        </div>
                        
                        {/* Frame 215 */}
                        <div className="flex flex-col items-start w-full" style={{ gap: vw(4) }}>
                            {/* Frame 2151 */}
                            <div className="flex items-center self-stretch" style={{ gap: vw(12), paddingTop: vw(12), paddingBottom: vw(6) }}>
                                <span style={{ ...responsiveText(14, 14, null, 'bold', 'noto', '#363636') }}>
                                    Instagram
                                </span>
                            </div>
                            {/* Frame 2152 */}
                            <div className="flex items-center w-full" style={{ width: vw(311), gap: vw(12), paddingBottom: vw(8) }}>
                                <span style={{ ...responsiveText(14, 14, null, 'normal', 'noto', '#ACACAC') }}>
                                    @https://instagram.com/
                                </span>
                                {/* Frame 21523 */}
                                <div className="flex flex-col items-start flex-1 w-full">
                                    <input
                                        type="text"
                                        placeholder="mechapri"
                                        value={formData.instagram}
                                        onChange={(e) => setFormData({...formData, instagram: e.target.value})}
                                        className="w-full h-full rounded-[5.71px] bg-white border border-[#E9E9E9] focus:outline-none placeholder:text-[#ACACAC] placeholder:font-normal placeholder:font-noto placeholder:text-[14px]"
                                        style={{ ...responsiveMetric(null, 46), ...responsiveText(14, 14, null, 'normal', 'noto', '#ACACAC'), padding: vw(12.5), paddingLeft: vw(11.99), paddingRight: vw(11.99), paddingBottom: vw(12.49) }}
                                    />
                                </div>
                            </div>
                        </div>
                        
                        {/* Frame 216 */}
                        <div className="flex flex-col items-start w-full" style={{ gap: vw(4) }}>
                            {/* Frame 2161 */}
                            <div className="flex items-center self-stretch" style={{ gap: vw(12), paddingTop: vw(12), paddingBottom: vw(6) }}>
                                <span style={{ ...responsiveText(14, 14, null, 'bold', 'noto', '#363636') }}>
                                    YouTube
                                </span>
                            </div>
                            {/* Frame 2162 */}
                            <div className="flex items-center w-full" style={{ width: vw(311), gap: vw(12), paddingBottom: vw(8) }}>
                                <span style={{ ...responsiveText(14, 14, null, 'normal', 'noto', '#ACACAC') }}>
                                    @https://youtube.com/
                                </span>
                                {/* Frame 21623 */}
                                <div className="flex flex-col items-start flex-1 w-full">
                                    <input
                                        type="text"
                                        placeholder="mechapri"
                                        value={formData.youtube}
                                        onChange={(e) => setFormData({...formData, youtube: e.target.value})}
                                        className="w-full h-full rounded-[5.71px] bg-white border border-[#E9E9E9] focus:outline-none placeholder:text-[#ACACAC] placeholder:font-normal placeholder:font-noto placeholder:text-[14px]"
                                        style={{ ...responsiveMetric(null, 46), ...responsiveText(14, 14, null, 'normal', 'noto', '#ACACAC'), padding: vw(12.5), paddingLeft: vw(11.99), paddingRight: vw(11.99), paddingBottom: vw(12.49) }}
                                    />
                                </div>
                            </div>
                        </div>
                        
                        {/* Frame 217 */}
                        <div className="w-full" style={{ paddingLeft: vw(34), paddingRight: vw(34) }}>
                            <div className={`flex w-full justify-center items-center rounded-[8px] ${hasChanges ? 'bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3]' : 'bg-[#E9EEF1]'}`} style={{ width: vw(240), height: vw(48), padding: vw(2) }}>
                                <button 
                                    onClick={hasChanges ? handleSubmit : undefined}
                                    disabled={!hasChanges}
                                    className={`w-full h-full text-center transition-colors ${hasChanges ? 'cursor-pointer hover:opacity-90 text-white' : 'cursor-not-allowed text-[#969696] opacity-60'}`}
                                    style={{ ...responsiveText(18, 18, null, 'black', 'noto') }}
                                >
                              保存する
                            </button>
                          </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
        
        {/* Confirmation Modal */}
        {showConfirmModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                    <h3 className="text-lg font-bold mb-4">確認</h3>
                    <p className="text-gray-600 mb-6">ショップ情報を保存しますか？</p>
                    <div className="flex justify-end space-x-4">
                        <button
                            onClick={cancelSubmit}
                            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                        >
                            キャンセル
                        </button>
                        <button
                            onClick={confirmSubmit}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                        >
                            保存する
                        </button>
                    </div>
                </div>
            </div>
        )}
        
        {/* Success Message */}
        {showSuccessMessage && (
            <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
                <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    ショップ情報が更新されました
                </div>
            </div>
        )}
        
        <Footer/>
        </>
    );
};

export default MyShopEdit;