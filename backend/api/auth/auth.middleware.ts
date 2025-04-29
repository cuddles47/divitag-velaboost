import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthenticatedError } from './errors.js';

// Mở rộng interface Request để thêm thông tin người dùng
declare global {
    namespace Express {
        interface Request {
            user?: {
                userId: string;
                name: string;
                email: string;
            };
        }
    }
}

const JWT_SECRET = process.env.JWT_SECRET || 'anaxagoras';

export const authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    // Lấy token từ header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthenticatedError('Không có token xác thực');
    }

    const token = authHeader.split(' ')[1];

    try {
        // Xác thực token
        const payload = jwt.verify(token, JWT_SECRET) as {
            userId: string;
            name: string;
            email: string;
        };

        // Đính kèm thông tin người dùng vào request
        req.user = payload;
        next();
    } catch (error) {
        throw new UnauthenticatedError('Token không hợp lệ');
    }
};