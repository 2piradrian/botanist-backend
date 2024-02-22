import { env } from "./config"
import { MongoDatabase, PostgreDatabase } from "./data";
import { AppRouter, Server } from "./presentation"

(async () => {
    main();
})();

async function main() {

    await MongoDatabase.connect({ 
        mongoUrl: env.MONGO_URL, 
        dbName: env.MONGO_DB_NAME 
    });
    
    await PostgreDatabase.connect({ 
        user: env.POSTGRES_USER, 
        password: env.POSTGRES_PASS, 
        database: env.POSTGRES_DB 
    });

    const server = new Server({
        port: env.PORT,
        routes: AppRouter.routes
    });

    server.start();
}