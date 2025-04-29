import { HttpException } from './http-exception.error.js';

export class UnauthenticatedError extends HttpException {
    constructor(message: string = 'Authentication Invalid') {
        super(message, 401);
        Object.setPrototypeOf(this, UnauthenticatedError.prototype);
    }
}