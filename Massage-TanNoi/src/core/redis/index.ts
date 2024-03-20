import Redis from 'ioredis';

import loggerHelper from '@utils/logger.util';

const logger = loggerHelper.getLogger('core.redis');
class RedisClient {
  private static instance: RedisClient;

  client: Redis.Redis;

  constructor() {
    // wait for ioredis types update
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const retryStrategy = (times) => {
      const delay = Math.min(times * 100, 2000);
      return delay;
    };

    
      this.client = new Redis(process.env.REDIS_URL, {
        retryStrategy,
      });
    
    this.client.on('ready', () => {
      const events = process.env.REDIS_NOTIFICATION_KEYSPACE_EVENTS || 'Egx';
      this.client.config('SET', 'notify-keyspace-events', events);
      logger.info('redis is ready!');
    });
    this.client.on('error', (error: any) => {
      logger.error('redisClient ERROR', error);
    });
  }

  static getInstance() {
    if (!RedisClient.instance) {
      RedisClient.instance = new RedisClient();
    }
    return RedisClient.instance;
  }
}

export default RedisClient.getInstance();
