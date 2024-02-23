import { UserModel } from "../../data";
import { ErrorType } from "../../domain";
import { UserDataSource } from "../../domain/data-sources/user";

export class MongoUserDataSource extends UserDataSource {
    public async addPost(postId: string, userId: string): Promise<void> {
        try {
            const user = await UserModel.findById(userId);

            if (!user) {
                throw new Error(ErrorType.InternalError);
            }

            user.posts.push(postId);
            await user.save();
        } 
        catch(error) {
            throw error;
        }
    }
}