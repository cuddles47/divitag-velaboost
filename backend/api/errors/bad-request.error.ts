import { HttpException } from './http-exception.error.js';

export class BadRequestError extends HttpException {
    constructor(message: string = 'Bad Request') {
        super(message, 400);
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
}