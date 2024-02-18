import { Router } from "express";
import { AuthRoutes } from "../app/auth/routes";
import { PostRoutes } from "../app/post/routes";

export class AppRouter {
    static get routes(): Router {
        const router = Router();

        router.use('/api/auth', AuthRoutes.routes);
        router.use('/api/posts', PostRoutes.routes);

        return router;
    }
}