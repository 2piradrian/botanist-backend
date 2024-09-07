import { ErrorType } from "../../error/error-types";
import { Checker } from "../../utils/checker";
import { Sanitizer } from "../../utils/sanitizer";

export class GetProfileDTO {
    private constructor(
        public readonly profile: string,
        public readonly userId: string,
        public readonly includePosts: boolean,
    ){}

    public static create(data: {[key: string]: any}): [string?, GetProfileDTO?] {
        Sanitizer.trim(data);

        if (!Checker.isString([data.profile, data.userId])) {
            return [ErrorType.InvalidFields];
        }

        const include = Boolean(data.includePosts) || false;
        if (typeof include !== 'boolean') {
            return [ErrorType.InvalidFields];
        }

        return [undefined, new GetProfileDTO(data.profile, data.userId, include)];
    }
}