import { ErrorType } from "../../error/error-types";

export class GetFeedDTO {
    private constructor(
        public userId: string,
        public page: number,
        public pageSize: number,
    ){}

    public static create(data: {[key: string]: any}): [string?, GetFeedDTO?] {
        const { userId, page, pageSize } = data;

        if (!userId || page === undefined || pageSize === undefined) {
            return [ErrorType.MissingFields];
        }

        if (typeof userId !== 'string') {
            return [ErrorType.InvalidFields];
        }

        if (typeof page !== 'number' || typeof pageSize !== 'number') {
            return [ErrorType.InvalidFields];
        }

        return [undefined, new GetFeedDTO(userId, page, pageSize)];
    }
}