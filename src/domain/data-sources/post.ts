import { CreatePostDTO } from "../dto/post/create";
import { GetByCategoriesDTO } from "../dto/post/get-by-categories";
import { PostEntity } from "../entity/post";
import { UserEntity } from "../entity/user";

export abstract class PostDataSource {
    public abstract getById(id: string): Promise<PostEntity | undefined>;
    public abstract getByIds(ids: string[]): Promise<PostEntity[]>;
    public abstract getByUserIds(ids: string[]): Promise<PostEntity[]>;
    public abstract create(dto: CreatePostDTO, user: UserEntity): Promise<PostEntity>;
    public abstract getByCategories(dto: GetByCategoriesDTO): Promise<PostEntity[]>;
    public abstract update(post: PostEntity): Promise<void>;
    public abstract delete(post: PostEntity): Promise<void>;
}