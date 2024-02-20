import { CreatePostDTO } from "../../../domain";

export class PostService {

    public async create(dto: CreatePostDTO) {
        try{
            console.log('Create post', dto);  
        }catch(error){
            throw error;
        }
    }

}