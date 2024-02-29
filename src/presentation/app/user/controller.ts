import { Request, Response } from "express";
import { UserService } from "./service";
import { LikePostDTO } from "../../../domain";
import { FollowUserDTO } from "../../../domain/dto/user/follow-user";

export class UserController {
    constructor(
        private readonly userService: UserService
    ){}

    likePost = (req: Request, res: Response) => {
        const [error, dto] = LikePostDTO.create(req.body);

        if (error) {
            return res.status(400).json({ error });
        }

        this.userService.likePost(dto!)
            .then(() => res.status(200).json({ message: 'Post liked successfully' }))
            .catch(error => res.status(500).json({ error: error.message }));
    }

    followUser = (req: Request, res: Response) => {
        const [error, dto] = FollowUserDTO.create(req.body);

        if (error) {
            return res.status(400).json({ error });
        }

        this.userService.followUser(dto!)
            .then(() => res.status(200).json({ message: 'Post liked successfully' }))
            .catch(error => res.status(500).json({ error: error.message }));
    }
}