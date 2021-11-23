import { createClient } from "redis";

const port = parseInt(process.env.REDIS_PORT) ?? 6379;
export const redisClient = createClient(port, process.env.REDIS_HOST);
