import { PostModel } from "../../data";
import { CreatePostDTO, GetByCategoriesDTO, PostDataSource, PostEntity, UserEntity } from "../../domain";

export class PostgresPostDataSource implements PostDataSource {

    constructor(){
        PostModel.sync();
    }

    public async getById(id: string): Promise<PostEntity | undefined> {
        try {
            const post = await PostModel.findByPk(id);

            if (!post) {
                return undefined;
            }

            return PostEntity.fromObject(post.dataValues);
        } 
        catch(error) {
            throw error;
        }
    }

    public async getByIds(ids: string[]): Promise<PostEntity[]> {
        try {
            const posts = await PostModel.findAll({
                where: { id: ids }
            });

            return posts.map(post => PostEntity.fromObject(post.dataValues));
        } 
        catch(error) {
            throw error;
        }
    }

    public async getByUserIds(ids: string[]): Promise<PostEntity[]> {
        try {
            const posts = await PostModel.findAll({
                where: { authorId: ids }
            });

            return posts.map(post => PostEntity.fromObject(post.dataValues));
        } 
        catch(error) {
            throw error;
        }
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
                authorUsername: user.username,
                createdAt: dto.createdAt
            });

            return PostEntity.fromObject(post.dataValues);
        } 
        catch(error) {
            throw error;
        }
    };

    public async getByCategories(dto: GetByCategoriesDTO): Promise<PostEntity[]> {
        try {
            const { categories, pageSize, page } = dto;

            const posts = await PostModel.findAll({
                where: { category: categories},
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

    public async update(post: PostEntity): Promise<void> {
        try {
            await PostModel.update(post, {
                where: { id: post.id.valueOf() }
            });
        } 
        catch(error) {
            throw error;
        }
    }

    public async delete(post: PostEntity): Promise<void> {
        try {
            await PostModel.destroy({
                where: { id: post.id.valueOf() }
            });
        } 
        catch(error) {
            throw error;
        }
    }
}