"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const StoreNavBar = () => {
    const pathname = usePathname();

    return (
        <nav className="bg-white shadow-md py-4">
            <div className="container mx-auto px-4 flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold text-gray-800">BITEX</Link>

                <div className="hidden md:flex space-x-6">
                    <Link
                        href="/main"
                        className={`font-medium ${pathname === '/main' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-500'}`}
                    >
                        Home
                    </Link>
                    <Link
                        href="/main/products"
                        className={`font-medium ${pathname.startsWith('/main/products') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-500'}`}
                    >
                        Products
                    </Link>
                    <Link
                        href="/main/categories"
                        className={`font-medium ${pathname.startsWith('/main/categories') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-500'}`}
                    >
                        Categories
                    </Link>
                </div>

                <div className="flex items-center space-x-4">
                    <Link href="/main/cart" className="relative">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 hover:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span className="absolute -top-1 -right-1 bg-blue-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">0</span>
                    </Link>

                    <Link href="/auth/login" className="text-gray-600 hover:text-blue-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default StoreNavBar;