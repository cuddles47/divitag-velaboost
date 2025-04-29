import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Các path không yêu cầu xác thực
const publicPaths = [
    '/login',
    '/register',
    '/api/auth',
    '/full-page',
    '/main',
    '/'
];

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Kiểm tra xem path hiện tại có phải là public không
    const isPublicPath = publicPaths.some(path =>
        pathname === path || pathname.startsWith(path + '/') || pathname.startsWith('/api/')
    );

    // Nếu là path công khai, cho phép truy cập
    if (isPublicPath) {
        return NextResponse.next();
    }

    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET
    });

    // Nếu không có token và đang cố truy cập trang được bảo vệ, chuyển hướng đến trang đăng nhập
    if (!token) {
        const url = new URL('/login', request.url);
        url.searchParams.set('callbackUrl', encodeURI(request.url));
        return NextResponse.redirect(url);
    }

    // Cho phép truy cập nếu đã xác thực
    return NextResponse.next();
}

export const config = {
    // Áp dụng middleware cho tất cả các route
    matcher: [
        /*
         * Khớp với tất cả các route ngoại trừ:
         * - _next (tài nguyên tĩnh của Next.js)
         * - public (tài nguyên tĩnh của bạn)
         */
        '/((?!_next|public|api/auth).*)',
    ],
};