import { PrismaClient, User, Prisma, FcmToken } from "@prisma/client";
import ApiError from "../utils/ApiError";
import { StatusCodes } from "http-status-codes";

export class AuthRepository {
    private readonly prisma: PrismaClient;

    constructor(prismaClient: PrismaClient) {
        this.prisma = prismaClient;
    }

    async findById(id: Number): Promise<User | null> {
        return this.prisma.user.findUnique({ where: { id: Number(id) } });
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({ where: { email } });
    }

    async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
        return this.prisma.user.update({
            where: { id: Number(id) },
            data
        });
    }

    async addFcmToken(data: Prisma.FcmTokenCreateInput): Promise<FcmToken> {
        const sameTokenIsExist = await this.prisma.fcmToken.findFirst({
            where: {
                user: data.user,
                token: data.token
            }
        });
        if (!sameTokenIsExist) {
            return this.prisma.fcmToken.create({ data });
        }
        return sameTokenIsExist;
    }

    async deleteFcmToken(data: Prisma.FcmTokenCreateInput): Promise<FcmToken> {
        const sameTokenIsExist = await this.prisma.fcmToken.findFirst({
            where: {
                user: data.user,
                token: data.token
            }
        });
        if (!sameTokenIsExist) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid FCM Token");
        }

        return this.prisma.fcmToken.delete({ where: { id: Number(sameTokenIsExist.id) } });
    }
}