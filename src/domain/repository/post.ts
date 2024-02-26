import { CreatePostDTO } from "../dto/post/create";
import { GetByCategoriesDTO } from "../dto/post/get-by-categories";
import { PostEntity } from "../entity/post";

export abstract class PostRepository {
    public abstract create(dto: CreatePostDTO, imageName: string): Promise<PostEntity>;
    public abstract getPosts(dto: GetByCategoriesDTO): Promise<PostEntity[]>;
}