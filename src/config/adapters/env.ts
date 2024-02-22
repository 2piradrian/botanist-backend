import 'dotenv/config';
import { get } from 'env-var';

export const env = {
    PORT: get('PORT').required().asPortNumber(),

    MONGO_URL: get('MONGO_URL').required().asString(),
    MONGO_DB_NAME: get('MONGO_DB_NAME').required().asString(),

    API_URL: get('API_URL').required().asString(),
    IMAGES_PATH: get('IMAGES_PATH').required().asString(),

    TOKEN_SEED: get('TOKEN_SEED').required().asString(),

}