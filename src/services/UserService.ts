import { UserRepository } from "../repositories/UserRepository";
import { IUser } from "../types/user.types";
import { StatusCodes } from "http-status-codes";
import ApiError from "../utils/ApiError";

export class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    // Create a new user
    async createUser(data: IUser) {
        // Example: check if user already exists
        const existingUser = await this.userRepository.findByEmail(data.email);
        if (existingUser) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "User already exists");
        }

        // Add more business logic if needed (e.g., hash password)
        const newUser = await this.userRepository.create(data);
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
    async updateUser(id: string, data: Omit<IUser, "id">) {
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
