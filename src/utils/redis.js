import Redis from "ioredis";

const defaultConf = {
    host: process.env.REDIS_HOST || "127.0.0.1",
    port: process.env.REDIS_PORT || 6379,
    username: process.env.REDIS_USER || "default",
    password: process.env.REDIS_PORT || "my-top-secret", 
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