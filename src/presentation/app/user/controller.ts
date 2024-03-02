import { Request, Response } from "express";
import { UserService } from "./service";
import { ErrorHandler, FollowUserDTO, GetProfileDTO, LikePostDTO } from "../../../domain";

export class UserController {
    constructor(
        private readonly userService: UserService
    ){}

    getProfile = (req: Request, res: Response) => {
        const [error, dto] = GetProfileDTO.create({...req.query, userId: req.body.userId});

        if (error) {
            return res.status(400).json({ error });
        }

        this.userService.getProfile(dto!)
            .then(profile => res.status(200).json(profile))
            .catch(error => ErrorHandler.handle(error, res));
    }

    likePost = (req: Request, res: Response) => {
        const [error, dto] = LikePostDTO.create(req.body);

        if (error) {
            return res.status(400).json({ error });
        }

        this.userService.likePost(dto!)
            .then(() => res.status(200).json({ message: 'Post liked successfully' }))
            .catch(error => ErrorHandler.handle(error, res));
    }

    followUser = (req: Request, res: Response) => {
        const [error, dto] = FollowUserDTO.create(req.body);

        if (error) {
            return res.status(400).json({ error });
        }

        this.userService.followUser(dto!)
            .then(() => res.status(200).json({ message: 'Post liked successfully' }))
            .catch(error => ErrorHandler.handle(error, res));
    }
}