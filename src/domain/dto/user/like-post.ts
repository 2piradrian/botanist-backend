import { ErrorType } from "../../error/error-types";

export class LikePostDTO {
    private constructor(
        public readonly postId: string,
        public readonly userId: string
    ){}

    public static create(data: {[key: string]: any}): [string?, LikePostDTO?] {
        const { postId, userId } = data;

        if (!postId || !userId) {
            return [ErrorType.MissingFields];
        }

        for (const key in data) {
            if (typeof data[key] !== 'string') {
                return [ErrorType.InvalidFields];
            }
            data[key].trim();
            if (data[key].length === 0) {
                return [ErrorType.InvalidFields];
            }
        }

        return [undefined, new LikePostDTO(postId, userId)];
    }
}