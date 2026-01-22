import { UserRepository } from "../repositories/UserRepository";
import { StatusCodes } from "http-status-codes";
import ApiError from "../utils/ApiError";
import { emailVerificationQueue } from "../queues/emailVerificationQueue";
import generateOTP from "../utils/generateOTP";
import type { Prisma } from "@prisma/client";
import prisma from "../config/prisma";

export class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository(prisma);
    }

    // Create a new user
    async createUser(data: Prisma.UserCreateInput) {

        // Example: check if user already exists
        const existingUser = await this.userRepository.findByEmail(data.email);
        if (existingUser) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "User already exists");
        }

        const otp = generateOTP();

        data.authentication = {
            isResetPassword: false,
            oneTimeCode: otp,
            expireAt: new Date(Date.now() + 3 * 60 * 1000).toISOString()
        };

        const newUser = await this.userRepository.create(data);

        if (!newUser) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to create user");
        }

        await emailVerificationQueue.add(
            "verification-otp-job",
            { email: data.email, name: data.name, otp: otp },
            {
                attempts: 3,
                backoff: { type: "exponential", delay: 3000 },
                removeOnComplete: true,
                removeOnFail: { age: 24 * 60 * 60 } // remove failed jobs after 24h
            }
        );

        return newUser;
    }

    // Get user by ID
    async getUserById(id: string) {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
        }
        return user;
    }

    // Update user
    async updateUser(id: string, data: Prisma.UserUpdateInput) {
        const updatedUser = await this.userRepository.update(id, data);
        return updatedUser;
    }

    // Delete user
    async deleteUser(id: string) {
        const user = await this.userRepository.delete(id);
        if (!user) {
            throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
        }
        return { message: "User deleted successfully" };
    }
}
