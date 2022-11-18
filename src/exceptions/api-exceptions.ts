import { HttpException, HttpStatus } from "@nestjs/common";

export class ApiExceptions extends HttpException {
    constructor(message: string, status: HttpStatus) {
        super(message, status)
    }

    static BadRequest(message: string = 'Bad request'): ApiExceptions {
        return new ApiExceptions(message, HttpStatus.BAD_REQUEST)
    }

    static NotFound(message: string = 'Not found'): ApiExceptions {
        return new ApiExceptions(message, HttpStatus.NOT_FOUND)
    }
}
