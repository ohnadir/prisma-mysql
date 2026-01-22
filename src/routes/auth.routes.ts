import express from 'express';
import validateRequest from '../middlewares/validateRequest';
import { authZodValidationSchema } from '../validators/auth.validator';
import { AuthController } from '../controllers/auth.controller';
import auth from '../middlewares/auth';
import { ROLES } from '../enum/user';
const router = express.Router();

const authController = new AuthController();

router.post(
    '/login',
    validateRequest(authZodValidationSchema),
    authController.login
);

router.post(
    '/logout',
    auth(ROLES.USER),
    authController.logout
);

export const AuthRoutes = router;