import { Router } from "express";
import { PostService } from "./service";
import { PostController } from "./controller";
import { AuthValidator } from "../../middlewares/auth";
import { ImageService } from "../../services/image";
import { PostRepository_I, UserRepository_I } from "../../../infrastructure";

export class PostRoutes {
    static get routes(): Router {
        const router = Router();

        const service = new PostService(
            new UserRepository_I(),
            new PostRepository_I(), 
            new ImageService()
        );

        const controller = new PostController(service);

        router.post('/create', [AuthValidator.checkToken], controller.create);
        router.get('/get-by-categories', [AuthValidator.checkToken], controller.getByCategories);
        router.delete('/delete', [AuthValidator.checkToken], controller.delete);

        return router;
    }
}