import { PostRepository_I } from './../../../infrastructure/repository/post';
import { CreatePostDTO } from "../../../domain";
import { ImageService } from "../../services/image";

export class PostService {

    constructor(
        private readonly PostRepository_I: PostRepository_I,
        private readonly imageService: ImageService
    ){}

    public async create(dto: CreatePostDTO) {
        try {
            dto.image = await this.imageService.uploadImage(dto.image, dto.title);
            const post = await this.PostRepository_I.create(dto, dto.image);

            // Todo: Save the post id in the user's post array

            return post;
        } 
        catch(error) {
            throw error;
        }
    }

}