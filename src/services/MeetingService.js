import { PrismaClient } from "@prisma/client";
import redis from "../utils/redis.js";


class MeetingService {
cache = redis.meetingCache
prisma = new PrismaClient(); 



}

export default MeetingService