import { Server } from "socket.io";
import app from "./app";
import seedSuperAdmin from "./seed/superAdmin";
import Prisma from "./config/prisma";
import colors from 'colors';
import config from "./config";


// Catch uncaught exceptions (synchronous errors not caught anywhere else)
process.on('uncaughtException', error => {

    console.error('Uncaught Exception Detected:', error);
    process.exit(1);
});


let server: any;

async function main() {
    try {

        await Prisma.$connect();
        console.log(colors.green('🚀 Database connected successfully'));

        seedSuperAdmin();

        server = app.listen(Number(config.port), config.ip_address as string, () => {
            console.log(colors.yellow(`♻️  Application listening on this api: http://${config.ip_address}:${config.port}`));
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
        console.error("❌ Database connection failed:", error);
        process.exit(1);
    }

    // Handle unhandled promise rejections (async errors not caught with try/catch)
    process.on('unhandledRejection', error => {
        if (server) {
            server.close(() => {
                console.error('Unhandled Rejection Detected:', error);
                process.exit(1);
            });
        } else {
            process.exit(1);
        }
    });
}


main();