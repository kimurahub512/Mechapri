import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';

export default function Products() {
    return (
        <DashboardLayout activeTab="products">
            <Head title="Products Management" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Products Management</h1>
                        <p className="text-gray-600 mt-1">Manage products and inventory</p>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200">
                        Add New Product
                    </button>
                </div>

                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <p className="text-gray-600">Products management page coming soon...</p>
                </div>
            </div>
        </DashboardLayout>
    );
}
