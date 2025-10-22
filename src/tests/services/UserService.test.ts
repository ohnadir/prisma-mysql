import { UserRepository } from "../../repositories/UserRepository";
import { UserService } from "../../services/UserService";


jest.mock("../../src/repositories/UserRepository");

const mockUserRepo = new UserRepository() as jest.Mocked<UserRepository>;
const userService = new UserService();

describe("UserService", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should create a user successfully", async () => {
        mockUserRepo.findByEmail.mockResolvedValue(null);
        mockUserRepo.create.mockResolvedValue({ name: "Nadir", email: "nadir@example.com", password: "hashedpassword" } as any);

        const result = await userService.createUser({
            name: "Nadir",
            email: "nadir@example.com",
            password: "secret",
        } as any);

        expect(result).toHaveProperty("email", "nadir@example.com");
        expect(mockUserRepo.create).toHaveBeenCalledTimes(1);
    });

    it("should throw error if user already exists", async () => {
        mockUserRepo.findByEmail.mockResolvedValue({email: "nadir@example.com" } as any);

        await expect(
            userService.createUser({ name: "Nadir", email: "nadir@example.com", password: "secret" } as any)
        ).rejects.toThrow("User already exists");
    });
});
