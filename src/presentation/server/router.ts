import { Router } from "express";
import { AuthRoutes } from "../app/auth/routes";
import { PostRoutes } from "../app/post/routes";
import { UserRoutes } from "../app/user/routes";

export class AppRouter {
    static get routes(): Router {
        const router = Router();

        router.use('/api/auth', AuthRoutes.routes);
        router.use('/api/posts', PostRoutes.routes);
        router.use('/api/user', UserRoutes.routes)

        return router;
    }
}