import { Router } from "express";
import { AuthRoutes } from "../app/auth/routes";

export class AppRouter {
    static get routes(): Router {
        const router = Router();

        router.use('/api/auth', AuthRoutes.routes);
        router.use('/api/posts');

        return router;
    }
}