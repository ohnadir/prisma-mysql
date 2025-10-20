import { IUser } from "./user.types";

export interface FcmToken {
    id: number;
    token: string;
    userId: number;
    user: IUser; // Relation to User
}