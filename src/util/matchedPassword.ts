import bcrypt from 'bcrypt';

export const matchedPassword = async (password: string, hashPassword: string): Promise<boolean> => {
    return await bcrypt.compare(password, hashPassword);
};