import { UnparseImage } from "../../../config";
import { ErrorHandler, ErrorType, FollowUserDTO, GetProfileDTO, LikePostDTO, PostEntity } from "../../../domain";
import { PostRepository_I, UserRepository_I } from "../../../infrastructure";

export class UserService {

    constructor(
        private readonly userRepository: UserRepository_I,
        private readonly postRepository: PostRepository_I
    ){}

    public async getProfile(dto: GetProfileDTO) {
        try{
            const user = await this.userRepository.getById(dto.profile.valueOf());

            if (!user) {
                throw ErrorHandler.badRequest(ErrorType.UserNotFound);
            }

            let posts: PostEntity[] = [];
            if (dto.includePosts){
                posts = await this.postRepository.getByUserIds([user.id.valueOf()]);
            }

            if (user.id.valueOf() !== dto.userId) {
                const { password, createdAt, likes, ...limitedUser } = user;

                return {user: limitedUser, posts}
            }
            else {
                const { password, createdAt, ...sanitizedUser } = user;
                return {user: sanitizedUser, posts};
            }
        }
        catch(error){
            console.log(error);
            throw error;
        }
    }

    public async likePost(dto: LikePostDTO) {
        try {
            const user = await this.userRepository.getById(dto.userId);
            if (!user) {
                throw ErrorHandler.badRequest(ErrorType.UserNotFound);
            }

            const post = await this.postRepository.getById(dto.postId);
            if (!post) {
                throw ErrorHandler.badRequest(ErrorType.PostNotFound)
            };

            if (user.id.valueOf() === post.authorId.valueOf()) {
                throw ErrorHandler.badRequest(ErrorType.CantLikeYourOwnPost);
            }

            // Remove url from image
            post.image = UnparseImage(post.image);

            // Toggle like on user model
            const userIndex = user.likes.findIndex(
                like => like.toString() === post.id.valueOf().toString()
            );

            if (userIndex === -1) {
                user.likes.push(post.id.valueOf());
            } else {
                user.likes.splice(userIndex, 1);
            }

            // Toggle like on post model
            const postIndex = post.likedBy.findIndex(
                like => like.toString() === user.id.valueOf().toString()
            );

            if (postIndex === -1) {
                post.likedBy.push(user.id.valueOf());
            } 
            else {
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
            const user = await this.userRepository.getById(dto.userId);
            if (!user) {
                throw ErrorHandler.badRequest(ErrorType.UserNotFound);
            }

            const followedUser = await this.userRepository.getById(dto.followedId);
            if (!followedUser) {
                throw ErrorHandler.badRequest(ErrorType.UserNotFound);
            }

            if (user.id.valueOf() === followedUser.id.valueOf()) {
                throw ErrorHandler.badRequest(ErrorType.CantFollowYourself);
            }

            const userIndex = user.following.findIndex(follow => follow === followedUser.id.valueOf());
            const followedIndex = followedUser.followers.findIndex(follower => follower === user.id.valueOf());
            if (userIndex === -1) {
                user.following.push(followedUser.id.valueOf());
                followedUser.followers.push(user.id.valueOf());
            } 
            else {
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