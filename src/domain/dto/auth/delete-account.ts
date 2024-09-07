import { ErrorType } from "../../error/error-types";
import { Checker } from "../../utils/checker";
import { Sanitizer } from "../../utils/sanitizer";
import { Validator } from "../../utils/validator";

export class DeleteAccountDTO {
    private constructor(
        public email: string,
        public password: string,
    ){}

    static create(data: {[key: string]: any}): [string?, DeleteAccountDTO?] {
        Sanitizer.trim(data);

        if (!Checker.isString([data.email, data.password])) {
            return [ErrorType.MissingFields];
        }

        if (!Validator.email(data.email)) {
            return [ErrorType.InvalidFields];
        }

        if (!Validator.password(data.password)) {
            return [ErrorType.InvalidFields];
        }

        return [undefined, new DeleteAccountDTO(data.email, data.password)];
    }
}