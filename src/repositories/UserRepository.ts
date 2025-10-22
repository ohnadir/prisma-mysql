import { PrismaClient, User } from "@prisma/client";
import { IUser } from "../types/user.types";

export class UserRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async create(data: Omit<IUser, "id">): Promise<User> {
        return this.prisma.user.create({ data });
    }

    async findById(id: string): Promise<User | null> {
        return this.prisma.user.findUnique({ where: { id: Number(id) } });
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({ where: { email } });
    }

    async update(id: string, data: Omit<IUser, "id">): Promise<User> {
        return this.prisma.user.update({
            where: { id: Number(id) },
            data,
        });
    }

    async delete(id: string): Promise<User> {
        return this.prisma.user.delete({ where: { id: Number(id) } });
    }
}
