export abstract class UserRepository {
    public abstract addPost(postId: string, userId: string): Promise<void>;
}