import { PostModel } from "../../data";
import { CreatePostDTO, PostDataSource, PostEntity } from "../../domain";

export class PostgresPostDataSource implements PostDataSource {

    constructor(){
        PostModel.sync();
    }

    public async create(dto: CreatePostDTO, imageName: string): Promise<PostEntity>{
        try {
            const post = await PostModel.create({
                title: dto.title,
                description: dto.description,
                category: dto.category,
                image: imageName,
                content: dto.content,
            });

            return PostEntity.fromObject(post.dataValues);
        } 
        catch(error) {
            throw error;
        }
    };

    public async getPosts(): Promise<PostEntity[]> {
        try {
            const posts = await PostModel.findAll();
            return posts.map(post => PostEntity.fromObject(post.dataValues));
        } 
        catch(error) {
            throw error;
        }
    }
}