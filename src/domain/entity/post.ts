import { env } from "../../config";

export class PostEntity {
    private constructor(
        public id: string,
        public title: string,
        public description: string,
        public category: string,
        public image: string,
        public content: string,
        public createdAt: Date,
        public likedBy: string[] = [],
        public authorId: string,
        public authorUsername: string
    ){}

    static fromObject(object: {[key: string]: any}): PostEntity {
        const { _id, id, title, description, category, image, content, createdAt, likedBy, authorId, authorUsername} = object;

        let imageRoute = env.API_URL + env.IMAGES_PATH + image;

        return new PostEntity(
            _id || id,
            title,
            description,
            category,
            imageRoute,
            content,
            createdAt,
            likedBy,
            authorId,
            authorUsername
        );
    }
}