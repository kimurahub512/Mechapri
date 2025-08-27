import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, usePage, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import ConfirmationModal from '@/Components/ConfirmationModal';

export default function UserManagement() {
    const { users = [], pagination = {}, filters = {}, errors = {}, flash = {} } = usePage().props;
    
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [userTypeFilter, setUserTypeFilter] = useState(filters.user_type || 'all');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [editForm, setEditForm] = useState({
        email: '',
        user_type: 'buyer'
    });
    const [editErrors, setEditErrors] = useState({});
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deletingUser, setDeletingUser] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [createForm, setCreateForm] = useState({
        email: '',
        name: '',
        user_type: 'buyer'
    });
    const [createErrors, setCreateErrors] = useState({});
    const [isCreating, setIsCreating] = useState(false);

    // Debounced search effect
    useEffect(() => {
        const timer = setTimeout(() => {
            updateFilters();
        }, 500);

        return () => clearTimeout(timer);
    }, [searchTerm, userTypeFilter]);

    const updateFilters = () => {
        router.get('/dashboard/users', {
            search: searchTerm,
            user_type: userTypeFilter,
        }, {
            preserveState: true,
            replace: true,
        });
    };

    const handlePageChange = (page) => {
        router.get('/dashboard/users', {
            search: searchTerm,
            user_type: userTypeFilter,
            page: page,
        }, {
            preserveState: true,
            replace: true,
        });
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('ja-JP', {
            style: 'currency',
            currency: 'JPY'
        }).format(amount);
    };

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        
        // Parse the date string (format: Y-m-d H:i:s) - already in Japan time
        const date = new Date(dateString);
        
        // Format as Japanese date
        return date.toLocaleDateString('ja-JP', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
        });
    };

    const getUserTypeBadge = (userType) => {
        const typeConfig = {
            admin: { color: 'bg-red-100 text-red-800', text: '管理者' },
            buyer: { color: 'bg-blue-100 text-blue-800', text: '購入者' },
            seller: { color: 'bg-green-100 text-green-800', text: '販売者' }
        };

        const config = typeConfig[userType] || typeConfig.buyer;
        return (
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.color}`}>
                {config.text}
            </span>
        );
    };

    const getSourceBadge = (source) => {
        const sourceConfig = {
            web: { color: 'bg-gray-100 text-gray-800', text: 'Web' },
            google: { color: 'bg-red-100 text-red-800', text: 'Google' },
            line: { color: 'bg-green-100 text-green-800', text: 'LINE' }
        };

        const config = sourceConfig[source] || sourceConfig.web;
        return (
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.color}`}>
                {config.text}
            </span>
        );
    };

    const handleEdit = (user) => {
        setEditingUser(user);
        setEditForm({
            email: user.email,
            user_type: user.user_type
        });
        setIsEditModalOpen(true);
    };

    const handleSaveEdit = () => {
        if (!editingUser) return;

        // Clear previous errors
        setEditErrors({});

        router.put(`/dashboard/users/${editingUser.id}`, editForm, {
            onSuccess: () => {
                setIsEditModalOpen(false);
                setEditingUser(null);
                setEditForm({ email: '', user_type: 'buyer' });
                setEditErrors({});
            },
            onError: (errors) => {
                setEditErrors(errors);
            }
        });
    };

    const handleCancelEdit = () => {
        setIsEditModalOpen(false);
        setEditingUser(null);
        setEditForm({ email: '', user_type: 'buyer' });
    };

    const handleDelete = (user) => {
        setDeletingUser(user);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (!deletingUser) return;

        setIsDeleting(true);
        router.delete(`/dashboard/users/${deletingUser.id}`, {
            onSuccess: () => {
                setIsDeleteModalOpen(false);
                setDeletingUser(null);
                setIsDeleting(false);
            },
            onError: (errors) => {
                setIsDeleting(false);
                console.error('Delete failed:', errors);
            }
        });
    };

    const handleCancelDelete = () => {
        setIsDeleteModalOpen(false);
        setDeletingUser(null);
        setIsDeleting(false);
    };

    const handleCreateUser = () => {
        setIsCreateModalOpen(true);
        setCreateForm({
            email: '',
            name: '',
            user_type: 'buyer'
        });
        setCreateErrors({});
    };

    const handleSaveCreate = () => {
        // Clear previous errors
        setCreateErrors({});
        setIsCreating(true);

        router.post('/dashboard/users', createForm, {
            onSuccess: () => {
                setIsCreateModalOpen(false);
                setCreateForm({ email: '', name: '', user_type: 'buyer' });
                setCreateErrors({});
                setIsCreating(false);
            },
            onError: (errors) => {
                setCreateErrors(errors);
                setIsCreating(false);
            }
        });
    };

    const handleCancelCreate = () => {
        setIsCreateModalOpen(false);
        setCreateForm({ email: '', name: '', user_type: 'buyer' });
        setCreateErrors({});
        setIsCreating(false);
    };

    return (
        <DashboardLayout activeTab="users">
            <Head title="User Management" />

            <div className="space-y-6 mr-6">
                {/* Success Message */}
                {flash.success && (
                    <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                        {flash.success}
                    </div>
                )}

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">ユーザー管理</h1>
                        <p className="text-gray-600 mt-1">ユーザーアカウントと権限を管理</p>
                    </div>
                    <button 
                        onClick={handleCreateUser}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                    >
                        <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        新規ユーザー追加
                    </button>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-2">ユーザー検索</label>
                            <input
                                type="text"
                                placeholder="名前またはメールアドレスで検索..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div className="md:w-48">
                            <label className="block text-sm font-medium text-gray-700 mb-2">ユーザータイプ</label>
                            <select
                                value={userTypeFilter}
                                onChange={(e) => setUserTypeFilter(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="all">すべて</option>
                                <option value="admin">管理者</option>
                                <option value="buyer">購入者</option>
                                <option value="seller">販売者</option>
                            </select>
                        </div>
                        <div className="md:w-32">
                            <label className="block text-sm font-medium text-gray-700 mb-2">表示件数</label>
                            <select
                                value={pagination.per_page || 10}
                                onChange={(e) => {
                                    router.get('/dashboard/users', {
                                        search: searchTerm,
                                        user_type: userTypeFilter,
                                        per_page: e.target.value,
                                    }, {
                                        preserveState: true,
                                        replace: true,
                                    });
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="10">10件</option>
                                <option value="25">25件</option>
                                <option value="50">50件</option>
                                <option value="100">100件</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Users Table */}
                <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        名前
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        メールアドレス
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        ユーザータイプ
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        総収益
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        総支出
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        登録日
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        アクション
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {users.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                                                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {user.name || '名無し'}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {getSourceBadge(user.source)}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{user.email}</div>
                                            {user.email_verified_at && (
                                                <div className="text-xs text-green-600">✓ 認証済み</div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {getUserTypeBadge(user.user_type)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {formatCurrency(user.total_earned)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {formatCurrency(user.total_spent)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {formatDate(user.registered)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex space-x-2">
                                                <button 
                                                    onClick={() => handleEdit(user)}
                                                    className="text-blue-600 hover:text-blue-900 transition-colors duration-200"
                                                >
                                                    編集
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(user)}
                                                    className="text-red-600 hover:text-red-900 transition-colors duration-200"
                                                >
                                                    削除
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Empty State */}
                    {users.length === 0 && (
                        <div className="text-center py-12">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                            </svg>
                            <h3 className="mt-2 text-sm font-medium text-gray-900">ユーザーが見つかりません</h3>
                            <p className="mt-1 text-sm text-gray-500">
                                {searchTerm || userTypeFilter !== 'all' 
                                    ? '検索条件を調整するか、フィルターを変更してください。' 
                                    : '新しいユーザーを作成してください。'}
                            </p>
                        </div>
                    )}

                    {/* Pagination */}
                    {pagination.total > 0 && (
                        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                            <div className="flex-1 flex justify-between sm:hidden">
                                <button
                                    onClick={() => handlePageChange(Math.max(1, pagination.current_page - 1))}
                                    disabled={pagination.current_page === 1}
                                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                                >
                                    前へ
                                </button>
                                <button
                                    onClick={() => handlePageChange(Math.min(pagination.last_page, pagination.current_page + 1))}
                                    disabled={pagination.current_page === pagination.last_page}
                                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                                >
                                    次へ
                                </button>
                            </div>
                            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm text-gray-700">
                                        表示 <span className="font-medium">{pagination.from}</span> から{' '}
                                        <span className="font-medium">
                                            {Math.min(pagination.to, pagination.total)}
                                        </span>{' '}
                                        件中 <span className="font-medium">{pagination.total}</span> 件
                                    </p>
                                </div>
                                <div>
                                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                        <button
                                            onClick={() => handlePageChange(Math.max(1, pagination.current_page - 1))}
                                            disabled={pagination.current_page === 1}
                                            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                                        >
                                            前へ
                                        </button>
                                        {[...Array(pagination.last_page)].map((_, index) => (
                                            <button
                                                key={index + 1}
                                                onClick={() => handlePageChange(index + 1)}
                                                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                                    pagination.current_page === index + 1
                                                        ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                                }`}
                                            >
                                                {index + 1}
                                            </button>
                                        ))}
                                        <button
                                            onClick={() => handlePageChange(Math.min(pagination.last_page, pagination.current_page + 1))}
                                            disabled={pagination.current_page === pagination.last_page}
                                            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                                        >
                                            次へ
                                        </button>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Edit Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <div className="mt-3">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">ユーザー編集</h3>
                            
                            {/* Success Message */}
                            {flash.success && (
                                <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                                    {flash.success}
                                </div>
                            )}
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        メールアドレス
                                    </label>
                                    <input
                                        type="email"
                                        value={editForm.email}
                                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                            editErrors.email ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    />
                                    {editErrors.email && (
                                        <p className="mt-1 text-sm text-red-600">{editErrors.email}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        ユーザータイプ
                                    </label>
                                    <select
                                        value={editForm.user_type}
                                        onChange={(e) => setEditForm({ ...editForm, user_type: e.target.value })}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                            editErrors.user_type ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    >
                                        <option value="admin">管理者</option>
                                        <option value="buyer">購入者</option>
                                        <option value="seller">販売者</option>
                                    </select>
                                    {editErrors.user_type && (
                                        <p className="mt-1 text-sm text-red-600">{editErrors.user_type}</p>
                                    )}
                                </div>
                            </div>
                            <div className="flex justify-end space-x-3 mt-6">
                                <button
                                    onClick={handleCancelEdit}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                >
                                    キャンセル
                                </button>
                                <button
                                    onClick={handleSaveEdit}
                                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    変更を保存
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Create User Modal */}
            {isCreateModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <div className="mt-3">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">新規ユーザー作成</h3>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        メールアドレス <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        value={createForm.email}
                                        onChange={(e) => setCreateForm({ ...createForm, email: e.target.value })}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                            createErrors.email ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="user@example.com"
                                    />
                                    {createErrors.email && (
                                        <p className="mt-1 text-sm text-red-600">{createErrors.email}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        名前
                                    </label>
                                    <input
                                        type="text"
                                        value={createForm.name}
                                        onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                            createErrors.name ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="mechapri123 (自動生成されます)"
                                    />
                                    {createErrors.name && (
                                        <p className="mt-1 text-sm text-red-600">{createErrors.name}</p>
                                    )}
                                    <p className="mt-1 text-xs text-gray-500">
                                        空白の場合は「mechapri + ID」で自動生成されます
                                    </p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        ユーザータイプ <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={createForm.user_type}
                                        onChange={(e) => setCreateForm({ ...createForm, user_type: e.target.value })}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                            createErrors.user_type ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    >
                                        <option value="buyer">購入者</option>
                                        <option value="seller">販売者</option>
                                        <option value="admin">管理者</option>
                                    </select>
                                    {createErrors.user_type && (
                                        <p className="mt-1 text-sm text-red-600">{createErrors.user_type}</p>
                                    )}
                                </div>
                            </div>
                            <div className="flex justify-end space-x-3 mt-6">
                                <button
                                    onClick={handleCancelCreate}
                                    disabled={isCreating}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50"
                                >
                                    キャンセル
                                </button>
                                <button
                                    onClick={handleSaveCreate}
                                    disabled={isCreating}
                                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                                >
                                    {isCreating ? '作成中...' : '作成'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={handleCancelDelete}
                onConfirm={handleConfirmDelete}
                title="削除確認"
                message={`ユーザー "${deletingUser?.name || deletingUser?.email}" を削除しますか？この操作は取り消せません。`}
                confirmText="削除"
                isLoading={isDeleting}
            />
        </DashboardLayout>
    );
}
