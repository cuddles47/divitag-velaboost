// filepath: d:\projects\divitag-velaboost\frontend\shared\lib\authOptions.ts
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

// Add type augmentation for NextAuth session
declare module "next-auth" {
    interface User {
        token?: string;
    }

    interface Session {
        user: {
            id: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
            token?: string;
        }
    }
}

// Add type augmentation for JWT
declare module "next-auth/jwt" {
    interface JWT {
        id?: string;
        token?: string;
    }
}

// Get the backend API URL from environment variable
const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "email", type: "text" },
                password: { label: "password", type: "password" },
            },
            async authorize(credentials, req) {
                if (!credentials?.email || !credentials?.password) {
                    console.log("Error: Email or password is empty");
                    throw new Error("Vui lòng nhập email và mật khẩu");
                }

                console.log(`Trying to authenticate with email: ${credentials.email}`);
                console.log(`API URL: ${apiUrl}/auth/login`);

                try {
                    // Gọi API đăng nhập từ backend
                    const response = await axios.post(`${apiUrl}/auth/login`, {
                        email: credentials.email,
                        password: credentials.password
                    });

                    const data = response.data;
                    console.log("Auth response:", data);

                    // Check if the response contains user data directly without checking 'success' field
                    // API may return data in different structure
                    if (!data || (!data.user && !data.id)) {
                        console.log("Error: Authentication failed - Invalid response structure", data);
                        throw new Error("Xác thực thất bại");
                    }

                    // Handle different API response structures
                    const user = data.user || data;
                    const token = data.token || data.accessToken || '';

                    // Return user with proper structure
                    return {
                        id: user.id,
                        name: user.name || user.fullName || user.username || '',
                        email: user.email,
                        token: token
                    };
                } catch (error: any) {
                    // Cải thiện xử lý lỗi để cung cấp thông báo rõ ràng hơn
                    console.error("Error during authentication:", error);

                    if (axios.isAxiosError(error)) {
                        // Lỗi từ Axios (HTTP errors)
                        const status = error.response?.status;
                        const errorMessage = error.response?.data?.message || error.message;

                        console.log(`Authentication error - Status: ${status}, Message: ${errorMessage}`);

                        if (status === 404) {
                            throw new Error("Không tìm thấy tài khoản với email này");
                        } else if (status === 401) {
                            throw new Error("Email hoặc mật khẩu không chính xác");
                        } else if (status === 400) {
                            throw new Error(errorMessage || "Dữ liệu đăng nhập không hợp lệ");
                        } else {
                            throw new Error(`Lỗi kết nối đến máy chủ: ${errorMessage}`);
                        }
                    }

                    // Lỗi khác không phải từ Axios
                    throw new Error(`Lỗi xác thực: ${error.message || "không xác định"}`);
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
        maxAge: 7 * 24 * 60 * 60, // 7 days
    },
    secret: process.env.NEXTAUTH_SECRET || "anaxagoras",
    pages: {
        signIn: "/login",
        error: "/login"
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.token = user.token;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user && token) {
                session.user.id = token.id as string;
                session.user.token = token.token as string;
            }
            return session;
        }
    },
    debug: process.env.NODE_ENV !== "production", // Only enable debug mode in non-production
    // Vô hiệu hóa kiểm tra CSRF nghiêm ngặt cho môi trường development
    cookies: {
        csrfToken: {
            name: "next-auth.csrf-token",
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: process.env.NODE_ENV === "production"
            }
        }
    }
}