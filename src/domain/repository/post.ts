import { CreatePostDTO } from "../dto/post/create";
import { PostEntity } from "../entity/post";

export abstract class PostRepository {
    public abstract create(dto: CreatePostDTO, imageName: string): Promise<PostEntity>;
    public abstract getPosts(): Promise<PostEntity[]>;
}