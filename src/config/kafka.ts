import { Kafka, Partitioners } from 'kafkajs';
import dotenv from "dotenv";
import path from "path";
import { logger } from '../utils/logger';
import colors from 'colors';

dotenv.config({
  path: path.join(process.cwd(), '.env')
});

export const kafka = new Kafka({
  clientId: 'my-node-app',
  brokers: ['localhost:9092'],
});

export const producer = kafka.producer({
  createPartitioner: Partitioners.LegacyPartitioner,
});
export const consumer = kafka.consumer({ groupId: 'my-node-group' });

export async function connectKafka() {
  await producer.connect();
  await consumer.connect();
  logger.info(colors.green('⚡ Kafka Connected'));
}