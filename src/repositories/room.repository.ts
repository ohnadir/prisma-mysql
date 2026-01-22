import { PrismaClient, Room, Prisma } from "@prisma/client";

export class RoomRepository {
    private readonly prisma: PrismaClient;

    constructor(prismaClient: PrismaClient) {
        this.prisma = prismaClient;
    }

    async create(data: Prisma.RoomCreateInput): Promise<Room> {
        return this.prisma.room.create({ data });
    }

    async retrieve(): Promise<Room[]> {
        return this.prisma.room.findMany();
    }
}