import { PrismaClient, User, Prisma } from "@prisma/client";
import { hashPassword } from "../utils/hashPassword";

export class UserRepository {
    private readonly prisma: PrismaClient;

    constructor(prismaClient: PrismaClient) {
        this.prisma = prismaClient;
    }

    async create(data: Prisma.UserCreateInput): Promise<User> {
        const { password, ...rest } = data;
        const hashedPassword = await hashPassword(password);

        return this.prisma.user.create({
            data: {
                ...rest,
                password: hashedPassword
            },
        });
    }

    async findById(id: string): Promise<User | null> {
        return this.prisma.user.findUnique({ where: { id: Number(id) } });
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({ where: { email } });
    }

    async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
        return this.prisma.user.update({
            where: { id: Number(id) },
            data,
        });
    }

    async delete(id: string): Promise<User> {
        return this.prisma.user.delete({ where: { id: Number(id) } });
    }
}