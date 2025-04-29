import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../errors/http-exception.error.js';

export const errorHandlerMiddleware = (
    err: Error | HttpException,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error('Error:', err);

    // Nếu là HttpException đã được định nghĩa
    if (err instanceof HttpException) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
        });
    }

    // Lỗi mặc định nếu không phải HttpException
    return res.status(500).json({
        success: false,
        message: 'Đã xảy ra lỗi trên máy chủ',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};