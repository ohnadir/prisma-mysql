import { kafkaConsumer } from '../../config/kafka';
import { KAFKA_TOPICS } from '../topics';

export const runUserConsumer = async () => {
    await kafkaConsumer.connect();
    await kafkaConsumer.subscribe({ topic: KAFKA_TOPICS.USER_CREATED, fromBeginning: true });

    await kafkaConsumer.run({
        eachMessage: async ({ topic, message }) => {
            console.log(`📩 [${topic}] => ${message.value?.toString()}`);
            // এখানে তুমি ইচ্ছা করলে notification/email service trigger করতে পারো
        },
    });
};
