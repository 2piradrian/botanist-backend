import { Sanitizer, TypeChecker } from "../../../config";
import { ErrorType } from "../../error/error-types";

export class DeletePostDTO {
    private constructor(
        public userId: string,
        public postId: string
    ){}

    static create(data: {[key: string]: any}): [string?, DeletePostDTO?] {
        Sanitizer.trimStrings(data);

        if(!TypeChecker.areStrings([data.userId, data.postId])) {
            return [ErrorType.MissingFields];
        }

        return [undefined, new DeletePostDTO(data.userId, data.postId)];
    }
}