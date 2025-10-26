import { Request, Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";
import { BannerService } from "../services/BannerService";

export class BannerController {
    private bannerService: BannerService;

    constructor() {
        this.bannerService = new BannerService();
    }

    createBanner = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const result = await this.bannerService.createToDB(req.body);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'Banner created successfully',
            data: result
        });
    })

    retrivedBanners = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const result = await this.bannerService.retrieveFromDB();
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'Banners retrieved successfully',
            data: result
        });
    })

    updateBanner = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const result = await this.bannerService.updateToDB(req.params.id, req.body);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'Banner updated successfully',
            data: result
        });
    })

    deleteBanner = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const result = await this.bannerService.deleteFromDB(req.params.id);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'Banner deleted successfully',
            data: result
        });
    })
    
}