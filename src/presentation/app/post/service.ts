import { CreatePostDTO } from "../../../domain";
import { ImageService } from "../../services/image";

export class PostService {

    constructor(
        private readonly imageService: ImageService
    ){}

    public async create(dto: CreatePostDTO) {
        try{
            const imageName = await this.imageService.uploadImage(dto.image, dto.title);
        }catch(error){
            throw error;
        }
    }

}