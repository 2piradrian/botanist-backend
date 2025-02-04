import { Router } from "express";
import { AuthController } from "./controller";
import { AuthService } from "./service";
import { UserRepository_I } from "../../../infrastructure";

export class AuthRoutes {

    static get routes(): Router {
        const router = Router();
        
        const service = new AuthService(
            new UserRepository_I()
        );

        const controller = new AuthController(service);

        router.post('/login', controller.login);
        router.post('/register', controller.register);
        router.post('/refresh-token', controller.refreshToken);
        router.post('/delete-account', controller.deleteAccount);

        return router;
    }
}