import express from 'express';
import validateRequest from '../middlewares/validateRequest';
import { createRoomSchema } from '../validators/room.validator';
import { RoomController } from '../controllers/room.controller';
const router = express.Router();

const roomController = new RoomController();

router.route('/')
    .post(
        
        validateRequest(createRoomSchema),
        roomController.createRoom,
    )

export const RoomRoutes = router;