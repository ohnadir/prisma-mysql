import Redis from 'ioredis';
import colors from 'colors';
import config from '../config';
import { errorLogger, logger } from '../utils/logger';

const redisClient = new Redis({
    host: config.redis.host as string,
    port: Number(config.redis.port),
});

export const connectRedis = () => {
    redisClient.on('connect', () => {
        logger.info(colors.green('🟥 Redis Database connected successfully'));
    });

    redisClient.on('error', (error) => {
        errorLogger.error('Redis connection error', error);
    });
}

export default redisClient;