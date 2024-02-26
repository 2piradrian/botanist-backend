import { CreatePostDTO, GetByCategoriesDTO, PostEntity, UserEntity } from "../../domain";
import { PostRepository } from "../../domain/repository/post";
import { PostgresPostDataSource } from "../data-sources/post";

export class PostRepository_I implements PostRepository {

    private dataSource: PostgresPostDataSource;

    constructor() {
        this.dataSource = new PostgresPostDataSource();
    }

    public create(dto: CreatePostDTO, user: UserEntity): Promise<PostEntity> {
        return this.dataSource.create(dto, user);
    }

    public getPosts(dto: GetByCategoriesDTO): Promise<PostEntity[]> {
        return this.dataSource.getPosts(dto);
    }
}