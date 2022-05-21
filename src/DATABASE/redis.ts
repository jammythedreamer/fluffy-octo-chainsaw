import redis = require('redis');

const redisClient = redis.createClient({
  url: 'redis://host.docker.internal:6379',
  database: 0,
  password: 'redispassword1',
});

redisClient.connect();

export async function setData(key: string, value: string) {
  await redisClient.set(key, value);
}

export async function getData(key: string) {
  return await redisClient.get(key);
}