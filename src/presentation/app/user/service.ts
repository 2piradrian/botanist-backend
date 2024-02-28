import { ErrorHandler, ErrorType, LikePostDTO } from "../../../domain";
import { PostRepository_I, UserRepository_I } from "../../../infrastructure";

export class UserService {

    constructor(
        private readonly userRepository: UserRepository_I,
        private readonly postRepository: PostRepository_I
    ){}

    public async likePost(dto: LikePostDTO) {
        try {
            const user = await this.userRepository.getUserById(dto.userId);
            if (!user) {
                throw ErrorHandler.badRequest(ErrorType.UserNotFound);
            }

            const post = await this.postRepository.getById(dto.postId);
            if (!post) {
                throw ErrorHandler.badRequest(ErrorType.PostNotFound)
            };

            // Toggle like on user model
            const userIndex = user.likes.findIndex(like => like === post.id.valueOf());
            if (userIndex === -1) {
                user.likes.push(post.id.valueOf());
            } else {
                user.likes.splice(userIndex, 1);
            }

            // Toggle like on post model
            const postIndex = post.likedBy.findIndex(like => like === user.id.valueOf());
            if (postIndex === -1) {
                post.likedBy.push(user.id.valueOf());
            } else {
                post.likedBy.splice(postIndex, 1);
            }

            await this.userRepository.update(user);
            await this.postRepository.update(post);
        }
        catch(error){
            console.log(error);
            throw error;
        }
    }
}