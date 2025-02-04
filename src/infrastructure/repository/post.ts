import { CreatePostDTO, GetByCategoriesDTO, PostEntity, UserEntity } from "../../domain";
import { PostRepository } from "../../domain/repository/post";
import { PostgresPostDataSource } from "../data-sources/post";

export class PostRepository_I implements PostRepository {

    private dataSource: PostgresPostDataSource;

    constructor() {
        this.dataSource = new PostgresPostDataSource();
    }

    public getById(id: string): Promise<PostEntity | undefined> {
        return this.dataSource.getById(id);
    }

    public getByIds(ids: string[]): Promise<PostEntity[]> {
        return this.dataSource.getByIds(ids);
    }

    public getByUserIds(ids: string[]): Promise<PostEntity[]> {
        return this.dataSource.getByUserIds(ids);
    }

    public create(dto: CreatePostDTO, user: UserEntity): Promise<PostEntity> {
        return this.dataSource.create(dto, user);
    }

    public getByCategories(dto: GetByCategoriesDTO): Promise<PostEntity[]> {
        return this.dataSource.getByCategories(dto);
    }

    public update(post: PostEntity): Promise<void> {
        return this.dataSource.update(post);
    }

    public delete(post: PostEntity): Promise<void> {
        return this.dataSource.delete(post);
    }

}