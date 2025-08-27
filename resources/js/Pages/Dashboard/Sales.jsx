import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';

export default function Sales() {
    return (
        <DashboardLayout activeTab="sales">
            <Head title="販売管理" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">販売管理</h1>
                        <p className="text-gray-600 mt-1">販売と注文を追跡</p>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200">
                        すべての注文を表示
                    </button>
                </div>

                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <p className="text-gray-600">販売管理ページは準備中です...</p>
                </div>
            </div>
        </DashboardLayout>
    );
}
