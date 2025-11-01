import { KAFKA_TOPICS } from '../topics';
import { consumer } from "../../config/kafka";

export async function runEmailConsumer() {
    await consumer.subscribe({ topic: "user-created", fromBeginning: false });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const data = JSON.parse(message.value!.toString());
            console.log("📩 New user signup detected:", data.email);

            // Simulate sending email
            await sendWelcomeEmail(data.email, data.name);
        },
    });
}

async function sendWelcomeEmail(email: string, name: string) {
    // You can integrate Mailgun, SendGrid, etc.
    console.log(`✅ Email sent to ${email}: Welcome ${name}!`);
}