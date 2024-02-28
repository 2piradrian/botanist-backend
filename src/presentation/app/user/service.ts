import { ErrorHandler, ErrorType, LikePostDTO } from "../../../domain";
import { FollowUserDTO } from "../../../domain/dto/user/follow-user";
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

    public async followUser(dto: FollowUserDTO) {
        try {
            const user = await this.userRepository.getUserById(dto.userId);
            if (!user) {
                throw ErrorHandler.badRequest(ErrorType.UserNotFound);
            }

            const followedUser = await this.userRepository.getUserById(dto.followedId);
            if (!followedUser) {
                throw ErrorHandler.badRequest(ErrorType.UserNotFound);
            }

            const userIndex = user.following.findIndex(follow => follow === followedUser.id.valueOf());
            const followedIndex = followedUser.followers.findIndex(follower => follower === user.id.valueOf());
            if (userIndex === -1) {
                user.following.push(followedUser.id.valueOf());
                followedUser.followers.push(user.id.valueOf());
            } else {
                user.following.splice(userIndex, 1);
                followedUser.followers.splice(followedIndex, 1);
            }

            await this.userRepository.update(user);
            await this.userRepository.update(followedUser);
        }
        catch(error){
            console.log(error);
            throw error;
        }
    }
}