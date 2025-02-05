import { Sanitizer, TypeChecker } from "../../../config";
import { ErrorType } from "../../error/error-types";

export class LikePostDTO {
    private constructor(
        public readonly postId: string,
        public readonly userId: string
    ){}

    public static create(data: {[key: string]: any}): [string?, LikePostDTO?] {
        Sanitizer.trimStrings(data);

        if (!TypeChecker.areStrings([data.postId, data.userId])) {
            return [ErrorType.MissingFields];
        }

        return [undefined, new LikePostDTO(data.postId, data.userId)];
    }
}