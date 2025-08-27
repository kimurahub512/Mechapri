import DashboardLayout from '@/Layouts/DashboardLayout';
import DashboardMetrics from '@/Components/DashboardMetrics';
import { Head, usePage } from '@inertiajs/react';

export default function Dashboard() {
    const { metrics } = usePage().props;
    
    const getActivityIcon = (iconType, color) => {
        const iconClasses = `w-5 h-5 text-${color}-600`;
        
        switch (iconType) {
            case 'user':
                return (
                    <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                );
            case 'product':
                return (
                    <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                );
            case 'payment':
            case 'order':
                return (
                    <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                );
            default:
                return (
                    <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                );
        }
    };

    const getActivityBgColor = (color) => {
        switch (color) {
            case 'green':
                return 'bg-green-100';
            case 'blue':
                return 'bg-blue-100';
            case 'purple':
                return 'bg-purple-100';
            case 'yellow':
                return 'bg-yellow-100';
            case 'red':
                return 'bg-red-100';
            default:
                return 'bg-gray-100';
        }
    };

    return (
        <DashboardLayout activeTab="dashboard">
            <Head title="ダッシュボード" />

            <div className="space-y-6 md:mr-[48px]">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">ダッシュボード概要</h1>
                        <p className="text-gray-600 mt-1">おかえりなさい！今日のプラットフォームの状況をご確認ください。</p>
                    </div>
                    <div className="flex items-center space-x-3 w-full md:w-auto">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 flex-1 md:flex-none">
                            <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            エクスポート
                        </button>
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200 flex-1 md:flex-none">
                            <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            設定
                        </button>
                    </div>
                </div>

                {/* Metrics */}
                <DashboardMetrics />

                {/* Recent Activity */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                        {metrics?.recentActivity && metrics.recentActivity.length > 0 ? (
                            metrics.recentActivity.map((activity, index) => (
                                <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                                    <div className={`w-10 h-10 ${getActivityBgColor(activity.color)} rounded-full flex items-center justify-center`}>
                                        {getActivityIcon(activity.icon, activity.color)}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                                        <p className="text-sm text-gray-500">{activity.description}</p>
                                    </div>
                                    <span className="text-sm text-gray-400">{activity.timeAgo}</span>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                                <svg className="w-12 h-12 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                                <p>No recent activity to display</p>
                                <p className="text-sm">Activity will appear here as users interact with your platform</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
