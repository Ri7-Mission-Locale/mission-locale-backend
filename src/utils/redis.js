import Redis from "ioredis";

// Redis global configuration
const defaultConf = {
    host: process.env.REDIS_HOST || "0.0.0.0",
    port: process.env.REDIS_PORT || 6379,
 
}

const userCache = new Redis({
    name: "user",
    db: 0,
    ...defaultConf
});

const meetingCache = new Redis({
    name: "meeting",
    db: 1,
    ...defaultConf
});

const messageCache = new Redis({
    name: "message",
    db: 2,
    ...defaultConf
});

export default { userCache, meetingCache, messageCache };