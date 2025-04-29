import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt, { SignOptions } from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { BadRequestError, UnauthenticatedError, NotFoundError } from './errors.js';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'anaxagoras'; // Sử dụng giá trị từ môi trường hoặc giá trị mặc định
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export class AuthController {
    // Đăng ký người dùng mới
    public static async register(req: Request, res: Response): Promise<void> {
        const { name, email, password } = req.body;

        // Kiểm tra các trường bắt buộc
        if (!name || !email || !password) {
            throw new BadRequestError('Vui lòng cung cấp name, email và password');
        }

        // Kiểm tra email đã tồn tại chưa
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            throw new BadRequestError('Email đã được sử dụng');
        }

        // Hash mật khẩu
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Tạo người dùng mới
        const user = await prisma.user.create({
            data: {
                name,
                email,
                hashedPassword
            }
        });

        // Tạo token JWT
        const token = jwt.sign(
            { userId: user.id, name: user.name, email: user.email },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN as any }
        );

        // Trả về thông tin người dùng và token
        res.status(201).json({
            success: true,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            },
            token
        });
    }

    // Đăng nhập
    public static async login(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;

        // Thêm log để debug
        console.log(`Đang cố gắng đăng nhập với email: ${email}`);

        // Kiểm tra các trường bắt buộc
        if (!email || !password) {
            throw new BadRequestError('Vui lòng cung cấp email và password');
        }

        // Chuẩn hóa email (xóa khoảng trắng và chuyển sang chữ thường)
        const normalizedEmail = email.trim().toLowerCase();
        console.log(`Email sau khi chuẩn hóa: ${normalizedEmail}`);

        try {
            // Tìm tất cả người dùng để debug
            const allUsers = await prisma.user.findMany({
                select: {
                    id: true,
                    email: true,
                    name: true
                }
            });
            console.log('Danh sách người dùng trong database:', allUsers);

            // Tìm người dùng theo email sử dụng regex để không phân biệt chữ hoa/thường
            const user = await prisma.user.findFirst({
                where: {
                    email: {
                        mode: 'insensitive', // Không phân biệt chữ hoa/thường
                        equals: normalizedEmail
                    }
                }
            });

            if (!user) {
                console.log(`Không tìm thấy người dùng với email: ${normalizedEmail}`);
                throw new NotFoundError('Không tìm thấy người dùng với email này');
            }

            console.log(`Tìm thấy người dùng: ${user.id} - ${user.email}`);

            // Kiểm tra mật khẩu
            if (!user.hashedPassword) {
                throw new UnauthenticatedError('Người dùng không có mật khẩu');
            }

            const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);

            if (!isPasswordValid) {
                throw new UnauthenticatedError('Mật khẩu không chính xác');
            }

            // Tạo token JWT
            const token = jwt.sign(
                { userId: user.id, name: user.name, email: user.email },
                JWT_SECRET,
                { expiresIn: JWT_EXPIRES_IN as any }
            );

            // Trả về thông tin người dùng và token
            res.status(200).json({
                success: true,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                },
                token
            });
        } catch (error) {
            if (error instanceof NotFoundError || error instanceof UnauthenticatedError || error instanceof BadRequestError) {
                throw error;
            }
            console.error('Lỗi khi đăng nhập:', error);
            throw new BadRequestError('Đã xảy ra lỗi trong quá trình xác thực');
        }
    }

    // Lấy thông tin người dùng hiện tại
    public static async getCurrentUser(req: Request, res: Response): Promise<void> {
        // Thông tin người dùng được đính kèm trong request bởi middleware auth
        const user = await prisma.user.findUnique({
            where: { id: req.user?.userId }
        });

        if (!user) {
            throw new NotFoundError('Không tìm thấy người dùng');
        }

        res.status(200).json({
            success: true,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    }

    // Cập nhật thông tin người dùng
    public static async updateUserProfile(req: Request, res: Response): Promise<void> {
        const { name } = req.body;
        const userId = req.user?.userId;

        if (!userId) {
            throw new UnauthenticatedError('Không tìm thấy thông tin xác thực');
        }

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { name }
        });

        res.status(200).json({
            success: true,
            user: {
                id: updatedUser.id,
                name: updatedUser.name,
                email: updatedUser.email
            }
        });
    }

    // Đổi mật khẩu
    public static async changePassword(req: Request, res: Response): Promise<void> {
        const { currentPassword, newPassword } = req.body;
        const userId = req.user?.userId;

        if (!userId || !currentPassword || !newPassword) {
            throw new BadRequestError('Thiếu thông tin cần thiết');
        }

        // Tìm người dùng hiện tại
        const user = await prisma.user.findUnique({
            where: { id: userId }
        });

        if (!user || !user.hashedPassword) {
            throw new NotFoundError('Không tìm thấy người dùng');
        }

        // Kiểm tra mật khẩu hiện tại
        const isPasswordValid = await bcrypt.compare(currentPassword, user.hashedPassword);

        if (!isPasswordValid) {
            throw new UnauthenticatedError('Mật khẩu hiện tại không chính xác');
        }

        // Hash mật khẩu mới
        const salt = await bcrypt.genSalt(10);
        const newHashedPassword = await bcrypt.hash(newPassword, salt);

        // Cập nhật mật khẩu mới
        await prisma.user.update({
            where: { id: userId },
            data: { hashedPassword: newHashedPassword }
        });

        res.status(200).json({
            success: true,
            message: 'Mật khẩu đã được cập nhật thành công'
        });
    }
}