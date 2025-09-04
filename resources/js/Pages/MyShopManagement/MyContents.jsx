import React, { useEffect, useState } from 'react';
import { usePage, router } from '@inertiajs/react';
import Header from '@/Components/header/header';
import Footer from '@/Components/footer/footer';
import ShopSidebar from '@/Components/ShopSidebar';
import ShopMobileTopBlock from '@/Components/ShopMobileTopBlocks';
import '@/../../resources/css/shopmanagement.css';
import recyclebin from '@/assets/images/recyclebin.png';
import question from '@/assets/images/question_cloud.svg';
import lock from '@/assets/images/lock.svg';
import bubble from '@/assets/images/bubble.svg';
import warning from '@/assets/images/warning.svg';
import { vwd, vw, responsiveText, responsiveTextD, responsivePosition, responsiveMetric, responsiveMetricD, responsivePositionD } from '@/lib/utils';

const MyContents = () => {
  const { productBatches, flash } = usePage().props;
  const [deletingId, setDeletingId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [batchToDelete, setBatchToDelete] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Show success message if it exists in flash
  useEffect(() => {
    if (flash?.success) {
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    }
  }, [flash?.success]);

  // Debug: Log the data structure
  console.log('Product Batches:', productBatches);

  const handleDelete = (id) => {
    const batch = productBatches.find(b => b.id === id);
    setBatchToDelete(batch);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!batchToDelete) return;

    setDeletingId(batchToDelete.id);
    try {
      await router.delete(`/myshop/contents/${batchToDelete.id}`);
      // The page will automatically refresh with the redirect
    } catch (error) {
      console.error('Delete failed:', error);
      alert('削除に失敗しました。');
    } finally {
      setDeletingId(null);
      setShowDeleteModal(false);
      setBatchToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setBatchToDelete(null);
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
        <main
          className="hidden md:flex flex-col items-left gap-[32px] max-w-[928px] py-[50px] pb-[40px] self-stretch md:ml-[79px]"
        >          
          <div className="pt-[90px]">
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
                                <path d="M62.4258 28C66.2918 28 69.4258 31.134 69.4258 35V69C69.4258 72.866 66.2918 76 62.4258 76H16.4258C12.5598 76 9.42578 72.866 9.42578 69V35C9.42578 31.134 12.5598 28 16.4258 28H62.4258ZM39.4258 42C35.0075 42 31.4258 45.5817 31.4258 50C31.4258 52.9606 33.0353 55.5433 35.4258 56.9268V63C35.4258 65.2091 37.2166 67 39.4258 67C41.6349 67 43.4258 65.2091 43.4258 63V56.9268C45.8163 55.5433 47.4258 52.9606 47.4258 50C47.4258 45.5817 43.8441 42 39.4258 42Z" fill="#FF2AA1" />
                                <path d="M39.4258 9.16211C49.2772 9.16211 57.2637 17.1486 57.2637 27V33.8379H21.5879V27C21.5879 17.1486 29.5744 9.16211 39.4258 9.16211Z" stroke="#FF2AA1" strokeWidth="8.32502" />
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
                                <path d="M2 17.9997H18M2 17.9997V13.9997L10 5.99975M2 17.9997L6 17.9997L14 9.99974M10 5.99975L12.8686 3.1311L12.8704 3.1294C13.2652 2.73451 13.463 2.53672 13.691 2.46264C13.8919 2.39738 14.1082 2.39738 14.3091 2.46264C14.5369 2.53667 14.7345 2.73424 15.1288 3.12856L16.8686 4.86836C17.2646 5.26437 17.4627 5.46247 17.5369 5.6908C17.6022 5.89164 17.6021 6.10799 17.5369 6.30883C17.4628 6.537 17.265 6.7348 16.8695 7.13025L16.8686 7.1311L14 9.99974M10 5.99975L14 9.99974" stroke="#767676" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
                                {batch.display_mode === 'normal' ? (
                                  <img
                                    src={batch.files[0].url}
                                    alt="photo"
                                    className="object-cover"
                                    style={{ ...responsiveMetricD(72.315, 108.472), borderRadius: vwd(3) }}
                                    onError={(e) => console.error('Desktop - Image failed to load:', batch.files[0].url, e)}
                                  />
                                ) : batch.display_mode === 'gacha' ? (
                                  <div className="relative overflow-hidden" style={{ ...responsiveMetricD(72.315, 108.472), borderRadius: vwd(3) }}>
                                    <img
                                      src={batch.files[0].url}
                                      alt="ガチャ"
                                      className="object-cover filter blur-[4px]"
                                      style={{ ...responsiveMetricD(72.315, 108.472), borderRadius: vwd(3) }}
                                    />
                                    <div className="absolute top-0 left-0 bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] opacity-50 filter blur-[4px]" style={{ ...responsiveMetricD(72.315, 108.472), borderRadius: vwd(3) }} />
                                    <img src={bubble} alt="bubble" style={{ ...responsiveMetricD(30, 30), ...responsivePositionD(36, 22) }} />
                                  </div>
                                ) : batch.display_mode === 'blur' ? (
                                  <div className="relative overflow-hidden" style={{ ...responsiveMetricD(72.315, 108.472), borderRadius: vwd(3) }}>
                                    <img
                                      src={batch.files[0].url}
                                      alt="ぼかしフィルター"
                                      className="object-cover filter blur-[4px]"
                                      style={{ ...responsiveMetricD(72.315, 108.472), borderRadius: vwd(3) }}
                                    />
                                    <div className="absolute top-0 left-0 bg-black opacity-50 filter blur-[4px]" style={{ ...responsiveMetricD(72.315, 108.472), borderRadius: vwd(3) }} />
                                    <img src={question} alt="question" style={{ ...responsiveMetricD(30, 30), ...responsivePositionD(36, 22) }} />
                                  </div>
                                ) : batch.display_mode === 'password' ? (
                                  <div className="relative overflow-hidden" style={{ ...responsiveMetricD(72.315, 108.472), borderRadius: vwd(3) }}>
                                    <div className="absolute top-0 left-0 bg-[#586B88]" style={{ ...responsiveMetricD(72.315, 108.472), borderRadius: vwd(3) }} />
                                    <img src={lock} alt="lock" style={{ ...responsiveMetricD(30, 30), ...responsivePositionD(36, 22) }} />
                                  </div>
                                ) : batch.display_mode === 'cushion' ? (
                                  <div className="relative overflow-hidden" style={{ ...responsiveMetricD(72.315, 108.472), borderRadius: vwd(3) }}>
                                    <div className="absolute top-0 left-0 bg-[#A0A5AC]" style={{ ...responsiveMetricD(72.315, 108.472), borderRadius: vwd(3) }} />
                                    <img src={warning} alt="warning" style={{ ...responsiveMetricD(30, 30), ...responsivePositionD(36, 22) }} />
                                  </div>
                                ) : (
                                  <img
                                    src={batch.files[0].url}
                                    alt="photo"
                                    className="object-cover"
                                    style={{ ...responsiveMetricD(72.315, 108.472), borderRadius: vwd(3) }}
                                    onError={(e) => console.error('Desktop - Image failed to load:', batch.files[0].url, e)}
                                  />
                                )}
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
        {/* MOBILE ONLY */}
        <div className="flex md:hidden mx-4 inline-flex flex-col items-start gap-4 pt-[24px]">
            {/* Title */}
            <h1 className="w-full text-[#363636] text-left font-['Noto_Sans_JP'] font-bold text-[24px] leading-[24px]">商品管理</h1>
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
                                <path d="M62.4258 28C66.2918 28 69.4258 31.134 69.4258 35V69C69.4258 72.866 66.2918 76 62.4258 76H16.4258C12.5598 76 9.42578 72.866 9.42578 69V35C9.42578 31.134 12.5598 28 16.4258 28H62.4258ZM39.4258 42C35.0075 42 31.4258 45.5817 31.4258 50C31.4258 52.9606 33.0353 55.5433 35.4258 56.9268V63C35.4258 65.2091 37.2166 67 39.4258 67C41.6349 67 43.4258 65.2091 43.4258 63V56.9268C45.8163 55.5433 47.4258 52.9606 47.4258 50C47.4258 45.5817 43.8441 42 39.4258 42Z" fill="#FF2AA1" />
                                <path d="M39.4258 9.16211C49.2772 9.16211 57.2637 17.1486 57.2637 27V33.8379H21.5879V27C21.5879 17.1486 29.5744 9.16211 39.4258 9.16211Z" stroke="#FF2AA1" strokeWidth="8.32502" />
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
                              {batch.display_mode === 'normal' ? (
                                <img
                                  src={batch.files[0].url}
                                  alt="photo"
                                  className="object-cover"
                                  style={{ ...responsiveMetric(41.323, 61.984), borderRadius: vw(2) }}
                                  onError={(e) => console.error('Image failed to load:', batch.files[0].url, e)}
                                />
                              ) : batch.display_mode === 'gacha' ? (
                                <div className="relative overflow-hidden" style={{ ...responsiveMetric(41.323, 61.984), borderRadius: vw(2) }}>
                                  <img
                                    src={batch.files[0].url}
                                    alt="ガチャ"
                                    className="object-cover filter blur-[4px]"
                                    style={{ ...responsiveMetric(41.323, 61.984), borderRadius: vw(2) }}
                                  />
                                  <div className="absolute top-0 left-0 bg-gradient-to-l from-[#FF2AA1] to-[#AB31D3] opacity-50 filter blur-[4px]" style={{ ...responsiveMetric(41.323, 61.984), borderRadius: vw(2) }} />
                                  <img src={bubble} alt="bubble" style={{ ...responsiveMetric(20, 20), ...responsivePosition(18, 12) }} />
                                </div>
                              ) : batch.display_mode === 'blur' ? (
                                <div className="relative overflow-hidden" style={{ ...responsiveMetric(41.323, 61.984), borderRadius: vw(2) }}>
                                  <img
                                    src={batch.files[0].url}
                                    alt="ぼかしフィルター"
                                    className="object-cover filter blur-[4px]"
                                    style={{ ...responsiveMetric(41.323, 61.984), borderRadius: vw(2) }}
                                  />
                                  <div className="absolute top-0 left-0 bg-black opacity-50 filter blur-[4px]" style={{ ...responsiveMetric(41.323, 61.984), borderRadius: vw(2) }} />
                                  <img src={question} alt="question" style={{ ...responsiveMetric(20, 20), ...responsivePosition(18, 12) }} />
                                </div>
                              ) : batch.display_mode === 'password' ? (
                                <div className="relative overflow-hidden" style={{ ...responsiveMetric(41.323, 61.984), borderRadius: vw(2) }}>
                                  <div className="absolute top-0 left-0 bg-[#586B88]" style={{ ...responsiveMetric(41.323, 61.984), borderRadius: vw(2) }} />
                                  <img src={lock} alt="lock" style={{ ...responsiveMetric(20, 20), ...responsivePosition(18, 12) }} />
                                </div>
                              ) : batch.display_mode === 'cushion' ? (
                                <div className="relative overflow-hidden" style={{ ...responsiveMetric(41.323, 61.984), borderRadius: vw(2) }}>
                                  <div className="absolute top-0 left-0 bg-[#A0A5AC]" style={{ ...responsiveMetric(41.323, 61.984), borderRadius: vw(2) }} />
                                  <img src={warning} alt="warning" style={{ ...responsiveMetric(20, 20), ...responsivePosition(18, 12) }} />
                                </div>
                              ) : (
                                <img
                                  src={batch.files[0].url}
                                  alt="photo"
                                  className="object-cover"
                                  style={{ ...responsiveMetric(41.323, 61.984), borderRadius: vw(2) }}
                                  onError={(e) => console.error('Image failed to load:', batch.files[0].url, e)}
                                />
                              )}
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
                              <path d="M2 17.9997H18M2 17.9997V13.9997L10 5.99975M2 17.9997L6 17.9997L14 9.99974M10 5.99975L12.8686 3.1311L12.8704 3.1294C13.2652 2.73451 13.463 2.53672 13.691 2.46264C13.8919 2.39738 14.1082 2.39738 14.3091 2.46264C14.5369 2.53667 14.7345 2.73424 15.1288 3.12856L16.8686 4.86836C17.2646 5.26437 17.4627 5.46247 17.5369 5.6908C17.6022 5.89164 17.6021 6.10799 17.5369 6.30883C17.4628 6.537 17.265 6.7348 16.8695 7.13025L16.8686 7.1311L14 9.99974M10 5.99975L14 9.99974" stroke="#767676" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && batchToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-bold mb-4">確認</h3>
            <p className="text-gray-600 mb-6">
              「{batchToDelete.title}」を削除しますか？
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                キャンセル
              </button>
              <button
                onClick={confirmDelete}
                disabled={deletingId === batchToDelete.id}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors disabled:opacity-50"
              >
                {deletingId === batchToDelete.id ? '削除中...' : '削除する'}
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
            {flash?.success}
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default MyContents;