import { Sequelize } from "sequelize";
import { env } from "../../config";

export class PostgreDatabase {

    public sequelize: Sequelize;

    constructor(){
        this.sequelize = new Sequelize(env.POSTGRES_DB, env.POSTGRES_USER, env.POSTGRES_PASS, {
            dialect: "postgres",
            logging: false
        });
    }

    public getSequelize() {
        return this.sequelize;
    }

    public async connect() {
        try{
            await this.sequelize.authenticate();
            await this.sequelize.sync();

            console.log("Connected to Postgre");

            return true;
        }catch(error){
            throw error;
        }
    }
}