import { RegisterUserDTO } from "../dto/auth/register";
import { UserEntity } from "../entity/user";

export abstract class UserDataSource {
    public abstract getByEmail(email: string): Promise<UserEntity | undefined>;
    public abstract getById(id: string): Promise<UserEntity | undefined>;
    public abstract getByUsername(username: string): Promise<UserEntity | undefined>;
    public abstract create(dto: RegisterUserDTO): Promise<UserEntity>;
    public abstract update(user: UserEntity): Promise<void>;
    public abstract delete(email: string): Promise<void>;
}