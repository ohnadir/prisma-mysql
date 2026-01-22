import { Request, Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";
import { RoomService } from "../services/room.service";

export class RoomController {
    private roomService: RoomService;

    constructor() {
        this.roomService = new RoomService();
    }

    createRoom = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const result = await this.roomService.createToDB(req.body);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'Room created successfully',
            data: result
        });
    })

    retrievedRooms = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const result = await this.roomService.retrieveFromDB();
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'Rooms retrieved successfully',
            data: result
        });
    })
}