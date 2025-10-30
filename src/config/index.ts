import dotenv from "dotenv";
import path from "path";

dotenv.config({
    path: path.join(process.cwd(), '.env'),
    processEnv: {},
    quiet: true
}).parsed;

export default{
    ip_address: process.env.IP,
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
    node_env: process.env.NODE_ENV,
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
    jwt: {
        jwt_secret: process.env.JWT_SECRET,
        jwt_expire_in: process.env.JWT_EXPIRE_IN,
        jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
        jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN
    },
    stripe:{
        stripeSecretKey:process.env.STRIPE_API_SECRET,
        webhookSecret:process.env.STRIPE_WEBHOOK_SECRET
    },
    email:{
        from: process.env.EMAIL_FROM,
        user: process.env.EMAIL_USER,
        port: process.env.EMAIL_PORT,
        host: process.env.EMAIL_HOST,
        pass: process.env.EMAIL_PASS
    },
    admin: {
        email:process.env.ADMIN_EMAIL!,
        password: process.env.ADMIN_PASSWORD,
        name: process.env.ADMIN_NAME || 'Super Admin',
    },
    img_url: process.env.IMG_URL,
    bullConnection: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT) || 6379
    }
}