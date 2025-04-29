'use client';

import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function NavBar() {
    const { data: session } = useSession();
    const router = useRouter();

    const handleSignOut = async () => {
        await signOut({ redirect: false });
        router.push('/login');
    };

    return (
        <header className="bg-white shadow-sm">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link href="/" className="text-xl font-bold text-blue-600">
                    BITEX
                </Link>

                <nav className="flex items-center space-x-4">
                    <Link href="/main" className="text-gray-700 hover:text-blue-600">
                        Trang chủ
                    </Link>
                    <Link href="/products" className="text-gray-700 hover:text-blue-600">
                        Sản phẩm
                    </Link>
                    {session?.user ? (
                        <div className="flex items-center space-x-4">
                            {/* Dropdown cho user menu */}
                            <div className="relative group">
                                <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
                                    <span>{session.user.name || session.user.email}</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-1 hidden group-hover:block z-10">
                                    <Link href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                        Tài khoản của tôi
                                    </Link>
                                    <Link href="/orders" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                        Đơn hàng
                                    </Link>
                                    <button
                                        onClick={handleSignOut}
                                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                    >
                                        Đăng xuất
                                    </button>
                                </div>
                            </div>
                            <Link href="/cart" className="text-gray-700 hover:text-blue-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </Link>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-4">
                            <Link href="/login" className="text-gray-700 hover:text-blue-600">
                                Đăng nhập
                            </Link>
                            <Link href="/register" className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                                Đăng ký
                            </Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
}