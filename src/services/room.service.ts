import { StatusCodes } from "http-status-codes";
import ApiError from "../utils/ApiError";
import { RoomRepository } from "../repositories/room.repository";
import type { Prisma } from "@prisma/client";
import prisma from "../config/prisma";

export class RoomService {
    private roomRepository: RoomRepository;

    constructor() {
        this.roomRepository = new RoomRepository(prisma);
    }

    async createToDB(data: Prisma.RoomCreateInput) {

        const room = await this.roomRepository.create(data);
        if (!room) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to create room");
        }
        return room;
    }

    async retrieveFromDB() {
        const rooms = await this.roomRepository.retrieve();
        return rooms;
    }
}
