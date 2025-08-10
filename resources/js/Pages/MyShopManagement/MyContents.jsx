import React, { useEffect, useState } from 'react';
import { usePage, router } from '@inertiajs/react';
import Header from '@/Components/header/header';
import Footer from '@/Components/footer/footer';
import ShopSidebar from '@/Components/ShopSidebar';
import ShopMobileTopBlock from '@/Components/ShopMobileTopBlocks';
import '@/../../resources/css/shopmanagement.css';
import recyclebin from '@/assets/images/recyclebin.svg';

const MyContents = () => {
    const { productBatches } = usePage().props;
    const [deletingId, setDeletingId] = useState(null);

    // Debug: Log the data structure
    console.log('Product Batches:', productBatches);

    const handleDelete = async (id) => {
        if (confirm('この商品を削除しますか？')) {
            setDeletingId(id);
            try {
                await router.delete(`/myshop/contents/${id}`);
                // The page will automatically refresh with updated data
            } catch (error) {
                console.error('Delete failed:', error);
                alert('削除に失敗しました。');
            } finally {
                setDeletingId(null);
            }
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
                <ShopMobileTopBlock/>
                {/* Main Section */}
                {/* MOBILE: custom layout, DESKTOP: keep as is */}
                <main
                  className="md:flex flex-col items-left gap-[32px] max-w-[928px] py-[50px] pb-[40px] self-stretch md:ml-[79px]"
                >
                  {/* MOBILE ONLY */}
                  <div className="block md:hidden mx-4 mt-[12px] inline-flex flex-col items-start gap-4 ">
                    {/* Title */}
                    <h1 className="w-[343px] text-[#363636] text-left font-['Noto_Sans_JP'] font-bold text-[24px] leading-[24px]">商品管理</h1>
                    {/* Frame 1 */}
                    <div className="flex flex-col items-start w-[343px]">
                      {/* Frame 11 */}
                      <div className="flex flex-col items-center gap-4 p-[20px_0px_20px_0px] rounded-[10px] bg-white shadow-[0px_4px_36px_0px_rgba(0,0,0,0.10)] w-full">
                        {/* Mobile Product Items */}
                        {productBatches && productBatches.length > 0 ? (
                          productBatches.map((batch, index) => {
                            console.log(`Batch ${index}:`, {
                              id: batch.id,
                              title: batch.title,
                              filesCount: batch.files ? batch.files.length : 0,
                              firstFileUrl: batch.files && batch.files.length > 0 ? batch.files[0].url : 'No files'
                            });
                            return (
                            <div key={batch.id} className="w-[311px] h-[141px] flex flex-col border-b border-[#E9E9E9] relative">
                              {/* m1: frame for 11111, 11114, 11115 */}
                              <div className="flex flex-col w-[215px] ml-20 mt-4">
                                {/* 11111: lock + 非公開中 */}
                                {!batch.is_public && (
                                  <div className="inline-flex items-center px-1 rounded-[30px]">
                                    <svg width="20" height="20" viewBox="0 0 81 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M62.4258 28C66.2918 28 69.4258 31.134 69.4258 35V69C69.4258 72.866 66.2918 76 62.4258 76H16.4258C12.5598 76 9.42578 72.866 9.42578 69V35C9.42578 31.134 12.5598 28 16.4258 28H62.4258ZM39.4258 42C35.0075 42 31.4258 45.5817 31.4258 50C31.4258 52.9606 33.0353 55.5433 35.4258 56.9268V63C35.4258 65.2091 37.2166 67 39.4258 67C41.6349 67 43.4258 65.2091 43.4258 63V56.9268C45.8163 55.5433 47.4258 52.9606 47.4258 50C47.4258 45.5817 43.8441 42 39.4258 42Z" fill="#FF2AA1"/>
                                      <path d="M39.4258 9.16211C49.2772 9.16211 57.2637 17.1486 57.2637 27V33.8379H21.5879V27C21.5879 17.1486 29.5744 9.16211 39.4258 9.16211Z" stroke="#FF2AA1" strokeWidth="8.32502"/>
                                    </svg>
                                    <span className="text-[#FF2AA1] font-['Noto_Sans_JP'] text-[12px] font-bold leading-[15px]">非公開中</span>
                                  </div>
                                )}
                                {/* 11114: title */}
                                <div className="mt-1 w-full align-stretch">
                                  <span className="block text-black font-['Noto_Sans_JP'] text-[14px] font-normal leading-[21px]">{batch.title}</span>
                                </div>
                                {/* 11115: price */}
                                <div className="flex items-center w-[29px] h-[20px]">
                                  <span className="text-[#363636] font-['Noto_Sans_JP'] text-[18px] font-bold leading-[32px]">{batch.price}</span>
                                  <span className="text-[#363636] font-['Noto_Sans_JP'] text-[12px] font-bold leading-[32px] mt-1">円</span>
                                </div>
                              </div>
                              {/* 11113: image */}
                              <div className="absolute top-4 left-0 flex w-[64px] h-[64px] px-[11.339px] py-[1.26px] justify-center items-center rounded-[2.52px] bg-[#F6F6F6]">
                                {batch.files && batch.files.length > 0 ? (
                                  <div>
                                    {/* Debug: Log image info */}
                                    {console.log('Rendering image for batch:', batch.id, 'URL:', batch.files[0].url)}
                                    <img 
                                      src={batch.files[0].url} 
                                      alt="photo" 
                                      className="w-[41.323px] h-[61.984px] object-cover"
                                      onError={(e) => console.error('Image failed to load:', batch.files[0].url, e)}
                                    />
                                  </div>
                                ) : (
                                  <div className="w-[41.323px] h-[61.984px] bg-gray-200 flex items-center justify-center">
                                    <span className="text-gray-400 text-xs">No Image</span>
                                  </div>
                                )}
                              </div>
                              {/* 11112: 編集/削除 */}
                              <div className="absolute left-20 mt-[93px] inline-flex items-center gap-2">
                                <button 
                                  onClick={() => router.visit(`/myshop/registerproduct/${batch.id}/edit`)}
                                  className="flex items-center gap-2 w-[80px] h-[32px] px-3 rounded-[5px] bg-[#E9E9E9] hover:bg-gray-200 transition-colors"
                                >
                                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2 17.9997H18M2 17.9997V13.9997L10 5.99975M2 17.9997L6 17.9997L14 9.99974M10 5.99975L12.8686 3.1311L12.8704 3.1294C13.2652 2.73451 13.463 2.53672 13.691 2.46264C13.8919 2.39738 14.1082 2.39738 14.3091 2.46264C14.5369 2.53667 14.7345 2.73424 15.1288 3.12856L16.8686 4.86836C17.2646 5.26437 17.4627 5.46247 17.5369 5.6908C17.6022 5.89164 17.6021 6.10799 17.5369 6.30883C17.4628 6.537 17.265 6.7348 16.8695 7.13025L16.8686 7.1311L14 9.99974M10 5.99975L14 9.99974" stroke="#767676" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                  <span className="flex-1 text-[#767676] font-['Noto_Sans_JP'] text-[12px] font-bold leading-[18px]">編集</span>
                                </button>
                                                                 <button 
                                   onClick={() => handleDelete(batch.id)}
                                   disabled={deletingId === batch.id}
                                   className="flex items-center gap-2 w-[80px] h-[32px] px-3 rounded-[5px] bg-[#E9E9E9] hover:bg-red-100 transition-colors"
                                 >
                                   <img src={recyclebin} alt="delete" className="w-5 h-5" />
                                   <span className="flex-1 text-[#767676] font-['Noto_Sans_JP'] text-[12px] font-bold leading-[18px]">
                                     {deletingId === batch.id ? '削除中...' : '削除'}
                                   </span>
                                 </button>
                              </div>
                            </div>
                          );
                        })
                        ) : (
                          <div className="w-[311px] h-[141px] flex items-center justify-center">
                            <span className="text-gray-400">商品がありません</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* DESKTOP: keep original layout */}
                  <div className="hidden md:block">
                    {/* Title */}
                    <h1 className="text-[#363636] font-['Noto_Sans_JP'] text-[36px] font-bold leading-[54px]">商品管理</h1>
                    {/* Frame 1 */}
                    <div className="flex flex-col mt-8 items-center gap-4 py-5 rounded-[10px] bg-white shadow-[0px_4px_36px_0px_rgba(0,0,0,0.10)] self-stretch">
                        {/* Frame 11 */}
                        <div className="flex flex-col items-start gap-4  mx-5">
                            {/* Frame 111 (list) */}
                            <div className="flex flex-col items-start gap-4">
                                {/* Desktop Product Items */}
                                {productBatches && productBatches.length > 0 ? (
                                  productBatches.map((batch) => {
                                    console.log(`Desktop Batch:`, {
                                      id: batch.id,
                                      title: batch.title,
                                      filesCount: batch.files ? batch.files.length : 0,
                                      firstFileUrl: batch.files && batch.files.length > 0 ? batch.files[0].url : 'No files'
                                    });
                                    return (
                                    <div key={batch.id} className="w-[834px] h-[152px] relative">
                                        {/* 11111: lock + 非公開中 */}
                                        {!batch.is_public && (
                                          <div className="absolute left-[121px] top-[18.5px] inline-flex items-center gap-1 px-1 py-0 rounded-[30px]">
                                              <svg width="20" height="20" viewBox="0 0 81 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                  <path d="M62.4258 28C66.2918 28 69.4258 31.134 69.4258 35V69C69.4258 72.866 66.2918 76 62.4258 76H16.4258C12.5598 76 9.42578 72.866 9.42578 69V35C9.42578 31.134 12.5598 28 16.4258 28H62.4258ZM39.4258 42C35.0075 42 31.4258 45.5817 31.4258 50C31.4258 52.9606 33.0353 55.5433 35.4258 56.9268V63C35.4258 65.2091 37.2166 67 39.4258 67C41.6349 67 43.4258 65.2091 43.4258 63V56.9268C45.8163 55.5433 47.4258 52.9606 47.4258 50C47.4258 45.5817 43.8441 42 39.4258 42Z" fill="#FF2AA1"/>
                                                  <path d="M39.4258 9.16211C49.2772 9.16211 57.2637 17.1486 57.2637 27V33.8379H21.5879V27C21.5879 17.1486 29.5744 9.16211 39.4258 9.16211Z" stroke="#FF2AA1" strokeWidth="8.32502"/>
                                              </svg>
                                              <span className="text-[#FF2AA1] font-['Noto_Sans_JP'] text-[13px] font-bold leading-[15px]">非公開中</span>
                                          </div>
                                        )}
                                        {/* 11112: 編集/削除 */}
                                        <div className="absolute top-[58px] right-[9px] inline-flex items-center gap-2">
                                            <button 
                                              onClick={() => router.visit(`/myshop/registerproduct/${batch.id}/edit`)}
                                              className="flex items-center gap-2 w-[90px] h-[34px] px-4 rounded-[5px] bg-[#E9E9E9] hover:bg-gray-200 transition-colors"
                                            >
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M2 17.9997H18M2 17.9997V13.9997L10 5.99975M2 17.9997L6 17.9997L14 9.99974M10 5.99975L12.8686 3.1311L12.8704 3.1294C13.2652 2.73451 13.463 2.53672 13.691 2.46264C13.8919 2.39738 14.1082 2.39738 14.3091 2.46264C14.5369 2.53667 14.7345 2.73424 15.1288 3.12856L16.8686 4.86836C17.2646 5.26437 17.4627 5.46247 17.5369 5.6908C17.6022 5.89164 17.6021 6.10799 17.5369 6.30883C17.4628 6.537 17.265 6.7348 16.8695 7.13025L16.8686 7.1311L14 9.99974M10 5.99975L14 9.99974" stroke="#767676" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                                <span className="flex-1 text-[#767676] font-['Noto_Sans_JP'] text-[12px] font-bold leading-[18px]">編集</span>
                                            </button>
                                            <button 
                                              onClick={() => handleDelete(batch.id)}
                                              disabled={deletingId === batch.id}
                                              className="flex items-center gap-2 w-[90px] h-[34px] px-4 rounded-[5px] bg-[#E9E9E9] hover:bg-red-100 transition-colors"
                                            >
                                                <img src={recyclebin} alt="delete" className="w-5 h-5" />
                                                <span className="flex-1 text-[#767676] font-['Noto_Sans_JP'] text-[12px] font-bold leading-[18px]">
                                                  {deletingId === batch.id ? '削除中...' : '削除'}
                                                </span>
                                            </button>
                                        </div>
                                        {/* 11113: image */}
                                        <div className="absolute top-[16px] left-[-7px] flex w-[112px] h-[112px] px-[19.843px] py-[2.205px] justify-center items-center rounded-[4.409px] bg-[#F6F6F6]">
                                            {batch.files && batch.files.length > 0 ? (
                                              <div>
                                                {/* Debug: Log image info */}
                                                {console.log('Desktop - Rendering image for batch:', batch.id, 'URL:', batch.files[0].url)}
                                                <img 
                                                  src={batch.files[0].url} 
                                                  alt="photo" 
                                                  className="w-[72.315px] h-[108.472px] object-cover"
                                                  onError={(e) => console.error('Desktop - Image failed to load:', batch.files[0].url, e)}
                                                />
                                              </div>
                                            ) : (
                                              <div className="w-[72.315px] h-[108.472px] bg-gray-200 flex items-center justify-center">
                                                <span className="text-gray-400 text-xs">No Image</span>
                                              </div>
                                            )}
                                        </div>
                                        {/* 11114: title + image count */}
                                        <div className="absolute top-[44px] left-[121px] flex flex-row items-center gap-2">
                                            <span className="text-[#363636] font-['Noto_Sans_JP'] text-[21px] font-medium leading-[31.5px]">{batch.title}</span>
                                            <div className="flex items-center gap-1 px-2 py-1 rounded-[30px] bg-[#FF2AA1] mt-2">
                                                <span className="text-white font-['Noto_Sans_JP'] text-[13px] font-bold leading-[15px]">{batch.image_cnt}枚セット</span>
                                            </div>
                                        </div>
                                        {/* 11115: price */}
                                        <div className="absolute top-[96px] left-[121px] inline-flex items-start">
                                            <span className="text-[#363636] font-['Noto_Sans_JP'] text-[24px] font-bold leading-[40px]">{batch.price}</span>
                                            <span className="text-[#363636] font-['Noto_Sans_JP'] text-[14px] font-bold leading-[32px] pt-2">円</span>
                                        </div>
                                        <div className='h-full w-full pointer-events-none' />
                                        <div className='absolute left-0 bottom-0 w-full h-px bg-[#E9E9E9]' />
                                    </div>
                                  );
                                })
                                ) : (
                                  <div className="w-[834px] h-[152px] flex items-center justify-center">
                                    <span className="text-gray-400">商品がありません</span>
                                  </div>
                                )}
                            </div>
                        </div>
                    </div>
                  </div>
                </main>
            </div>
            <Footer />
        </>
    );
};

export default MyContents;