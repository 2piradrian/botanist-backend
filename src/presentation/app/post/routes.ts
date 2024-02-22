import { Router } from "express";
import { PostService } from "./service";
import { PostController } from "./controller";
import { AuthValidator } from "../../middlewares/auth";
import { ImageService } from "../../services/image";

export class PostRoutes {
    static get routes(): Router {
        const router = Router();

        const imageService = new ImageService();
        const service = new PostService(imageService);
        const controller = new PostController(service);

        router.post('/create', [AuthValidator.checkToken], controller.create);

        return router;
    }
}