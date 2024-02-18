import { Router } from "express";
import { PostService } from "./service";
import { PostController } from "./controller";

export class PostRoutes {
    static get routes(): Router {
        const router = Router();

        const service = new PostService();
        const controller = new PostController(service);

        router.post('/', controller.create);

        return router;
    }
}