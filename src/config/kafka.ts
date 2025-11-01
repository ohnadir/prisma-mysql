import { Kafka } from 'kafkajs';
import dotenv from "dotenv";
import path from "path";

dotenv.config({
    path: path.join(process.cwd(), '.env'),
    processEnv: {},
    quiet: true
}).parsed;

export const kafka = new Kafka({
    clientId: 'my-node-app',
    brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
});

export const producer = kafka.producer();
export const consumer = kafka.consumer({ groupId: 'my-node-group' });

export async function connectKafka() {
  await producer.connect();
  await consumer.connect();
  console.log("✅ Kafka Connected");
}