import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiErrors';
import { emailHelper } from '../../../helpers/emailHelper';
import { jwtHelper } from '../../../helpers/jwtHelper';
import { emailTemplate } from '../../../shared/emailTemplate';
import {
    IAuthResetPassword,
    IChangePassword,
    ILoginData,
    IVerifyEmail
} from '../../../types/auth';
import cryptoToken from '../../../util/cryptoToken';
import generateOTP from '../../../util/generateOTP';
import { IUser } from '../user/user.interface';
import Prisma from '../../../config/prisma';
import { matchedPassword } from '../../../util/matchedPassword';

const loginUserFromDB = async (payload: ILoginData) => {

    const { email, password } = payload;

    const isExistUser: any = await Prisma.user.findUnique({
        where: { email: email }
    })
    if (!isExistUser) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "User doesn't exist!");
    }
 
     //check match password
    if ( password && !(await matchedPassword(password, isExistUser.password))) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Password is incorrect!');
    }



    console.log(isExistUser);
};



export const AuthService = {
    loginUserFromDB
};