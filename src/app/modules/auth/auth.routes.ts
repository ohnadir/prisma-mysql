import express, { NextFunction, Request, Response } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';
const router = express.Router();

router.post('/login',
    validateRequest(AuthValidation.loginZodSchema),
    AuthController.loginUser
);
export const AuthRoutes = router;