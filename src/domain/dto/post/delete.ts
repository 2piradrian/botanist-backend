import { ErrorType } from "../../error/error-types";

export class DeletePostDTO {
    private constructor(
        public userId: string,
        public postId: string
    ){}

    static create(data: {[key: string]: any}): [string?, DeletePostDTO?] {
        const { userId, postId } = data;

        if (!userId || !postId) {
            return [ErrorType.MissingFields];
        }

        for (const key in data) {
            if (typeof data[key] !== 'string') {
                return [ErrorType.InvalidFields];
            }
            data[key] = data[key].trim();
        }

        return [undefined, new DeletePostDTO(userId, postId)];
    }
}