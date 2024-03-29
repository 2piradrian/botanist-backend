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
        const { userId, title, description, category, image, content } = data;

        if (!userId || !title || !description || !category || !image || !content) {
            return [ErrorType.MissingFields];
        }

        for (const key in data) {
            if (typeof data[key] !== 'string') {
                return [ErrorType.InvalidFields];
            }
        }

        for (const key in data) {
            if (typeof data[key] === 'string') {
                data[key] = data[key].trim();

                // Delete \n and \r from the final of the string
                data[key] = data[key].replace(/^[\n\r]+|[\n\r]+$/g, '');


                if (data[key].length === 0) {
                    return [ErrorType.InvalidFields];
                }
            }
        }

        if (title.length < 4) {
            return [ErrorType.InvalidFields];
        }

        if ( description.length < 15) {
            return [ErrorType.InvalidFields];
        }

        if ((Categories as any)[category] === undefined) {
            return [ErrorType.InvalidFields];
        }

        if (content.length < 15) {
            return [ErrorType.InvalidFields];
        }

        return [undefined, new CreatePostDTO(userId, title, description, category, image, content)];
    }
}