import { ROLES } from "../../../enum/user";

interface IStripeAccountInfo {
    status?: boolean;
    stripeAccountId?: string;
    externalAccountId?: string;
    currency?: string;
    accountUrl?: string;
}

interface IAuthenticationProps {
    isResetPassword: boolean;
    oneTimeCode: number;
    expireAt: Date;
}

export type IUser = {
    name: string | undefined;
    role: ROLES;
    contact: string;
    email: string;
    password: string;
    location: string;
    fcmToken: string[];
    profile: string;
    verified: boolean;
    authentication?: IAuthenticationProps;
}