import { ErrorType } from "../../error/error-types";
import { Checker } from "../../utils/checker";
import { Sanitizer } from "../../utils/sanitizer";

export class DeletePostDTO {
    private constructor(
        public userId: string,
        public postId: string
    ){}

    static create(data: {[key: string]: any}): [string?, DeletePostDTO?] {
        Sanitizer.trim(data);

        if(!Checker.isString([data.userId, data.postId])) {
            return [ErrorType.MissingFields];
        }

        return [undefined, new DeletePostDTO(data.userId, data.postId)];
    }
}