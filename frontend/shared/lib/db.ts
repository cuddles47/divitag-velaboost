// Tạo PrismaClient riêng cho frontend
import { PrismaClient } from '@prisma/client'

// Khởi tạo một instance PrismaClient mới
const prismaClientSingleton = () => {
    return new PrismaClient()
}

// Tạo một biến toàn cục để lưu trữ instance PrismaClient 
// Điều này giúp tránh việc tạo nhiều kết nối tới database trong môi trường development
type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClientSingleton | undefined
}

// Sử dụng instance đã tồn tại nếu có, nếu không thì tạo mới
export const db = globalForPrisma.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db