import { Request, Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";
import { CategoryService } from "../services/CategoryService";

export class CategoryController {
    private categoryService: CategoryService;

    constructor() {
        this.categoryService = new CategoryService();
    }

    createCategory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const result = await this.categoryService.createToDB(req.body);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'Category created successfully',
            data: result
        });
    })

    retrivedCategories = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const result = await this.categoryService.retrieveFromDB();
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'Category retrieved successfully',
            data: result
        });
    })

    updateCategory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const result = await this.categoryService.updateToDB(req.params.id, req.body);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'Category updated successfully',
            data: result
        });
    })

    deleteCategory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const result = await this.categoryService.deleteFromDB(req.params.id);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'Category deleted successfully',
            data: result
        });
    })
    
}