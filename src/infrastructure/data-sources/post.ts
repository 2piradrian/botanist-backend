import { PostModel } from "../../data";
import { CreatePostDTO, GetByCategoriesDTO, PostDataSource, PostEntity, UserEntity } from "../../domain";

export class PostgresPostDataSource implements PostDataSource {

    constructor(){
        PostModel.sync();
    }

    public async create(dto: CreatePostDTO, user: UserEntity): Promise<PostEntity>{
        try {
            const post = await PostModel.create({
                title: dto.title,
                description: dto.description,
                category: dto.category,
                image: dto.image,
                content: dto.content,
                authorId: user.id.valueOf(),
                authorUsername: user.username

            });

            return PostEntity.fromObject(post.dataValues);
        } 
        catch(error) {
            throw error;
        }
    };

    public async getPosts(dto: GetByCategoriesDTO): Promise<PostEntity[]> {
        try {
            const { categories, pageSize, page} = dto;

            const posts = await PostModel.findAll({
                where: { category: categories },
                limit: pageSize,
                offset: pageSize * (page - 1),
                order: [['createdAt', 'DESC']]
            });

            return posts.map(post => PostEntity.fromObject(post.dataValues));
        } 
        catch(error) {
            throw error;
        }
    }
}