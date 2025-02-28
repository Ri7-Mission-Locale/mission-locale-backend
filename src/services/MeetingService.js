import { PrismaClient } from "@prisma/client";
import redis from "../utils/redis.js";


class MeetingService {
    cache = redis.meetingCache
    prisma = new PrismaClient();

    KEY_ALL_MEETINGS = 'meetings:all'
    keyOneMeeting(id) {
        return `meetings:${id}`
    }

    //Create meeting in database and cache
    async create(data) {
        const meeting = await this.prisma.meeting.create({
            data: {
                title: data.title,
                content: data.content,
                startDate: new Date(data.startDate),
                endDate: data.endDate ? new Date(data.endDate) : undefined,
                urgent: data.urgent,
                id_member: data.id_member
            },
        });
        if (meeting) {
            await this.delFromCache(this.KEY_ALL_MEETINGS)
        }
        return meeting
    }

    //Get all meetings from cache or database

    async getAll() {
        const cacheData = await this.cache.get(this.KEY_ALL_MEETINGS)
        if (cacheData) {
            return JSON.parse(cacheData)
        }

        const meeting = await this.prisma.meeting.findMany()
        await this.cache.set(this.KEY_ALL_MEETINGS, JSON.stringify(meeting), 'EX', 60)
        return meeting;
    }



    // Get meeting by ID from database or cache
    async getById(id) {
        const parsedId = parseInt(id, 10);
        const cacheKey = this.keyOneMeeting(parsedId);

        const cachedData = await this.cache.get(cacheKey);
        if (cachedData) {
            return JSON.parse(cachedData);
        }

        const meeting = await this.prisma.meeting.findUnique({
            where: { id: parsedId },
        });

        if (meeting) {
            await this.cache.set(cacheKey, JSON.stringify(meeting), 'EX', 60);
        }

        return meeting;
    }




    // Update meetinf in database and cache 
    async update(id, data) {
        const parsedId = parseInt(id, 10);

        const meeting = await this.prisma.meeting.update({
            where: { id: parsedId },
            data: {
                title: data.title,
                content: data.content,
                startDate: data.startDate ? new Date(data.startDate) : undefined,
                endDate: data.endDate ? new Date(data.endDate) : undefined,
                urgent: data.urgent,
                id_member: data.id_member
            
            },
        });

        if (meeting) {
            await this.delFromCache(this.KEY_ALL_MEETINGS);
            await this.delFromCache(this.keyOneMeeting(parsedId));
        }

        return meeting;
    }



// Deleye meeting from database and cache
    async delete(id) {
        const parsedId = parseInt(id, 10);

        const workshop = await this.prisma.meeting.delete({
            where: { id: parsedId },
        });

        if (workshop) {
            await this.delFromCache(this.KEY_ALL_MEETINGS);
            await this.delFromCache(this.keyOneMeeting(parsedId));
        }

        return workshop;
    }


    /* REDIS CACHE */
    // Delete from redis cache
    async delFromCache(key) {
        await this.cache.del(key);
    }

}

export default MeetingService