import { ROLES } from "../enum/user";
import { FcmToken } from "./fcmToken.types";

export interface IUser {
    id: number | null;
    name: string;
    role: ROLES;
    email: string;
    contact?: string | null;
    password: string;
    location?: string | null;
    profile?: string | null;
    verified: boolean;
    authentication?: any | null;
    fcmTokens: FcmToken[];
    createdAt?: Date;
    updatedAt?: Date;
}