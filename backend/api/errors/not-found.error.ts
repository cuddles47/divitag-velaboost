import { HttpException } from './http-exception.error.js';

export class NotFoundError extends HttpException {
    constructor(message: string = 'Resource not found') {
        super(message, 404);
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}