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
            .then(() => res.status(201).json({ message: 'Post created successfully' }))
            .catch(error => res.status(500).json({ error: error.message }));
    }
}