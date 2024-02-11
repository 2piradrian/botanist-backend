import { Request, Response } from "express";
import { AuthService } from "./service";
import { DeleteAccountDTO, ErrorHandler, LoginUserDTO, RegisterUserDTO, RefreshTokenDTO } from "../../../domain";

export class AuthController {
    constructor(
        private readonly authService: AuthService
    ){}

    register = (req: Request, res: Response) => {
        const [error, dto] = RegisterUserDTO.create(req.body);

        if (error) {
            return res.status(400).json({ error });
        }

        this.authService.register(dto!)
            .then(() => res.status(201).json({ message: 'User created successfully' }))
            .catch(error => ErrorHandler.handle(error, res));
    }

    login = (req: Request, res: Response) => {
        const [error, dto] = LoginUserDTO.create(req.body);

        if (error) {
            return res.status(400).json({ error });
        }

        this.authService.login(dto!)
            .then(data => res.status(200).json(data))
            .catch(error => ErrorHandler.handle(error, res));
    }

    refreshToken = (req: Request, res: Response) => {
        const [error, dto] = RefreshTokenDTO.create(req.body);

        if (error) {
            return res.status(400).json({ error });
        }

        this.authService.refreshToken(dto!)
            .then(data => res.status(200).json(data))
            .catch(error => ErrorHandler.handle(error, res));
    }

    deleteAccount = (req: Request, res: Response) => {
        const [error, dto] = DeleteAccountDTO.create(req.body);

        if (error) {
            return res.status(400).json({ error });
        }

        this.authService.deleteAccount(dto!)
            .then(() => res.status(200).json({ message: 'Account deleted successfully' }))
            .catch(error => ErrorHandler.handle(error, res));
    }
} 