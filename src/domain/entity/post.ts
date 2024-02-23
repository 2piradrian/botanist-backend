export class PostEntity {
    private constructor(
        public id: string,
        public title: string,
        public description: string,
        public category: string,
        public image: string,
        public content: string,
        public createdAt: Date,
        public likedBy: string[] = []
    ){}

    static fromObject(object: {[key: string]: any}): PostEntity {
        const { _id, id, title, description, category, image, content, createdAt, likedBy} = object;

        return new PostEntity(
            _id || id,
            title,
            description,
            category,
            image,
            content,
            createdAt,
            likedBy
        );
    }
}