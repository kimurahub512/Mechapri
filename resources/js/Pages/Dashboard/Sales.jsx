import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';

export default function Sales() {
    return (
        <DashboardLayout activeTab="sales">
            <Head title="Sales Management" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Sales Management</h1>
                        <p className="text-gray-600 mt-1">Track sales and orders</p>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200">
                        View All Orders
                    </button>
                </div>

                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <p className="text-gray-600">Sales management page coming soon...</p>
                </div>
            </div>
        </DashboardLayout>
    );
}
