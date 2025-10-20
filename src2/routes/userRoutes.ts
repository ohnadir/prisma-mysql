import express, { NextFunction, Response, Request } from 'express';
import validateRequest from '../middlewares/validateRequest';
import { createUserSchema } from '../validators/userValidator';
import { UserController } from '../controllers/UserController';
const router = express.Router();
const userController = new UserController();

router.route('/')
    .post(
        validateRequest(createUserSchema),
        userController.createUser,
    )

export const UserRoutes = router;