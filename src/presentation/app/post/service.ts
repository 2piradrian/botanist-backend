import { CreatePostDTO } from "../../../domain";

export class PostService {
    public async create(dto: CreatePostDTO) {
        console.log('Create post', dto);
    }
}