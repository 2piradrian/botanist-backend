export class UserEntity {

    private constructor(
        public id: string,
        public username: string,
        public email: string,
        public password: string,
        public createdAt: Date,
        public posts: string[] = [],
        public followers: string[] = [],
        public following: string[] = [],
        public likes: string[] = []
    ){}

    static fromObject(object: {[key: string]: any}): UserEntity {
        const { _id, id, username, email, password, createdAt, posts, followers, following, likes} = object;

        return new UserEntity(
            _id || id,
            username,
            email,
            password,
            createdAt,
            posts,
            followers,
            following,
            likes
        );
    }
}