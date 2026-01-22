import { StatusCodes } from "http-status-codes";
import ApiError from "../utils/ApiError";
import type { Prisma, User } from "@prisma/client";
import prisma from "../config/prisma";
import { AuthRepository } from "../repositories/auth.repository";
import { isMatchPassword } from "../utils/hashPassword";
import { jwtHelper } from "../helpers/jwtHelper";
import config from "../config";
import { JwtPayload, Secret } from "jsonwebtoken";

export class AuthService {
    private authRepository: AuthRepository;

    constructor() {
        this.authRepository = new AuthRepository(prisma);
    }

    async login(payload: Prisma.UserCreateInput & { fcmTokens?: string | null }) {

        const { email, password, fcmTokens } = payload;

        // Find exist user by email
        const isExistUser = await this.authRepository.findByEmail(email);
        if (!isExistUser) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid email or password");
        }

        // check fcmToken if the role is not include the SUPER_ADMIN and ADMIN
        if (!["SUPER_ADMIN", "ADMIN"].includes(isExistUser.role) && !fcmTokens) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "FCM Token is required!");
        }

        // store fcmToken
        if (!["SUPER_ADMIN", "ADMIN"].includes(isExistUser.role) && fcmTokens) {
            await this.authRepository.addFcmToken({
                user: Number(isExistUser.id),
                token: fcmTokens as string
            });
        }

        //check verified and status
        if (!isExistUser.verified) {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'Please verify your account, then try to login again');
        }

        //check match password
        if (password && !(await isMatchPassword(password, isExistUser.password))) {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'Password is incorrect!');
        }

        //create token
        const accessToken = jwtHelper.createToken(
            { id: isExistUser.id, role: isExistUser.role, email: isExistUser.email },
            config.jwt.jwt_secret as Secret,
            config.jwt.jwt_expire_in as string
        );

        //create token
        const refreshToken = jwtHelper.createToken(
            { id: isExistUser.id, role: isExistUser.role, email: isExistUser.email },
            config.jwt.jwtRefreshSecret as Secret,
            config.jwt.jwtRefreshExpiresIn as string
        );

        return { accessToken, refreshToken };

    }

    async logout(user: JwtPayload, fcmTokens: string) {

        // Find exist user by id
        const isExistUser = await this.authRepository.findById(user.id);
        if (!isExistUser) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid User");
        }

        const result = await this.authRepository.deleteFcmToken({
            user: Number(isExistUser.id),
            token: fcmTokens as string
        });

        if (!result) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to logout");
        }
        return result;

    }
}