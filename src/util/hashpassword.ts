import bcrypt from 'bcrypt';
import config from '../config';

export const hashPassword = async (password: string) => {
    const hashed = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds));
    return hashed;
};