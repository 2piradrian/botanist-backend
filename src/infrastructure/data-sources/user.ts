import { UserModel } from "../../data";
import { RegisterUserDTO, UserEntity } from "../../domain";
import { UserDataSource } from "../../domain/data-sources/user";

export class MongoUserDataSource extends UserDataSource {
    
    public async getByEmail(email: string): Promise<UserEntity | undefined> {
        try {
            const user = await UserModel.findOne({ email: email });

            if (!user) {
                return undefined;
            }

            return UserEntity.fromObject(user);
        }
        catch(error){
            throw error;
        }
    }

    public async getById(id: string): Promise<UserEntity | undefined> {
        try {
            const user = await UserModel.findById(id);

            if (!user) {
                return undefined;
            }

            return UserEntity.fromObject(user);
        }
        catch(error){
            throw error;
        }
    }

    public async getByUsername(username: string): Promise<UserEntity | undefined> {
        try {
            const user = await UserModel.findOne({ username: username });

            if (!user) {
                return undefined;
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
        }
        catch(error){
            throw error;
        }
    }

    public async update(user: UserEntity): Promise<void> {
        try {
            await UserModel.updateOne({ email: user.email }, user); 
        }
        catch(error){
            throw error;
        }
    }

    public async delete(email: string): Promise<void> {
        try {
            await UserModel.deleteMany({ email: email });
        }
        catch(error){
            throw error;
        }
    }

}