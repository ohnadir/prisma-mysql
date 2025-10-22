import { StatusCodes } from "http-status-codes";
import ApiError from "./ApiError";

export const checkPrismaIDValidation = (id: string, name = "ID"): void => {
    
    // Check if ID is missing
    if (!id) {
        throw new ApiError(StatusCodes.BAD_REQUEST, `${name} is required`);
    }

    // Check if ID is a valid integer
    const numericId = Number(id);
    if (!Number.isInteger(numericId) || numericId <= 0) {
        throw new ApiError(StatusCodes.BAD_REQUEST, `Invalid ${name} (must be a positive integer)`);
    }

    return;
};
