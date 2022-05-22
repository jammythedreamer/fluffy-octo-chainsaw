import redis = require('redis');
import { TPR } from '../common/interface';

const redisClient = redis.createClient({
  url: 'redis://host.docker.internal:6379',
  database: 0,
  password: 'redispassword1',
});

redisClient.connect();

export async function setData(key: string, value: string): TPR<void> {
  try {
    await redisClient.set(key, value);
    return [null, null];
  } catch (err) {
    return [null, err];
  }
}

export async function setDataWithExpiry(key: string, value: string, expiryTime: number): TPR<void> {
  try {
    await redisClient.set(key, value, { EX: expiryTime });
    return [null, null];
  } catch (err) {
    return [null, err];
  }
}

export async function getData(key: string): TPR<string> {
  try {
    const value = await redisClient.get(key);
    return [value, null];
  } catch (err) {
    return [null, err];
  }
}

export async function removeData(key: string): TPR<void> {
  try {
    await redisClient.del(key);
    return [null, null];
  } catch (err) {
    return [null, err];
  }
}
