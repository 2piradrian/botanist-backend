import { Request, Response } from "express";
import { PostService } from "./service";
import { CreatePostDTO } from "../../../domain";

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
            .catch(error => res.status(500).json({ error: error.message }));
    }

    getPosts = (req: Request, res: Response) => {
        this.postService.getPost()
            .then((posts) => res.status(200).json(posts))
            .catch(error => res.status(500).json({ error: error.message }));
    }
}