import { CreatePostDTO, GetByCategoriesDTO } from "../../../domain";
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

    public async getPosts(dto: GetByCategoriesDTO) {
        try {
            const posts = await this.postRepository.getPosts(dto);

            let nextPage: number | null = dto.page + 1;
            if (posts.length < dto.pageSize){
                nextPage = null;
            }

            console.log(posts);
            console.log(nextPage);

            return {posts, nextPage};
        } 
        catch(error) {
            console.log(error);
            throw error;
        }
    }

}