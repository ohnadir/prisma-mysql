import express, { NextFunction, Response, Request } from 'express';
import validateRequest from '../middlewares/validateRequest';
import { CategoryController } from '../controllers/CategoryContoller';
import fileUploadHandler from '../middlewares/fileUploaderHandler';
import { getSingleFilePath } from '../utils/getFilePath';
import ApiError from '../utils/ApiError';
import { StatusCodes } from 'http-status-codes';
import { createCategoryValidationSchema } from '../validators/categoryValidator';
const router = express.Router();

const categoryController = new CategoryController();

router.route('/')
    .post(
        fileUploadHandler(),
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                const image = await getSingleFilePath(req.files, 'image');

                req.body = {
                    ...req.body,
                    image: image
                };
                next();

            } catch (error) {
                throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to Process Category");
            }
        },
        validateRequest(createCategoryValidationSchema),
        categoryController.createCategory,
    )
    .get(
        categoryController.retrivedCategories
    );


router.route('/:id')
    .patch(
        fileUploadHandler(), 
        async(req: Request, res: Response, next: NextFunction) => {
            try {
                const image = await getSingleFilePath(req.files, 'image');

                req.body = {
                    ...req.body,
                    image: image
                };
                next();

            } catch (error) {
                throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to Process Category");
            }
        },
        categoryController.updateCategory
    )
    .delete(
        categoryController.deleteCategory
    );

export const CategoryRoutes = router;