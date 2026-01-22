import { Queue, Worker, QueueEvents } from "bullmq";
import config from "../config";
import { emailTemplate } from "../utils/emailTemplate";
import { emailHelper } from "../helpers/emailHelper";

const bullConnection = {
    host: config.bullConnection.host,
    port: config.bullConnection.port,
    enableReadyCheck: false,
    maxRetriesPerRequest: null
}

// Queue for scheduling status updates
export const emailVerificationQueue = new Queue("verification-otp-job", { connection: bullConnection });

export const emailVerificationWorker = new Worker(
    "verification-otp-job",
    async (job) => {
        const { email, name, otp } = job.data;

        try {
            const createAccountTemplate = emailTemplate.createAccount({ email, name, otp });
            await emailHelper.sendEmail(createAccountTemplate);

        } catch (error: any) {
            console.error(`❌ Failed to send OTP to ${email}: ${error.message}`);
            throw error;
        }
    },
    { connection: bullConnection }
);

const queueEvents = new QueueEvents("verification-otp-job", { connection: bullConnection });
queueEvents.on("failed", ({ jobId, failedReason }) => {
    console.error(`❌ Job ${jobId} failed: ${failedReason}`);
});