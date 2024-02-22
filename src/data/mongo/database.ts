import mongoose from "mongoose";
import { env } from "../../config";

export class MongoDatabase {

    public async connect() {
        try{
            await mongoose.connect(env.MONGO_URL, { dbName: env.MONGO_DB_NAME });

            console.log("Connected to MongoDB");
            return true;
        }catch(error){
            throw error;
        }
    }
}