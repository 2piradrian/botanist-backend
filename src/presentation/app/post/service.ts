import { CreatePostDTO } from "../../../domain";
import { PostRepository_I, UserRepository_I } from "../../../infrastructure";
import { ImageService } from "../../services/image";

export class PostService {

    constructor(
        private readonly UserRepository_I: UserRepository_I,
        private readonly PostRepository_I: PostRepository_I,
        private readonly imageService: ImageService
    ){}

    public async create(dto: CreatePostDTO) {
        try {
            dto.image = await this.imageService.uploadImage(dto.image, dto.title);
            const post = await this.PostRepository_I.create(dto, dto.image);

            await this.UserRepository_I.addPost(post.id, dto.userId);

            return post;
        } 
        catch(error) {
            throw error;
        }
    }

}