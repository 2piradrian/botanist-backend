import { ErrorType } from "../../error/error-types";
import { Checker } from "../../utils/checker";
import { Sanitizer } from "../../utils/sanitizer";

export class LikePostDTO {
    private constructor(
        public readonly postId: string,
        public readonly userId: string
    ){}

    public static create(data: {[key: string]: any}): [string?, LikePostDTO?] {
        Sanitizer.trim(data);

        if (!Checker.isString([data.postId, data.userId])) {
            return [ErrorType.MissingFields];
        }

        return [undefined, new LikePostDTO(data.postId, data.userId)];
    }
}