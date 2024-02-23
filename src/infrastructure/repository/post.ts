import { CreatePostDTO, PostEntity } from "../../domain";
import { PostRepository } from "../../domain/repository/post";
import { PostgresPostDataSource } from "../data-sources/post";

export class PostRepository_I implements PostRepository {

    constructor(private dataSource: PostgresPostDataSource) {}

    public create(dto: CreatePostDTO, imageName: string): Promise<PostEntity> {
        return this.dataSource.create(dto, imageName);
    }
}