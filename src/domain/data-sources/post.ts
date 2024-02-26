import { CreatePostDTO } from "../dto/post/create";
import { GetByCategoriesDTO } from "../dto/post/get-by-categories";
import { PostEntity } from "../entity/post";
import { UserEntity } from "../entity/user";

export abstract class PostDataSource {
    public abstract create(dto: CreatePostDTO, user: UserEntity): Promise<PostEntity>;
    public abstract getPosts(dto: GetByCategoriesDTO): Promise<PostEntity[]>;
}