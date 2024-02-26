export class UserEntity {

    private constructor(
        public id: string,
        public username: string,
        public email: string,
        public password: string,
        public createdAt: Date,
        public posts: string[] = []

    ){}

    static fromObject(object: {[key: string]: any}): UserEntity {
        const { _id, id, username, email, password, createdAt, posts} = object;

        return new UserEntity(
            _id || id,
            username,
            email,
            password,
            createdAt,
            posts
        );
    }
}