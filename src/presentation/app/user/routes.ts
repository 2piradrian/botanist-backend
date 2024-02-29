import { Router } from "express";
import { UserService } from "./service";
import { PostRepository_I, UserRepository_I } from "../../../infrastructure";
import { UserController } from "./controller";

export class UserRoutes {
    static get routes(): Router {
        const router = Router();

        const service = new UserService(
            new UserRepository_I(),
            new PostRepository_I()
        );

        const controller = new UserController(service);

        router.put('/like-post', controller.likePost);
        router.put('/follow-user', controller.followUser);

        return router;
    }
}