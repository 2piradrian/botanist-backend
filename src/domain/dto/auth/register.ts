import { Sanitizer, TypeChecker, Validator } from "../../../config";
import { ErrorType } from "../../error/error-types";

export class RegisterUserDTO {
    private constructor(
        public email: string,
        public password: string,
        public username: string,
    ){}

    static create(data: {[key: string]: any}): [string?, RegisterUserDTO?] {
        Sanitizer.trimStrings(data);

        if (!TypeChecker.areStrings([data.email, data.password, data.username])) {
            return [ErrorType.MissingFields];
        }

        if (!Validator.username(data.username)) {
            return [ErrorType.InvalidFields];
        }

        if (!Validator.email(data.email)) {
            return [ErrorType.InvalidFields];
        }

        if (!Validator.password(data.password)) {
            return [ErrorType.InvalidFields];
        }

        return [undefined, new RegisterUserDTO(data.email, data.password, data.username)];
    }
}