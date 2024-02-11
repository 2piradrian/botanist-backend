import { compareSync, genSaltSync, hashSync } from 'bcryptjs';

export const EncrypterAdapter = {
    hash: (password: string) => {
        const salt = genSaltSync();

        return hashSync(password, salt);
    },
    
    compare: (password: string, hashed: string) => {
        const compare = compareSync(password, hashed);

        return compare;
    }
} 