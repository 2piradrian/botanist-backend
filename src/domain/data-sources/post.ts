import { CreatePostDTO } from "../dto/post/create";
import { PostEntity } from "../entity/post";

export abstract class PostDataSource {
    public abstract create(dto: CreatePostDTO, imageName: string): Promise<PostEntity>;
}