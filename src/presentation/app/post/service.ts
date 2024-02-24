import { CreatePostDTO } from "../../../domain";
import { PostRepository_I, UserRepository_I } from "../../../infrastructure";
import { ImageService } from "../../services/image";

export class PostService {

    constructor(
        private readonly userRepository: UserRepository_I,
        private readonly postRepository: PostRepository_I,
        private readonly imageService: ImageService
    ){}

    public async create(dto: CreatePostDTO) {
        try {
            dto.image = await this.imageService.uploadImage(dto.image, dto.title);
            const post = await this.postRepository.create(dto, dto.image);

            await this.userRepository.addPost(post.id, dto.userId);

            return post;
        } 
        catch(error) {
            throw error;
        }
    }

}