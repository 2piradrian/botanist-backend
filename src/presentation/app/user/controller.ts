import { Request, Response } from "express";
import { UserService } from "./service";
import { FollowUserDTO, GetFeedDTO, GetProfileDTO, LikePostDTO } from "../../../domain";

export class UserController {
    constructor(
        private readonly userService: UserService
    ){}

    getFeed = (req: Request, res: Response) => {
        const [error, dto] = GetFeedDTO.create(req.body);

        if (error) {
            return res.status(400).json({ error });
        }

        this.userService.getFeed(dto!)
            .then(feed => res.status(200).json(feed))
            .catch(error => res.status(500).json({ error: error.message }));
    }

    getProfile = (req: Request, res: Response) => {
        const [error, dto] = GetProfileDTO.create(req.body);

        if (error) {
            return res.status(400).json({ error });
        }

        this.userService.getProfile(dto!)
            .then(profile => res.status(200).json(profile))
            .catch(error => res.status(500).json({ error: error.message }));
    }

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