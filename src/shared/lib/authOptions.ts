import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { User } from "@prisma/client";
import { JWT } from "next-auth/jwt";

import { db } from "./db";

// Log the NextAuth secret status
console.log(`NextAuth Secret Status: ${process.env.NEXTAUTH_SECRET ? "Configured" : "Missing"}`);

// Add type augmentation for NextAuth session
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    }
  }
}

// Add type augmentation for JWT
declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        console.log("=== Đăng nhập: Dữ liệu đầu vào ===");
        console.log(`Email: ${credentials?.email}`);
        console.log(`Password: ${credentials?.password ? "[ĐÃ NHẬP]" : "[TRỐNG]"}`);

        if (!credentials?.email || !credentials?.password) {
          console.log("Lỗi: Email hoặc mật khẩu trống");
          throw new Error("Invalid credentials");
        }

        try {
          console.log("Tìm kiếm user trong database...");
          const user = await db.user.findUnique({
            where: {
              email: credentials.email,
            },
          });

          console.log(`Kết quả tìm kiếm: ${user ? "Tìm thấy user" : "Không tìm thấy user"}`);

          if (!user || !user?.hashedPassword) {
            console.log("Lỗi: User không tồn tại hoặc chưa có mật khẩu");
            throw new Error("Invalid credentials");
          }

          console.log("Đang so sánh mật khẩu...");
          console.log(`Input password: ${credentials.password?.substring(0, 3)}***`);
          console.log(`Stored hashed password: ${user.hashedPassword.substring(0, 10)}***`);

          const isPasswordValid = await bcrypt.compare(credentials.password, user.hashedPassword);
          console.log(`Kết quả so sánh mật khẩu: ${isPasswordValid ? "Đúng" : "Sai"}`);

          if (!isPasswordValid) {
            console.log("Lỗi: Mật khẩu không đúng");
            throw new Error("Invalid credentials");
          }

          console.log("=== Đăng nhập thành công ===");
          return user;
        } catch (error) {
          console.error("Error during authentication:", error);
          throw new Error("Authentication error");
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  callbacks: {
    async jwt({ token, user }) {
      console.log("JWT Callback - Token:", token ? "exists" : "missing");
      console.log("JWT Callback - User:", user ? "exists" : "missing");
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      console.log("Session Callback - Session:", session ? "exists" : "missing");
      console.log("Session Callback - Token:", token ? "exists" : "missing");
      if (session.user && token) {
        session.user.id = token.id as string;
      }
      return session;
    }
  },
  pages: {
    signIn: "/login",
    error: "/login"
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "none",
        path: "/",
        secure: true,
      },
    },
  },
};
