import jwt from 'jsonwebtoken';
import { env } from './env';

export const TokenAdapter = {
    generate: async (payload: any, duration: string) => {
        return new Promise((resolve) => {
            jwt.sign(payload, env.TOKEN_SEED, { expiresIn: duration }, 
            (error, token) => {
                if (error) return resolve(null);

                resolve(token);
            })
        });
    },

    verify<T>(token: string): Promise<T | null> {
        return new Promise((resolve) => {
            jwt.verify(token, env.TOKEN_SEED, (error, decoded) => {
                if (error) return resolve(null);

                resolve(decoded as T);
            })
        });
    },
}