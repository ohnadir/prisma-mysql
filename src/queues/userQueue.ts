import { Queue, Worker, QueueEvents } from "bullmq";
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from "@prisma/client";
import config from "../config";

const adapter = new PrismaMariaDb({
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    database: config.database.name,
    port: config.database.port,
    connectionLimit: 10,
});

const Prisma = new PrismaClient({ adapter, log: ['error', 'warn'], });

const bullConnection = {
    host: config.bullConnection.host,
    port: config.bullConnection.port,
    enableReadyCheck: false,
    maxRetriesPerRequest: null
}

// Queue for scheduling status updates
export const userQueue = new Queue("user-verification-check", { connection: bullConnection });

// Worker — runs in worker.js normally
export const userWorker = new Worker(
    "user-verification-check",
    async (job) => {
        const { userId } = job.data;
        console.log(`⏳ Processing job for delete unverified accounts: User ID ${userId}`);

        try {
            const isExisting = await Prisma.user.findUnique({ where: { id: userId } });

            if (!isExisting?.verified) {
                await Prisma.user.delete({
                    where: { id: userId }
                });
            }
            console.log(`✅ User unverified account ${userId} delete to accepted`);

        } catch (error: any) {
            console.error(`❌ Failed to process user verification check for User ID ${userId}: ${error?.message}`);
            throw error;
        }
    },
    { connection: bullConnection }
);

const queueEvents = new QueueEvents("user-verification-check", { connection: bullConnection });
queueEvents.on("failed", ({ jobId, failedReason }) => {
    console.error(`❌ Job ${jobId} failed: ${failedReason}`);
});