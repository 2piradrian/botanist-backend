import { Sanitizer, TypeChecker } from "../../../config";
import { ErrorType } from "../../error/error-types";

export class FollowUserDTO {
    private constructor(
        public readonly followedId: string,
        public readonly userId: string
    ){}

    public static create(data: {[key: string]: any}): [string?, FollowUserDTO?] {
        Sanitizer.trimStrings(data);

        if (!TypeChecker.areStrings([data.followedId, data.userId])) {
            return [ErrorType.MissingFields];
        }

        return [undefined, new FollowUserDTO(data.followedId, data.userId)];
    }
}