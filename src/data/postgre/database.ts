import { Sequelize } from "sequelize";

interface Options {
    user: string;
    password: string;
    database: string;
}

export class PostgreDatabase {

    static async connect(options: Options) {
        const { user, password, database } = options;

        try{
            const sequelize = new Sequelize(database, user, password, {
                dialect: "postgres",
                logging: false
            });

            await sequelize.authenticate();
            console.log("Connected to Postgre");
            return sequelize;
        }catch(error){
            throw error;
        }
    }
}