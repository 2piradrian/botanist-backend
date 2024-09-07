import { ErrorType } from "../../error/error-types";
import { Checker } from "../../utils/checker";
import { Sanitizer } from "../../utils/sanitizer";

export class FollowUserDTO {
    private constructor(
        public readonly followedId: string,
        public readonly userId: string
    ){}

    public static create(data: {[key: string]: any}): [string?, FollowUserDTO?] {
        Sanitizer.trim(data);

        if (!Checker.isString([data.followedId, data.userId])) {
            return [ErrorType.MissingFields];
        }

        return [undefined, new FollowUserDTO(data.followedId, data.userId)];
    }
}