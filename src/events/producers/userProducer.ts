import { kafkaProducer } from '../../config/kafka';
import { KAFKA_TOPICS } from '../topics';

export class UserProducer {
    static async sendUserCreatedEvent(data: { id: string; email: string }) {
        await kafkaProducer.connect();
        await kafkaProducer.send({
            topic: KAFKA_TOPICS.USER_CREATED,
            messages: [{ value: JSON.stringify(data) }],
        });
        await kafkaProducer.disconnect();
    }
}