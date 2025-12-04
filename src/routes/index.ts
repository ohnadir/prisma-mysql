import express from 'express';
import { UserRoutes } from './userRoutes';
import { BannerRoutes } from './bannerRoutes';
import { CategoryRoutes } from './categoryRoutes';
const router = express.Router();

const apiRoutes = [
    { path: "/user", route: UserRoutes },
    // { path: "/banner", route: BannerRoutes },
    // { path: "/category", route: CategoryRoutes },
]

apiRoutes.forEach(route => router.use(route.path, route.route));
export default router;