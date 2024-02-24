import { UserModel } from "../../data";
import { ErrorType, RegisterUserDTO, UserEntity } from "../../domain";
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

    public async getByEmail(email: string): Promise<UserEntity> {
        try {
            const user = await UserModel.findOne({ email: email });
            if (!user) {
                throw new Error(ErrorType.UserNotFound);
            }

            return UserEntity.fromObject(user);
        }catch(error){
            throw error;
        }
    }

    public async create(dto: RegisterUserDTO): Promise<UserEntity> {
        try {
            const newUser = new UserModel(dto);
            await newUser.save();

            return UserEntity.fromObject(newUser);
        }catch(error){
            throw error;
        }
    }

    public async delete(email: string): Promise<void> {
        try {
            await UserModel.deleteMany({ email: email });

        }catch(error){
            throw error;
        }
    }

}