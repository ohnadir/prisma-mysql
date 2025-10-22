import express from 'express';
import { UserRoutes } from './userRoutes';
const router = express.Router();

const apiRoutes = [
    { path: "/user", route: UserRoutes },
]

apiRoutes.forEach(route => router.use(route.path, route.route));
export default router;