import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Finance() {
    const [selectedPeriod, setSelectedPeriod] = useState('month');
    const [selectedYear, setSelectedYear] = useState('2024');

    // Mock financial data
    const financialData = {
        totalRevenue: 12500000,
        totalExpenses: 3200000,
        netProfit: 9300000,
        monthlyRevenue: [
            { month: 'Jan', revenue: 850000, expenses: 280000 },
            { month: 'Feb', revenue: 920000, expenses: 290000 },
            { month: 'Mar', revenue: 1100000, expenses: 310000 },
            { month: 'Apr', revenue: 980000, expenses: 295000 },
            { month: 'May', revenue: 1200000, expenses: 320000 },
            { month: 'Jun', revenue: 1350000, expenses: 340000 },
            { month: 'Jul', revenue: 1250000, expenses: 330000 },
            { month: 'Aug', revenue: 1400000, expenses: 350000 },
            { month: 'Sep', revenue: 1300000, expenses: 325000 },
            { month: 'Oct', revenue: 1450000, expenses: 360000 },
            { month: 'Nov', revenue: 1600000, expenses: 380000 },
            { month: 'Dec', revenue: 1750000, expenses: 400000 }
        ],
        recentTransactions: [
            {
                id: 1,
                type: 'revenue',
                amount: 25000,
                description: 'Product sale - Premium Print',
                date: '2024-01-20',
                status: 'completed'
            },
            {
                id: 2,
                type: 'expense',
                amount: -5000,
                description: 'Server hosting fees',
                date: '2024-01-19',
                status: 'completed'
            },
            {
                id: 3,
                type: 'revenue',
                amount: 18000,
                description: 'Product sale - Photo Album',
                date: '2024-01-18',
                status: 'completed'
            },
            {
                id: 4,
                type: 'expense',
                amount: -3000,
                description: 'Marketing campaign',
                date: '2024-01-17',
                status: 'completed'
            },
            {
                id: 5,
                type: 'revenue',
                amount: 32000,
                description: 'Product sale - Custom Print',
                date: '2024-01-16',
                status: 'pending'
            }
        ]
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('ja-JP', {
            style: 'currency',
            currency: 'JPY'
        }).format(amount);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('ja-JP');
    };

    const getStatusBadge = (status) => {
        const statusConfig = {
            completed: { color: 'bg-green-100 text-green-800', text: 'Completed' },
            pending: { color: 'bg-yellow-100 text-yellow-800', text: 'Pending' },
            failed: { color: 'bg-red-100 text-red-800', text: 'Failed' }
        };

        const config = statusConfig[status] || statusConfig.pending;
        return (
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.color}`}>
                {config.text}
            </span>
        );
    };

    const getTransactionIcon = (type) => {
        if (type === 'revenue') {
            return (
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                </div>
            );
        } else {
            return (
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                    </svg>
                </div>
            );
        }
    };

    const maxRevenue = Math.max(...financialData.monthlyRevenue.map(item => item.revenue));

    return (
        <DashboardLayout activeTab="finance">
            <Head title="Finance" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Finance Overview</h1>
                        <p className="text-gray-600 mt-1">Track revenue, expenses, and financial performance</p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <select
                            value={selectedPeriod}
                            onChange={(e) => setSelectedPeriod(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="week">This Week</option>
                            <option value="month">This Month</option>
                            <option value="quarter">This Quarter</option>
                            <option value="year">This Year</option>
                        </select>
                        <select
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="2024">2024</option>
                            <option value="2023">2023</option>
                            <option value="2022">2022</option>
                        </select>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200">
                            <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Export Report
                        </button>
                    </div>
                </div>

                {/* Financial Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                                <p className="text-2xl font-bold text-gray-900">{formatCurrency(financialData.totalRevenue)}</p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                            </div>
                        </div>
                        <div className="mt-4">
                            <span className="text-sm text-green-600 font-medium">+12.5%</span>
                            <span className="text-sm text-gray-500 ml-1">from last month</span>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Expenses</p>
                                <p className="text-2xl font-bold text-gray-900">{formatCurrency(financialData.totalExpenses)}</p>
                            </div>
                            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                                </svg>
                            </div>
                        </div>
                        <div className="mt-4">
                            <span className="text-sm text-red-600 font-medium">+8.2%</span>
                            <span className="text-sm text-gray-500 ml-1">from last month</span>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Net Profit</p>
                                <p className="text-2xl font-bold text-gray-900">{formatCurrency(financialData.netProfit)}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                </svg>
                            </div>
                        </div>
                        <div className="mt-4">
                            <span className="text-sm text-green-600 font-medium">+15.3%</span>
                            <span className="text-sm text-gray-500 ml-1">from last month</span>
                        </div>
                    </div>
                </div>

                {/* Revenue Chart */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h3>
                    <div className="h-64 flex items-end justify-between space-x-2">
                        {financialData.monthlyRevenue.map((item, index) => (
                            <div key={index} className="flex-1 flex flex-col items-center">
                                <div className="w-full bg-gray-200 rounded-t" style={{ height: `${(item.revenue / maxRevenue) * 200}px` }}>
                                    <div className="w-full bg-blue-500 rounded-t" style={{ height: `${(item.revenue / maxRevenue) * 200}px` }}></div>
                                </div>
                                <span className="text-xs text-gray-500 mt-2">{item.month}</span>
                                <span className="text-xs text-gray-700 font-medium">{formatCurrency(item.revenue)}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Transactions */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">View All</button>
                    </div>
                    <div className="space-y-4">
                        {financialData.recentTransactions.map((transaction) => (
                            <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center space-x-4">
                                    {getTransactionIcon(transaction.type)}
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">{transaction.description}</p>
                                        <p className="text-sm text-gray-500">{formatDate(transaction.date)}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <span className={`text-sm font-semibold ${
                                        transaction.type === 'revenue' ? 'text-green-600' : 'text-red-600'
                                    }`}>
                                        {transaction.type === 'revenue' ? '+' : ''}{formatCurrency(transaction.amount)}
                                    </span>
                                    {getStatusBadge(transaction.status)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Financial Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Profit Margin</h3>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-600">Gross Margin</span>
                                    <span className="font-medium">74.4%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '74.4%' }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-600">Net Margin</span>
                                    <span className="font-medium">74.4%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '74.4%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Cash Flow</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Operating Cash Flow</span>
                                <span className="font-semibold text-green-600">+{formatCurrency(8500000)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Investing Cash Flow</span>
                                <span className="font-semibold text-red-600">-{formatCurrency(1200000)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Financing Cash Flow</span>
                                <span className="font-semibold text-blue-600">+{formatCurrency(500000)}</span>
                            </div>
                            <div className="border-t pt-2">
                                <div className="flex justify-between items-center">
                                    <span className="font-medium">Net Cash Flow</span>
                                    <span className="font-bold text-green-600">+{formatCurrency(7800000)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
