import { Sanitizer, TypeChecker, Validator } from "../../../config";
import { ErrorType } from "../../error/error-types";

export class LoginUserDTO {
    private constructor(
        public email: string,
        public password: string,
    ){}

    static create(data: {[key: string]: any}): [string?, LoginUserDTO?] {
        Sanitizer.trimStrings(data);

        if (!TypeChecker.areStrings([data.email, data.password])) {
            return [ErrorType.MissingFields];
        }

        if (!Validator.email(data.email)) {
            return [ErrorType.InvalidFields];
        }

        if (!Validator.password(data.password)) {
            return [ErrorType.InvalidFields];
        }

        return [undefined, new LoginUserDTO(data.email, data.password)];
    }
}