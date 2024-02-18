import { ErrorType } from "../../error/error-types";

export class CreatePostDTO {
    private constructor(
        public title: string,
        public description: string,
        public category: string,
        public image: string,
        public content: string,
    ){}

    static create(data: {[key: string]: any}): [string?, CreatePostDTO?] {
        const { title, description, category, image, content } = data;

        if (!title || !description || !category || !image || !content) {
            return [ErrorType.MissingFields];
        }

        return [undefined, new CreatePostDTO(title, description, category, image, content)];
    }
}