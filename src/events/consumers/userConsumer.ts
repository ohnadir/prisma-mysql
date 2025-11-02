import { consumer } from "../../config/kafka";
import { KAFKA_TOPICS } from "../topics";

export async function runEmailConsumer() {
    try {
        console.log("🚀 Starting email consumer...");
        await consumer.subscribe({ topic: KAFKA_TOPICS.SEND_EMAIL_OTP, fromBeginning: true });

        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                console.log("📩 Message received from Kafka:", message.value?.toString());
                const data = JSON.parse(message.value!.toString());
                await sendWelcomeEmail(data.email, data.name);
            },
        });
    } catch (err) {
        console.error("❌ Consumer failed to start:", err);
    }
}

async function sendWelcomeEmail(email: string, name: string) {
    console.log(`✅ Email sent to ${email}: Welcome ${name}!`);
}
