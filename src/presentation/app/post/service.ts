import { CreatePostDTO, ErrorType, GetByCategoriesDTO } from "../../../domain";
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
            const user = await this.userRepository.getById(dto.userId);

            if (!user) {
                throw new Error(ErrorType.UserNotFound);
            }

            dto.image = await this.imageService.uploadImage(dto.image, dto.title);
            const post = await this.postRepository.create(dto, user);

            user.posts.push(post.id.valueOf());
            await this.userRepository.update(user);

            return post;
        } 
        catch(error) {
            console.log(error);
            throw error;
        }
    } 

    public async getByCategories(dto: GetByCategoriesDTO) {
        try {
            const posts = await this.postRepository.getByCategories(dto);

            let nextPage: number | null = dto.page + 1;
            if (posts.length < dto.pageSize){
                nextPage = null;
            }

            return {posts, nextPage};
        } 
        catch(error) {
            console.log(error);
            throw error;
        }
    }

}