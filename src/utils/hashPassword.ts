import bcrypt from 'bcrypt';
import config from '../config';

export const hashPassword = async (password: string) => {
    const hashed = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds));
    return hashed;
};

//is match password
export const isMatchPassword = async (password: string, hashPassword: string): Promise<boolean> => {
    return await bcrypt.compare(password, hashPassword);
};