import express from 'express';
import { UserRoutes } from './userRoutes';
import { RoomRoutes } from './room.routes';
import { AuthRoutes } from './auth.routes';
const router = express.Router();

const apiRoutes = [
    { path: "/user", route: UserRoutes },
    { path: "/room", route: RoomRoutes },
    { path: "/auth", route: AuthRoutes }
]

apiRoutes.forEach(route => router.use(route.path, route.route));
export default router;