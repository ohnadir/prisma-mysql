import express, { NextFunction, Response, Request } from 'express';
import validateRequest from '../middlewares/validateRequest';
import { BannerController } from '../controllers/BannerController';
import fileUploadHandler from '../middlewares/fileUploaderHandler';
import { getSingleFilePath } from '../utils/getFilePath';
import ApiError from '../utils/ApiError';
import { StatusCodes } from 'http-status-codes';
import { createBannerValidationSchema } from '../validators/bannerValidator';
const router = express.Router();

const bannerController = new BannerController();

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
                throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to Process Banner");
            }
        },
        validateRequest(createBannerValidationSchema),
        bannerController.createBanner,
    )
    .get(
        bannerController.retrivedBanners
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
                throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to Process Banner");
            }
        },
        bannerController.updateBanner
    )
    .delete(
        bannerController.deleteBanner
    );

export const BannerRoutes = router;