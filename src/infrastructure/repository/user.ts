import { RegisterUserDTO, UserEntity, UserRepository } from "../../domain";
import { MongoUserDataSource } from "../data-sources/user";

export class UserRepository_I implements UserRepository {

    private dataSource: MongoUserDataSource;

    constructor() {
        this.dataSource = new MongoUserDataSource();
    }

    public addPost(postId: string, userId: string): Promise<void> {
        return this.dataSource.addPost(postId, userId);
    }

    public create(dto: RegisterUserDTO): Promise<UserEntity> {
        return this.dataSource.create(dto);
    }

    public delete(email: string): Promise<void> {
        return this.dataSource.delete(email);
    }

    public getByEmail(email: string): Promise<UserEntity | undefined> {
        return this.dataSource.getByEmail(email);
    }

    public getUserById(id: string): Promise<UserEntity | undefined> {
        return this.dataSource.getUserById(id);
    }

}