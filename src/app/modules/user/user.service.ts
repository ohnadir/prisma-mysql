import { JwtPayload } from 'jsonwebtoken';
import { StatusCodes } from "http-status-codes";
import ApiError from "../../../errors/ApiErrors";
import generateOTP from "../../../util/generateOTP";
import { emailTemplate } from "../../../shared/emailTemplate";
import unlinkFile from "../../../shared/unlinkFile";
import Prisma from '../../../config/prisma';
import { IUser } from './user.interface';
import { hashPassword } from '../../../util/hashPassword';

const createUserToDB = async (payload: Omit<IUser, "id">) => {
    payload.password = await hashPassword(payload.password);
    payload.authentication = {
        isResetPassword: false,
        oneTimeCode: generateOTP(),
        expireAt: new Date(Date.now() + 3 * 60000),
    }
    const createUser = await Prisma.user.create({
        data: payload
    });
    if (!createUser) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to create user');
    }
    return createUser;
};

export const UserService = {
    createUserToDB
};