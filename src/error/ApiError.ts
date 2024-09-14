export class ApiError extends Error {
    status: number
    message: string

    constructor(status: number, message: string) {
        super(message);
        this.status = status
        this.message = message
    }

    static badRequest(message: string) {
        return new ApiError(400, message)
    }

    static unauthorized(message: string) {
        return new ApiError(401, message)
    }

    static conflict(message: string) {
        return new ApiError(409, message)
    }

    static internal(message: string) {
        return new ApiError(500, message)
    }
}