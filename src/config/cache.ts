import { RedisOptions } from 'ioredis';

interface ICacheConfig {
  driver: 'redis';

  configs: {
    redis: RedisOptions;
  };
}

export default {
  driver: process.env.CACHE_DRIVER,

  configs: {
    redis: {
      port: Number(process.env.REDIS_PORT),
      host: process.env.REDIS_HOST,
      password: process.env.REDIS_PASSWORD || undefined,
    },
  },
} as ICacheConfig;
