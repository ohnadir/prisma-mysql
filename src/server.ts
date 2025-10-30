import { Server } from "socket.io";
import app from "./app";
import Prisma from "./config/prisma";
import colors from 'colors';
import config from "./config";
import seedSuperAdmin from "./seed/superAdmin";
import { logger } from "./utils/logger";


// Catch uncaught exceptions (synchronous errors not caught anywhere else)
process.on('uncaughtException', error => {

    console.error('Uncaught Exception Detected:', error);
    process.exit(1);
});


let server: any;

async function main() {
    try {

        await Prisma.$connect().then(() =>{
            logger.info(colors.green('🚀 Database connected successfully'));
            seedSuperAdmin();
        })
        .catch((error) => {
            logger.error(colors.red(`❌ Database connection error: ${error?.message}`));
            process.exit(1);
        });


        server = app.listen(Number(config.port), config.ip_address as string, () => {
            logger.info(colors.yellow(`♻️  Application listening on this api: http://${config.ip_address}:${config.port}`));
        });

        //socket
        const io = new Server(server, {
            pingTimeout: 60000,
            cors: {
                origin: '*'
            }
        });

        // socketHelper.socket(io);
        //@ts-ignore
        global.io = io;

    } catch (error) {
        logger.error("❌ Database connection failed:", error);
        process.exit(1);
    }

    // Handle unhandled promise rejections (async errors not caught with try/catch)
    process.on('unhandledRejection', error => {
        if (server) {
            server.close(() => {
                logger.error('Unhandled Rejection Detected:', error);
                process.exit(1);
            });
        } else {
            process.exit(1);
        }
    });
}


main();