import { ErrorType } from "../../error/error-types";
import { Validator } from "../../validator/validator";


export class RegisterUserDTO {
    private constructor(
        public email: string,
        public password: string,
        public username: string,
    ){}

    static create(data: {[key: string]: any}): [string?, RegisterUserDTO?] {
        const { email, password, username } = data;

        console.log(data)

        const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;


        if (!email || !password || !username) {
            return [ErrorType.MissingFields];
        }

        if (!usernameRegex.test(username)) {
            return [ErrorType.InvalidFields];
        }

        if (!Validator.email(email)) {
            return [ErrorType.InvalidFields];
        }

        if (!Validator.password(password)) {
            return [ErrorType.InvalidFields];
        }

        return [undefined, new RegisterUserDTO(email, password, username)];
    }
}