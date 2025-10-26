import { PrismaClient, Category, Prisma } from "@prisma/client";

export class CategoryRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async create(data: Prisma.CategoryCreateInput): Promise<Category> {
        return this.prisma.category.create({ data });
    }

    async retrieve(): Promise<Category[]> {
        return this.prisma.category.findMany();
    }
    async findById(id: string): Promise<Category | null> {
        return this.prisma.category.findUnique({where: {id: Number(id)}});
    }

    async updateById(id: string, payload: Prisma.CategoryUpdateInput): Promise<Category> {
        return this.prisma.category.update({
            where: { id: Number(id) },
            data: payload
        });
    }

    async delete(id: string): Promise<Category> {
        return this.prisma.category.delete({ where: { id: Number(id) } });
    }
}