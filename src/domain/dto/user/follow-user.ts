import { ErrorType } from "../../error/error-types";

export class FollowUserDTO {

    private constructor(
        public readonly followedId: string,
        public readonly userId: string
    ){}

    public static create(data: {[key: string]: any}): [string?, FollowUserDTO?] {
        const { followedId, userId } = data;

        if (!followedId || !userId) {
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

        return [undefined, new FollowUserDTO(followedId, userId)];
    }
}