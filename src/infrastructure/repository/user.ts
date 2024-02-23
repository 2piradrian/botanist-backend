import { UserRepository } from "../../domain";
import { MongoUserDataSource } from "../data-sources/user";

export class UserRepository_I implements UserRepository {

    private dataSource: MongoUserDataSource;

    constructor() {
        this.dataSource = new MongoUserDataSource();
    }

    public addPost(postId: string, userId: string): Promise<void> {
        return this.dataSource.addPost(postId, userId);
    }
}