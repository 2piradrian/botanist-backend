import { RegisterUserDTO } from "../dto/auth/register";
import { UserEntity } from "../entity/user";

export abstract class UserRepository {
    public abstract addPost(postId: string, userId: string): Promise<void>;
    public abstract getByEmail(email: string): Promise<UserEntity | undefined>;
    public abstract getUserById(id: string): Promise<UserEntity | undefined>;
    public abstract create(dto: RegisterUserDTO): Promise<UserEntity>;
    public abstract delete(email: string): Promise<void>;
}