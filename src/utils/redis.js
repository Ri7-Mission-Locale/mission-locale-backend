import Redis from "ioredis";

// Redis global configuration
const defaultConf = {
    host: process.env.REDIS_HOST || "0.0.0.0",
    port: process.env.REDIS_PORT || 6379,
    username: process.env.REDIS_USER || undefined,
    password: process.env.REDIS_PASSWORD || undefined
}

const userCache = new Redis({
    name: "user",
    db: 0,
    ...defaultConf
});

const tokenCache = new Redis({
    name: "tokens",
    db: 1,
    ...defaultConf
});

const meetingCache = new Redis({
    name: "meeting",
    db: 2,
    ...defaultConf
});

const messageCache = new Redis({
    name: "message",
    db: 3,
    ...defaultConf
});
const workshopCache = new Redis({
    name: "workshop",
    db: 3,
    ...defaultConf,
  });


export default { userCache, tokenCache, meetingCache, messageCache, workshopCache };
