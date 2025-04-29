import React, { ReactNode } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Spinner from './Spinner';

interface AuthGuardProps {
    children: ReactNode;
    allowedRoles?: string[]; // Nếu cần kiểm tra vai trò (role)
}

export const AuthGuard = ({
    children,
    allowedRoles = []
}: AuthGuardProps) => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const isLoading = status === 'loading';
    const isAuthenticated = !!session?.user;

    // Nếu đang loading, hiển thị spinner
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Spinner />
            </div>
        );
    }

    // Nếu chưa xác thực, chuyển hướng đến trang đăng nhập
    if (!isAuthenticated) {
        router.push('/login');
        return null;
    }

    // Nếu cần kiểm tra vai trò và người dùng không có vai trò phù hợp
    if (allowedRoles.length > 0) {
        // Sửa lỗi: role có thể không tồn tại trong user
        const userRole = (session?.user as any)?.role;
        if (!userRole || !allowedRoles.includes(userRole)) {
            router.push('/unauthorized');
            return null;
        }
    }

    // Người dùng đã xác thực và có đủ quyền, hiển thị nội dung
    return <>{children}</>;
};

export default AuthGuard;