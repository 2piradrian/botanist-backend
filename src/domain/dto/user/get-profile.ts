import { ErrorType } from "../../error/error-types";

export class GetProfileDTO {
    private constructor(
        public readonly profile: string,
        public readonly userId: string,
        public readonly includePosts: boolean,
    ){}

    public static create(data: {[key: string]: any}): [string?, GetProfileDTO?] {
        const { profile, userId, includePosts } = data;

        console.log(data);

        if (!profile || !userId || includePosts === undefined) {
            return [ErrorType.MissingFields];
        }

        for (const key in data) {
            if (typeof data[key] === 'string') {
                data[key].trim();
                if (data[key].length === 0) {
                    return [ErrorType.InvalidFields];
                }
            }
            else{
                return [ErrorType.InvalidFields];
            }
        
        }

        const include = Boolean(includePosts) || false;
        if (typeof include !== 'boolean') {
            return [ErrorType.InvalidFields];
        }

        return [undefined, new GetProfileDTO(profile, userId, include)];
    }
}