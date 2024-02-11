import { Response } from "express";
export class ErrorHandler extends Error {

    constructor(
        public readonly statusCode: number,
        public readonly message: string
    ) {
        super(message);
    }

    static handle = (error: unknown, res: Response ) => {
        console.log(error);

        if ( error instanceof ErrorHandler ) {
            return res.status(error.statusCode).json({ error: error.message });
        }       
        return res.status(500).json({ error: 'Internal server error' })
    }

    static badRequest = (message: string) => {
        return new ErrorHandler(400, message);
    }

    static notFound = (message: string) => {
        return new ErrorHandler(404, message);
    }

    static conflict = (message: string) => {
        return new ErrorHandler(409, message);
    }

    static unauthorized = (message: string) => {
        return new ErrorHandler(401, message);
    }

    static forbidden = (message: string) => {
        return new ErrorHandler(403, message);
    }

    static internal = (message: string) => {
        return new ErrorHandler(500, message);
    }
}