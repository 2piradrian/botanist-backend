import { Router } from "express";
import { UserService } from "./service";
import { PostRepository_I, UserRepository_I } from "../../../infrastructure";
import { UserController } from "./controller";
import { AuthValidator } from "../../middlewares/auth";

export class UserRoutes {
    static get routes(): Router {
        const router = Router();

        const service = new UserService(
            new UserRepository_I(),
            new PostRepository_I()
        );

        const controller = new UserController(service);

        router.get('/get-profile', [AuthValidator.checkToken], controller.getProfile);
        router.put('/like-post', [AuthValidator.checkToken], controller.likePost);
        router.put('/follow-user', [AuthValidator.checkToken], controller.followUser);

        return router;
    }
}