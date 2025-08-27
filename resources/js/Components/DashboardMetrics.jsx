import { usePage } from '@inertiajs/react';

export default function DashboardMetrics() {
    const { metrics } = usePage().props;
    
    // Handle case where metrics might not be available yet
    if (!metrics) {
        return (
            <div className="space-y-4 lg:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                    {[...Array(6)].map((_, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-sm border p-4 lg:p-6 animate-pulse">
                            <div className="flex items-center justify-between">
                                <div className="w-32 h-4 bg-gray-200 rounded"></div>
                                <div className="w-8 h-8 bg-gray-200 rounded"></div>
                            </div>
                            <div className="mt-4">
                                <div className="w-24 h-8 bg-gray-200 rounded"></div>
                                <div className="w-16 h-4 bg-gray-200 rounded mt-2"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('ja-JP', {
            style: 'currency',
            currency: 'JPY'
        }).format(amount);
    };

    const formatNumber = (num) => {
        return new Intl.NumberFormat('ja-JP').format(num);
    };

    const metricCards = [
        {
            title: '総ユーザー数',
            value: formatNumber(metrics.totalUsers),
            change: `${metrics.changes.userRegistration >= 0 ? '+' : ''}${metrics.changes.userRegistration}%`,
            changeType: metrics.changes.userRegistration >= 0 ? 'positive' : 'negative',
            icon: (
                <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
            ),
            bgColor: 'bg-blue-50',
            borderColor: 'border-blue-200'
        },
        {
            title: '総販売数',
            value: formatNumber(metrics.totalSales),
            change: `${metrics.changes.sales >= 0 ? '+' : ''}${metrics.changes.sales}%`,
            changeType: metrics.changes.sales >= 0 ? 'positive' : 'negative',
            icon: (
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            ),
            bgColor: 'bg-green-50',
            borderColor: 'border-green-200'
        },
        {
            title: '総プリント数',
            value: formatNumber(metrics.totalPrintCount),
            change: `${metrics.changes.printCount >= 0 ? '+' : ''}${metrics.changes.printCount}%`,
            changeType: metrics.changes.printCount >= 0 ? 'positive' : 'negative',
            icon: (
                <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
            ),
            bgColor: 'bg-purple-50',
            borderColor: 'border-purple-200'
        },
        {
            title: '総売上',
            value: formatCurrency(metrics.totalRevenue),
            change: `${metrics.changes.revenue >= 0 ? '+' : ''}${metrics.changes.revenue}%`,
            changeType: metrics.changes.revenue >= 0 ? 'positive' : 'negative',
            icon: (
                <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
            ),
            bgColor: 'bg-yellow-50',
            borderColor: 'border-yellow-200'
        },
        {
            title: '月間ユーザー登録',
            value: formatNumber(metrics.monthlyUserRegistration),
            change: `${metrics.changes.monthlyUserRegistration >= 0 ? '+' : ''}${metrics.changes.monthlyUserRegistration}%`,
            changeType: metrics.changes.monthlyUserRegistration >= 0 ? 'positive' : 'negative',
            icon: (
                <svg className="w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
            ),
            bgColor: 'bg-indigo-50',
            borderColor: 'border-indigo-200'
        },
        {
            title: '月間商品登録',
            value: formatNumber(metrics.monthlyProductRegistration),
            change: `${metrics.changes.monthlyProductRegistration >= 0 ? '+' : ''}${metrics.changes.monthlyProductRegistration}%`,
            changeType: metrics.changes.monthlyProductRegistration >= 0 ? 'positive' : 'negative',
            icon: (
                <svg className="w-8 h-8 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
            ),
            bgColor: 'bg-pink-50',
            borderColor: 'border-pink-200'
        }
    ];

    const getActivityIcon = (type, color) => {
        switch (type) {
            case 'user_registration':
                return (
                    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                );
            case 'product_registration':
                return (
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                );
            case 'order_completed':
                return (
                    <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                );
            case 'order_pending':
                return (
                    <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                );
            default:
                return (
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                );
        }
    };

    return (
        <div className="space-y-4 lg:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {metricCards.map((card, index) => (
                    <div key={index} className={`bg-white rounded-lg shadow-sm border ${card.borderColor} p-4 lg:p-6 hover:shadow-md transition-shadow duration-200`}>
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium text-gray-600">{card.title}</h3>
                            <div className={card.bgColor}>
                                {card.icon}
                            </div>
                        </div>
                        <div className="mt-4">
                            <p className="text-xl lg:text-2xl font-bold text-gray-900">{card.value}</p>
                            <div className="flex items-center mt-2">
                                <span className={`text-sm font-medium ${
                                    card.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                                }`}>
                                    {card.change}
                                </span>
                                <span className="text-sm text-gray-500 ml-1">先月比</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Additional Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
                <div className="bg-white rounded-lg shadow-sm border p-4 lg:p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">クイック統計</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">アクティブユーザー</span>
                            <span className="font-semibold">{formatNumber(metrics.activeUsers)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">保留中の注文</span>
                            <span className="font-semibold text-orange-600">{formatNumber(metrics.pendingOrders)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">完了した注文</span>
                            <span className="font-semibold text-green-600">{formatNumber(metrics.completedOrders)}</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border p-4 lg:p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">最近のアクティビティ</h3>
                    <div className="space-y-4">
                        {metrics.recentActivity && metrics.recentActivity.length > 0 ? (
                            metrics.recentActivity.slice(0, 5).map((activity, index) => (
                                <div key={index} className="flex items-center space-x-3">
                                    <div className="flex-shrink-0">
                                        {getActivityIcon(activity.type, activity.color)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm text-gray-900 truncate">{activity.description}</p>
                                        <p className="text-xs text-gray-500">{activity.time}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500">最近のアクティビティはありません</p>
                        )}
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border p-4 lg:p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">システム状況</h3>
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                            <span className="text-gray-600">システムオンライン</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                            <span className="text-gray-600">データベース接続済み</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                            <span className="text-gray-600">APIサービス</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
