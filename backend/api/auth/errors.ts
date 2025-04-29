// Base error class
export class HttpException extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, HttpException.prototype);
    }
}

// Bad Request - 400
export class BadRequestError extends HttpException {
    constructor(message: string = 'Bad Request') {
        super(message, 400);
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
}

// Unauthorized - 401
export class UnauthenticatedError extends HttpException {
    constructor(message: string = 'Authentication Invalid') {
        super(message, 401);
        Object.setPrototypeOf(this, UnauthenticatedError.prototype);
    }
}

// Not Found - 404
export class NotFoundError extends HttpException {
    constructor(message: string = 'Resource not found') {
        super(message, 404);
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}