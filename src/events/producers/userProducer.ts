import { producer } from '../../config/kafka';
import { KAFKA_TOPICS } from '../topics';

export async function sendEmailCreatedEvent(emailData: {name: string, email: string}) {
    await producer.send({
        topic: "user-created",
        messages: [
            {
                key: String(emailData.email),
                value: JSON.stringify(emailData),
            },
        ],
    });

    console.log("📤 Kafka Event Sent: user-created");
}