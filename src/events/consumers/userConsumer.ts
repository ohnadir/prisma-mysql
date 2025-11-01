import { consumer } from '../../config/kafka';
import { KAFKA_TOPICS } from '../topics';

export const runUserConsumer = async () => {
    await consumer.subscribe({ topic: KAFKA_TOPICS.USER_CREATED, fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, message }) => {
            console.log(`📩 [${topic}] => ${message.value?.toString()}`);
            // এখানে তুমি ইচ্ছা করলে notification/email service trigger করতে পারো
        },
    });
};
