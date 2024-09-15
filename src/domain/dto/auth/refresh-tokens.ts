import { Sanitizer, TypeChecker } from "../../../config";
import { ErrorType } from "../../error/error-types";

export class RefreshTokenDTO {
    private constructor(
        public readonly refreshToken: string,
    ){}

    static create(data: {[key: string]: any}): [string?, RefreshTokenDTO?] {
        Sanitizer.trimStrings(data);

        if (!TypeChecker.areStrings(data.refreshToken)) {
            return [ErrorType.MissingFields];
        }

        if (!data.refreshToken) {
            return [ErrorType.MissingFields];
        }

        if (typeof data.refreshToken !== 'string') {
            return [ErrorType.InvalidFields];
        }

        if (data.refreshToken.length < 1 || data.refreshToken.length > 512) {
            return [ErrorType.InvalidFields];
        }

        return [null!, new RefreshTokenDTO(data.refreshToken)];
    }
}