import { RegisterUserDTO, UserEntity, UserRepository } from "../../domain";
import { MongoUserDataSource } from "../data-sources/user";

export class UserRepository_I implements UserRepository {

    private dataSource: MongoUserDataSource;

    constructor() {
        this.dataSource = new MongoUserDataSource();
    }

    public create(dto: RegisterUserDTO): Promise<UserEntity> {
        return this.dataSource.create(dto);
    }

    public update(user: UserEntity): Promise<void> {
        return this.dataSource.update(user);
    }

    public delete(email: string): Promise<void> {
        return this.dataSource.delete(email);
    }

    public getByEmail(email: string): Promise<UserEntity | undefined> {
        return this.dataSource.getByEmail(email);
    }

    public getByUsername(username: string): Promise<UserEntity | undefined> {
        return this.dataSource.getByUsername(username);
    }

    public getById(id: string): Promise<UserEntity | undefined> {
        return this.dataSource.getById(id);
    }

}