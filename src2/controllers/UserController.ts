import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/UserService";
import catchAsync from "../../src2/utils/catchAsync";
import sendResponse from "../utils/sendResponse";

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        await this.userService.createUser(req.body);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'Your account has been successfully created. Verify Your Email By OTP. Check your email',
        });
    })

    retrivedProfile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        await this.userService.createUser(req.body);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'Your account has been successfully created. Verify Your Email By OTP. Check your email',
        });
    })

    updateProfile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        await this.userService.createUser(req.body);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'Your account has been successfully created. Verify Your Email By OTP. Check your email',
        });
    })
    
}