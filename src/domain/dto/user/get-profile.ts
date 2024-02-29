import { ErrorType } from "../../error/error-types";

export class GetProfileDTO {
    private constructor(
        public readonly profile: string,
        public readonly userId: string
    ){}

    public static create(data: {[key: string]: any}): [string?, GetProfileDTO?] {
        const { profile, userId } = data;

        if (!profile || !userId) {
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

        return [undefined, new GetProfileDTO(profile, userId)];
    }
}