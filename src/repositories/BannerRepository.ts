import { PrismaClient, Banner, Prisma } from "@prisma/client";

export class BannerRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async create(data: Prisma.BannerCreateInput): Promise<Banner> {
        return this.prisma.banner.create({ data });
    }

    async retrieve(): Promise<Banner[]> {
        return this.prisma.banner.findMany();
    }
    async findById(id: string): Promise<Banner | null> {
        return this.prisma.banner.findUnique({where: {id: Number(id)}});
    }

    async updateById(id: string, payload: Prisma.BannerUpdateInput): Promise<Banner> {
        return this.prisma.banner.update({
            where: { id: Number(id) },
            data: payload
        });
    }

    async delete(id: string): Promise<Banner> {
        return this.prisma.banner.delete({ where: { id: Number(id) } });
    }
}