import { StatusCodes } from "http-status-codes";
import ApiError from "../utils/ApiError";
import { Prisma } from "@prisma/client";
import unlinkFile from "../utils/unlinkFile";
import { CategoryRepository } from "../repositories/CategoryRepository";

export class CategoryService {
    private categoryRepository: CategoryRepository;

    constructor() {
        this.categoryRepository = new CategoryRepository();
    }

    async createToDB(data: Prisma.CategoryCreateInput) {

        const category = await this.categoryRepository.create(data);
        if (!category) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to create category");
        }
        return category;
    }

    async retrieveFromDB() {
        const categories = await this.categoryRepository.retrieve();
        return categories;
    }

    async updateToDB(id: string, data: Prisma.CategoryUpdateInput) {

        // check if category exists
        const isExistCategory = await this.categoryRepository.findById(id);
        if (!isExistCategory) {
            throw new ApiError(StatusCodes.NOT_FOUND, "Category not found");
        }

        // if image is being updated, delete the old image file
        if(data.image){
            unlinkFile(isExistCategory.image);
        }

        // proceed to update
        const updatedCategory = await this.categoryRepository.updateById(id, data);
        if (!updatedCategory) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to update Category");
        }
        return updatedCategory;
    }

    async deleteFromDB(id: string) {

        // check if  exists
        const isExistCategory = await this.categoryRepository.findById(id);
        if (!isExistCategory) {
            throw new ApiError(StatusCodes.NOT_FOUND, "Category not found");
        }

        // delete the old image file
        unlinkFile(isExistCategory.image);

        const category = await this.categoryRepository.delete(id);
        if (!category) {
            throw new ApiError(StatusCodes.NOT_FOUND, "Category not found");
        }
        return category;
    }
}
