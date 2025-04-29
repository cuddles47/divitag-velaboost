'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import NavBar from '@/components/UI/NavBar';
import { Spinner } from '@/components/UI/Spinner';
import { AuthGuard } from '@/components/UI/AuthGuard';
import { api } from '@/shared/lib/apiClient';

export default function ProfilePage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const loading = status === 'loading';

    const [isUpdating, setIsUpdating] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState({
        name: session?.user?.name || '',
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsUpdating(true);
        setSuccessMessage('');
        setErrorMessage('');

        try {
            // Cập nhật chỉ tên người dùng nếu không nhập mật khẩu
            if (!formData.currentPassword && !formData.newPassword && !formData.confirmNewPassword) {
                await api.put('/auth/me', {
                    name: formData.name,
                });

                setSuccessMessage('Thông tin tài khoản đã được cập nhật thành công!');
            }
            // Cập nhật mật khẩu
            else if (formData.currentPassword && formData.newPassword && formData.confirmNewPassword) {
                if (formData.newPassword !== formData.confirmNewPassword) {
                    setErrorMessage('Mật khẩu mới không khớp.');
                    setIsUpdating(false);
                    return;
                }

                await api.put('/auth/change-password', {
                    currentPassword: formData.currentPassword,
                    newPassword: formData.newPassword,
                });

                setSuccessMessage('Mật khẩu đã được cập nhật thành công!');
                setFormData(prev => ({
                    ...prev,
                    currentPassword: '',
                    newPassword: '',
                    confirmNewPassword: '',
                }));
            }
            else {
                setErrorMessage('Vui lòng nhập đầy đủ thông tin mật khẩu.');
            }
        } catch (error: any) {
            setErrorMessage(error?.response?.data?.message || 'Đã xảy ra lỗi khi cập nhật thông tin.');
        } finally {
            setIsUpdating(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Spinner size="lg" />
            </div>
        );
    }

    return (
        <AuthGuard>
            <div className="min-h-screen bg-gray-100">
                <NavBar />

                <div className="container mx-auto px-4 py-8">
                    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
                        <h1 className="text-2xl font-bold mb-6">Thông tin tài khoản</h1>

                        {successMessage && (
                            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
                                {successMessage}
                            </div>
                        )}

                        {errorMessage && (
                            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                                {errorMessage}
                            </div>
                        )}

                        <form onSubmit={handleUpdateProfile} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={session?.user?.email || ''}
                                    readOnly
                                    className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded cursor-not-allowed"
                                />
                                <p className="mt-1 text-sm text-gray-500">Email không thể thay đổi</p>
                            </div>

                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                    Họ tên
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="border-t border-gray-200 pt-6">
                                <h2 className="text-xl font-semibold mb-4">Thay đổi mật khẩu</h2>

                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                            Mật khẩu hiện tại
                                        </label>
                                        <input
                                            id="currentPassword"
                                            name="currentPassword"
                                            type="password"
                                            value={formData.currentPassword}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                            Mật khẩu mới
                                        </label>
                                        <input
                                            id="newPassword"
                                            name="newPassword"
                                            type="password"
                                            value={formData.newPassword}
                                            onChange={handleChange}
                                            minLength={6}
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                            Xác nhận mật khẩu mới
                                        </label>
                                        <input
                                            id="confirmNewPassword"
                                            name="confirmNewPassword"
                                            type="password"
                                            value={formData.confirmNewPassword}
                                            onChange={handleChange}
                                            minLength={6}
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={isUpdating}
                                    className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                                >
                                    {isUpdating ? (
                                        <span className="flex items-center justify-center">
                                            <Spinner size="sm" className="mr-2" /> Đang cập nhật...
                                        </span>
                                    ) : (
                                        'Cập nhật thông tin'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthGuard>
    );
}