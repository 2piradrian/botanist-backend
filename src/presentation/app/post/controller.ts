import { Request, Response } from "express";
import { PostService } from "./service";

export class PostController {
    constructor(
        private readonly postService: PostService
    ){}

    create = (req: Request, res: Response) => {
        
        this.postService.create()
            .then(() => res.status(201).json({ message: 'Post created successfully' }))
            .catch(error => res.status(500).json({ error: error.message }));
    }
}