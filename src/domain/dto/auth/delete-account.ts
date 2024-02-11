import { ErrorType } from "../../error/error-types";
import { Validator } from "../../validator/validator";

export class DeleteAccountDTO {
    private constructor(
        public email: string,
        public password: string,
    ){}

    static create(data: {[key: string]: any}): [string?, DeleteAccountDTO?] {
        const { email, password } = data;

        if (!email || !password) {
            return [ErrorType.MissingFields];
        }

        if (!Validator.email(email)) {
            return [ErrorType.InvalidFields];
        }

        if (!Validator.password(password)) {
            return [ErrorType.InvalidFields];
        }

        return [undefined, new DeleteAccountDTO(email, password)];
    }
}