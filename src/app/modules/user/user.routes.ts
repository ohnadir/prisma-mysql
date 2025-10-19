import express, { NextFunction, Response, Request } from 'express';
import { UserController } from './user.controller';
import { createUserSchema } from './user.validation';
import validateRequest from '../../middlewares/validateRequest';
import fileUploadHandler from '../../middlewares/fileUploaderHandler';
const router = express.Router();

router.route('/')
    .post(
        validateRequest(createUserSchema),
        // fileUploadHandler(),
        UserController.createUser,
        
    )

export const UserRoutes = router;