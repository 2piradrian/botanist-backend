import { Router } from "express";
import { PostService } from "./service";
import { PostController } from "./controller";
import { AuthValidator } from "../../middlewares/auth";
import { ImageService } from "../../services/image";
import { PostRepository_I } from "../../../infrastructure/repository/post";
import { PostgresPostDataSource } from "../../../infrastructure/data-sources/post";

export class PostRoutes {
    static get routes(): Router {
        const router = Router();

        const imageService = new ImageService();

        const datasource = new PostgresPostDataSource();
        const repository = new PostRepository_I(datasource);
        
        const service = new PostService(repository, imageService);
        const controller = new PostController(service);

        router.post('/create', [AuthValidator.checkToken], controller.create);

        return router;
    }
}