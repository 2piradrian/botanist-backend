export abstract class UserDataSource {
    public abstract addPost(postId: string, userId: string): Promise<void>;
}