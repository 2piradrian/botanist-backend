import 'dotenv/config';
import { get } from 'env-var';

export const env = {
    PORT: get('PORT').required().asPortNumber(),

    MONGO_URL: get('MONGO_URL').required().asString(),
    MONGO_DB_NAME: get('MONGO_DB_NAME').required().asString(),

    POSTGRES_USER: get('POSTGRES_USER').required().asString(),
    POSTGRES_PASS: get('POSTGRES_PASS').required().asString(),
    POSTGRES_DB: get('POSTGRES_DB').required().asString(),

    API_URL: get('API_URL').required().asString(),
    IMAGES_PATH: get('IMAGES_PATH').required().asString(),

    TOKEN_SEED: get('TOKEN_SEED').required().asString(),

}