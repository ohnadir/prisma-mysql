import { Request, Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";
import { AuthService } from "../services/auth.service";

export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const result = await this.authService.login(req.body);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'Logged in successful',
            data: result
        });
    });

    logout = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const result = await this.authService.logout(req.user, req.body.fcmTokens);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'Logged out successful',
            data: result
        });
    });
}