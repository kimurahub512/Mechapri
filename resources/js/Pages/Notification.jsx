
import React, { useEffect, useState } from 'react';
import { usePage, router } from '@inertiajs/react';
import Header from '@/Components/header/header';
import Footer from '@/Components/footer/footer';
import '@/../../resources/css/shopmanagement.css';
import default_user from '@/assets/images/default-user.png';

const Notification = () => {
    const { notifications = [] } = usePage().props;
    const [localNotifications, setLocalNotifications] = useState(notifications);

    const handleMarkAsRead = async (notificationId) => {
        try {
            const response = await fetch(`/api/notifications/mark-read`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                },
                body: JSON.stringify({ notification_id: notificationId }),
            });

            if (response.ok) {
                setLocalNotifications(prev => 
                    prev.map(notification => 
                        notification.id === notificationId 
                            ? { ...notification, read: true, read_at: new Date().toISOString() }
                            : notification
                    )
                );
            }
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    const handleMarkAllAsRead = async () => {
        try {
            const response = await fetch('/api/notifications/mark-all-read', {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                },
            });

            if (response.ok) {
                setLocalNotifications(prev => 
                    prev.map(notification => ({ ...notification, read: true, read_at: new Date().toISOString() }))
                );
            }
        } catch (error) {
            console.error('Error marking all notifications as read:', error);
        }
    };

    const handleDeleteNotification = async (notificationId) => {
        try {
            const response = await fetch(`/api/notifications/${notificationId}`, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                },
            });

            if (response.ok) {
                setLocalNotifications(prev => 
                    prev.filter(notification => notification.id !== notificationId)
                );
            }
        } catch (error) {
            console.error('Error deleting notification:', error);
        }
    };

    const handleNotificationClick = (notification) => {
        // Mark as read first
        handleMarkAsRead(notification.id);

        // Navigate based on notification type
        if (notification.data && notification.data.product_id) {
            const productId = notification.data.product_id;
            
            switch (notification.type) {
                case 'purchase':
                    // For purchase notifications, go to purchased product page
                    router.visit(`/purchasedproduct/${productId}`);
                    break;
                case 'new_item':
                case 'relist':
                    // For new item and relist notifications, go to unpurchased product page
                    router.visit(`/unpurchasedproduct/${productId}`);
                    break;
                default:
                    // For other types, just mark as read
                    break;
            }
        }
    };

    const getNotificationImage = (notification) => {
        // Use the image_url from the notification data if available
        if (notification.image_url) {
            return notification.image_url;
        }
        return default_user;
    };

    return (
        <div className="bg-white">
            <Header />
            {/* Main Section */}
            <main className="hidden md:flex flex-col items-center self-stretch min-h-screen pb-[80px] bg-white pt-[98px]">
                {/* Frame 1 */}
                <div className="flex flex-col items-start w-[880px] min-w-[880px] max-w-[880px] gap-[24px] ">
                    {/* Frame 11 */}
                    <div className="flex flex-col items-center h-[118px] p-[40px_0_1px_0] self-stretch border-b border-[#D1D1D1] bg-white ">
                        <h1 className="text-[#363636] text-center font-bold text-[36px] leading-[54px] font-noto self-stretch">通知</h1>
                    </div>
                    {/* Frame 12 */}
                    <div className="flex flex-col items-start self-stretch">
                        {localNotifications.length === 0 ? (
                            <div className="text-center py-12 w-full">
                                <p className="text-[#363636] text-lg">通知がありません</p>
                            </div>
                        ) : (
                            <>
                                <div className="flex justify-between items-center w-full mb-4">
                                    <span className="text-[#363636] font-medium text-[14px]">通知一覧</span>
                                    <button 
                                        onClick={handleMarkAllAsRead}
                                        className="text-[#AB31D3] font-medium text-[14px] hover:underline"
                                    >
                                        すべて既読にする
                                    </button>
                                </div>
                                {localNotifications.map((notification) => (
                                    <div 
                                        key={notification.id} 
                                        className={`flex p-[16px] items-start gap-[16px] self-stretch border-b border-[#E9E9E9] cursor-pointer ${!notification.read ? 'bg-blue-50' : ''}`}
                                        onClick={() => handleNotificationClick(notification)}
                                    >
                                        <div className="flex w-[112px] h-[112px] p-[2.205px_19.843px_1.323px_19.843px] justify-center items-center rounded-[4.409px] bg-[#F6F6F6]">
                                            <img src={getNotificationImage(notification)} alt="notification" className="w-full h-full object-cover rounded" />
                                        </div>
                                        {/* Frame 1211 */}
                                        <div className="flex flex-col h-[118px] pr-[32px] justify-between items-start flex-1">
                                            <div className="flex flex-col gap-2">
                                                <span className="text-black font-bold text-[16px] leading-[21px] font-noto self-stretch">
                                                    {notification.title}
                                                </span>
                                                <span className="text-black font-normal text-[14px] leading-[21px] font-noto self-stretch">
                                                    {notification.message}
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center w-full">
                                                <span className="text-[#363636] font-medium text-[14px] leading-[25.2px] font-noto">
                                                    {notification.created_at}
                                                </span>
                                                <button 
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDeleteNotification(notification.id);
                                                    }}
                                                    className="text-red-500 hover:text-red-700 text-[12px]"
                                                >
                                                    削除
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                </div >
            </main >
            {/* Mobile Main Section */}
            < main className="flex md:hidden flex-col items-center self-stretch min-h-screen pb-[80px] bg-white pt-[80px]" >
                {/* Title */}
                < div className="flex flex-col items-center p-[16px_0_16px_0] self-stretch border-b border-[#D1D1D1]" >
                    <h1 className="w-full text-center text-[#363636] font-noto font-bold text-[24px] leading-[24px]">通知</h1>
                </div >
                {/* Frame 12 */}
                <div className="flex flex-col items-start w-[375px] self-stretch">
                    {localNotifications.length === 0 ? (
                        <div className="text-center py-12 w-full">
                            <p className="text-[#363636] text-lg">通知がありません</p>
                        </div>
                    ) : (
                        <>
                            <div className="flex justify-between items-center w-full mb-4 px-4">
                                <span className="text-[#363636] font-medium text-[14px]">通知一覧</span>
                                <button 
                                    onClick={handleMarkAllAsRead}
                                    className="text-[#AB31D3] font-medium text-[14px] hover:underline"
                                >
                                    すべて既読にする
                                </button>
                            </div>
                            {localNotifications.map((notification) => (
                                <div 
                                    key={notification.id} 
                                    className={`flex p-[16px] items-start gap-[16px] self-stretch border-b border-[#E9E9E9] cursor-pointer ${!notification.read ? 'bg-blue-50' : ''}`}
                                    onClick={() => handleNotificationClick(notification)}
                                >
                                    {/* Image */}
                                    <div className="flex w-[64px] h-[64px] p-[1.26px_11.339px_0.756px_11.339px] justify-center items-center rounded-[2.52px] bg-[#F6F6F6]">
                                        <img src={getNotificationImage(notification)} alt="notification" className="w-full h-full object-cover rounded" />
                                    </div>
                                    {/* 1211 */}
                                    <div className="flex flex-col h-[88px] pr-[32px] justify-between items-start flex-1">
                                        <div className="flex flex-col gap-1">
                                            <span className="self-stretch text-black font-noto font-bold text-[14px] leading-[18px]">
                                                {notification.title}
                                            </span>
                                            <span className="self-stretch text-black font-noto font-normal text-[12px] leading-[16px]">
                                                {notification.message}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center w-full">
                                            <span className="self-stretch text-[#363636] font-noto font-medium text-[12px] leading-[16px]">
                                                {notification.created_at}
                                            </span>
                                            <button 
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDeleteNotification(notification.id);
                                                }}
                                                className="text-red-500 hover:text-red-700 text-[10px]"
                                            >
                                                削除
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </main >
            <Footer />
        </div >
    );
};

export default Notification;