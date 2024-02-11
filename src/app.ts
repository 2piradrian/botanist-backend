import { env } from "./config"
import { MongoDatabase } from "./data";
import { AppRouter, Server } from "./presentation"

(async () => {
    main();
})();

async function main() {

    await MongoDatabase.connect({ mongoUrl: env.MONGO_URL, dbName: env.MONGO_DB_NAME });

    const server = new Server({
        port: env.PORT,
        routes: AppRouter.routes
    });

    server.start();
}