import 'dotenv/config';
import { get } from 'env-var';

export const env = {
    PORT: get('PORT').required().asPortNumber(),

    MONGO_URL: get('MONGO_URL').required().asString(),
    MONGO_DB_NAME: get('MONGO_DB_NAME').required().asString(),

    MAILER_SERVICE: get('MAILER_SERVICE').required().asString(),
    MAILER_EMAIL: get('MAILER_EMAIL').required().asString(),
    MAILER_SECRET_KEY: get('MAILER_SECRET_KEY').required().asString(),

    API_URL: get('API_URL').required().asString(),

    TOKEN_SEED: get('TOKEN_SEED').required().asString(),

    DEV1_EMAIL: get('DEV1_EMAIL').required().asString(),
    DEV2_EMAIL: get('DEV2_EMAIL').required().asString(),

    SECRET: get('SECRET').required().asString(),
}