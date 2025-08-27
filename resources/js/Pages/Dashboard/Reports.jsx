import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';

export default function Reports() {
    return (
        <DashboardLayout activeTab="reports">
            <Head title="レポート" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">レポート</h1>
                        <p className="text-gray-600 mt-1">レポートの生成と表示</p>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200">
                        レポート生成
                    </button>
                </div>

                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <p className="text-gray-600">レポートページは準備中です...</p>
                </div>
            </div>
        </DashboardLayout>
    );
}
