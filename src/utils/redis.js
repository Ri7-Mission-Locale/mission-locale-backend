import Redis from "ioredis";

// Redis global configuration
const defaultConf = {
    host: process.env.REDIS_HOST || "0.0.0.0",
    port: process.env.REDIS_PORT || 6379,
    username: process.env.REDIS_USER || undefined,
    password: process.env.REDIS_PASSWORD || undefined
}

// Store existing caches
const caches = new Map();

// Get cache from store or create cache and store it
function getCache(name) {
    let cache = caches.get(name);
    if (cache) return cache;
    cache = new Redis({ name, db: caches.size, ...defaultConf });
    caches.set(name, cache);
    return cache;
}

export default getCache;