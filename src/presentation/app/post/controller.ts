import { ErrorHandler } from './../../../domain/error/error-handler';
import { Request, Response } from "express";
import { PostService } from "./service";
import { CreatePostDTO, GetByCategoriesDTO } from "../../../domain";

export class PostController {
    constructor(
        private readonly postService: PostService
    ){}

    create = (req: Request, res: Response) => {
        const [error, dto] = CreatePostDTO.create(req.body);

        if (error) {
            return res.status(400).json({ error });
        }
        
        this.postService.create(dto!)
            .then((post) => res.status(201).json({ id: post.id }))
            .catch(error => ErrorHandler.handle(error, res));
    }

    getByCategories = (req: Request, res: Response) => {
        const [error, dto] = GetByCategoriesDTO.create(req.query);

        if (error) {
            return res.status(400).json({ error });
        }

        this.postService.getByCategories(dto!)
            .then((posts) => res.status(200).json(posts))
            .catch(error => ErrorHandler.handle(error, res));
    }
}