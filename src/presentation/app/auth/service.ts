import { EncrypterAdapter, TokenAdapter } from "../../../config";
import { UserModel } from "../../../data";
import { ErrorHandler, ErrorType, LoginUserDTO, RegisterUserDTO, DeleteAccountDTO, RefreshTokenDTO, UserEntity } from "../../../domain"
import { UserRepository_I } from "../../../infrastructure";

export class AuthService {

    constructor(
        private readonly userRepository: UserRepository_I,
    ){}

    public async register (dto: RegisterUserDTO) {
        try {
            const existingEmail = await this.userRepository.getByEmail(dto.email);

            if (existingEmail) {
                throw ErrorHandler.badRequest(ErrorType.EmailAlreadyExists);
            }

            const existingUsername = await this.userRepository.getByUsername(dto.username);

            if (existingUsername) {
                throw ErrorHandler.badRequest(ErrorType.UsernameAlreadyExists);
            }

            dto.password = EncrypterAdapter.hash(dto.password);
            return await this.userRepository.create(dto);
        } 
        catch(error) {
             throw error;
        }
    }

    public async login(dto: LoginUserDTO) {
        try {
            const user = await this.userRepository.getByEmail(dto.email);
            if (!user) throw ErrorHandler.badRequest(ErrorType.UserNotFound);

            const passwordMatch = EncrypterAdapter.compare(dto.password, user.password);
            if (!passwordMatch) throw ErrorHandler.badRequest(ErrorType.InvalidPassword);
            
            // Remove password from user object
            const {password, ...userData} = UserEntity.fromObject(user);

            const accessToken = await TokenAdapter.generate(userData, '7d');
            if (!accessToken) throw ErrorHandler.internal(ErrorType.InternalError);

            const refreshToken = await TokenAdapter.generate(userData, '14d');
            if (!refreshToken) throw ErrorHandler.internal(ErrorType.InternalError);

            return { user: userData, tokens: {accessToken, refreshToken}};
        }
        catch(error){
            throw error;
        }
    }

    public async refreshToken(dto: RefreshTokenDTO) {
        try {
            const payload = await TokenAdapter.verify<{ email: string }>(dto.refreshToken);
            if (!payload) throw ErrorHandler.badRequest(ErrorType.Unauthorized);

            const user = await UserModel.findOne({ email: payload.email });
            if (!user) throw ErrorHandler.badRequest(ErrorType.UserNotFound);

            const {password, ...userData} = UserEntity.fromObject(user);

            const accessToken = await TokenAdapter.generate(userData, '7d');
            if (!accessToken) throw ErrorHandler.internal(ErrorType.InternalError);

            const newRefreshToken = await TokenAdapter.generate(userData, '14d');
            if (!newRefreshToken) throw ErrorHandler.internal(ErrorType.InternalError);

            return { accessToken: accessToken, refreshToken: newRefreshToken};
        }
        catch(error){
            throw error;
        }
    }

    public async deleteAccount(dto: DeleteAccountDTO) {
        try{
            const user = await this.userRepository.getByEmail(dto.email);
            if (!user) throw ErrorHandler.badRequest(ErrorType.UserNotFound);
    
            const passwordMatch = EncrypterAdapter.compare(dto.password, user.password);
            if (!passwordMatch) throw ErrorHandler.badRequest(ErrorType.InvalidPassword);

            // Delete user account
            await this.userRepository.delete(dto.email);

            return user;
        }
        catch(error){
            throw error;
        }
    }

}