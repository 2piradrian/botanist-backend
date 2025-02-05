import { NextFunction, Request, Response } from "express";
import { ErrorHandler, ErrorType } from "../../domain";
import { TokenAdapter } from "../../config";

export class AuthValidator {

    static async checkToken(req: Request, res: Response, next: NextFunction) {
		try {
			const header = req.headers.authorization;
			if (!header) {
				throw ErrorHandler.badRequest(ErrorType.MissingFields);
			}
			const token = header.split(" ")[1];
			if (!token) {
				throw ErrorHandler.badRequest(ErrorType.MissingFields);
			}
			const data = await TokenAdapter.verify(token);
			if (data) {
				(req as any).body.userId = (data as any).id;
				return next();
			}
			throw ErrorHandler.badRequest(ErrorType.Unauthorized);
		} catch (error: any) {
			return res.status(500).json({ error: ErrorType.Unauthorized });
		}
    }

}