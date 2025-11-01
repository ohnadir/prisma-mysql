import { producer } from '../../config/kafka';
import { KAFKA_TOPICS } from '../topics';

export class UserProducer {
    static async sendOTPEvent(data: { name: string; email: string }) {
        
        await producer.send({
            topic: KAFKA_TOPICS.USER_CREATED,
            messages: [{ value: JSON.stringify(data) }],
        });
    }
}