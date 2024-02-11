import express, { Router } from 'express';
import cors from 'cors';

interface Options {
    port: number;
    routes: Router;
}

export class Server {
    private app = express();

    private readonly port: number;
    private readonly routes: Router;

    constructor(options: Options) {
        this.port = options.port;
        this.routes = options.routes;
    }

    public start(): void {

        /* Middlewares */
        this.app.use(express.json());

        this.app.use(cors({ origin: true, credentials: true, exposedHeaders: ["Authorization"] }));


        console.log('Server started');
    }

}