import { Sanitizer, TypeChecker } from "../../../config";
import { Categories } from "../../entity/category";
import { ErrorType } from "../../error/error-types";

export class CreatePostDTO {
    private constructor(
        public userId: string,
        public title: string,
        public description: string,
        public category: string,
        public image: string,
        public content: string,
        public createdAt: Date = new Date()
    ){}

    static create(data: {[key: string]: any}): [string?, CreatePostDTO?] {
        Sanitizer.trimStrings(data);

        if (!TypeChecker.areStrings([data.userId, data.title, data.description, data.category, data.image, data.content])) {
            return [ErrorType.MissingFields];
        }

        if (data.title.length < 4) {
            return [ErrorType.InvalidFields];
        }

        if (data.description.length < 15) {
            return [ErrorType.InvalidFields];
        }

        if (data.content.length < 15) {
            return [ErrorType.InvalidFields];
        }
        
        if ((Categories as any)[data.category] === undefined) {
            return [ErrorType.InvalidFields];
        }

        return [undefined, new CreatePostDTO(data.userId, data.title, data.description, data.category, data.image, data.content)];
    }
}