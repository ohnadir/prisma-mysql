import request from "supertest";
import express from "express";
import { UserController } from "../../controllers/UserController";

const app = express();
app.use(express.json());
const controller = new UserController();

app.post("/api/users", controller.createUser);

describe("UserController (Integration)", () => {
    it("should return 201 when user created", async () => {
        const response = await request(app)
            .post("/api/users")
            .send({ name: "Nadir", email: "nadir@example.com", password: "secret" });

        expect(response.status).toBe(201);
    });
});
