import { createClient } from "redis";

const redisUrl = process.env.REDIS_URL ?? "redis://redis:6379";

const redisClient = createClient({
    url: redisUrl,
});

redisClient.on("error", (error: unknown) => {
    console.error("Redis Client Error", error);
});

export async function ensureRedisConnection() {
    if (!redisClient.isOpen) {
        await redisClient.connect();
    }
}

export { redisClient };
