import { env } from "./config"
import { AppRouter, Server } from "./presentation"

(async () => {
    main()
})()

async function main(){
    const server = new Server({
        port: env.PORT,
        routes: AppRouter.routes
    })

    server.start()
}