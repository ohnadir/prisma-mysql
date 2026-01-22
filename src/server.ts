import { Server } from "socket.io";
import app from "./app";
import colors from 'colors';
import config from "./config";
import seedSuperAdmin from "./seed/superAdmin";
import { logger } from "./utils/logger";
import Prisma from "./config/prisma";
import { connectRedis } from "./config/redis";

// Catch uncaught exceptions (synchronous errors not caught anywhere else)
process.on('uncaughtException', error => {
    console.error('Uncaught Exception Detected:', error);
    process.exit(1);
});


let server: any;

async function main() {
    try {

        // Connect to Redis
        connectRedis();

        await Prisma.$connect().then(() =>{
            logger.info(colors.green('🚀 Database connected successfully'));
            seedSuperAdmin();
        }).catch((error:any) => {
            logger.error(colors.red(`❌ Database connection error: ${error?.message}`));
            process.exit(1);
        });

        server = app.listen(Number(config.port), config.ip_address as string, async () => {
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

const shutdown = async (signal: string) => {
  logger.info(`🧩 ${signal} received — shutting down gracefully...`);

  try {
    if (server) {
      logger.info("🛑 Closing HTTP server...");
      await new Promise<void>((resolve) => server.close(() => resolve()));
    }

    logger.info("💾 Disconnecting Prisma...");
    await Prisma.$disconnect();

    logger.info("✅ Shutdown complete. Exiting process.");
    process.exit(0);
  } catch (err) {
    logger.error("❌ Error during shutdown:", err);
    process.exit(1);
  }
};

process.on("SIGTERM", () => shutdown("SIGTERM")); // production
process.on("SIGINT", () => shutdown("SIGINT"));   // local Ctrl+C