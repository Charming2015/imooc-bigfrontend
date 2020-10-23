import { getValue } from '@/db/redis';
export const checkCode = async (key, value) => {
  const redisData = await getValue(key);
  return redisData != null && redisData.toLowerCase() === value.toLowerCase();
};
