import { ErrorType } from "../../error/error-types";

export class RefreshTokenDTO {
    private constructor(
        public readonly refreshToken: string,
    ){}

    static create(data: {[key: string]: any}): [string?, RefreshTokenDTO?] {
        const { refreshToken } = data;

        if (!refreshToken) {
            return [ErrorType.MissingFields];
        }

        if (typeof refreshToken !== 'string') {
            return [ErrorType.InvalidFields];
        }

        if (refreshToken.length < 1 || refreshToken.length > 512) {
            return [ErrorType.InvalidFields];
        }

        return [null!, new RefreshTokenDTO(refreshToken)];
    }
}