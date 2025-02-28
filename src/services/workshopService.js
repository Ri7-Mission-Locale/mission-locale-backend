import { PrismaClient } from "@prisma/client";
import redis from "../utils/redis.js";

class WorkshopService {
    cache = redis.workshopCache;
    database = new PrismaClient();

    // Clés de cache
    KEY_ALL_WORKSHOPS = 'workshops:all';

    // Générer une clé pour un workshop spécifique
    keyOneWorkshop(id) {
        return `workshops:${id}`;
    }

    /* Create workshop in database and cache */
    async create(data) {
        const workshop = await this.database.workshop.create({
            data: {
                title: data.title,
                content: data.content,
                startDate: new Date(data.startDate),
                endDate: new Date(data.endDate),
                tags: {
                    connectOrCreate: data.tags.map((tagName) => ({
                        where: { name: tagName },
                        create: { name: tagName },
                    })),
                },
            },
        });

        if (workshop) {
            await this.delFromCache(this.KEY_ALL_WORKSHOPS); // Invalider le cache global
        }

        return workshop;
    }

    /* Get all workshops from cache or database */
    async getAll() {
        const cachedData = await this.cache.get(this.KEY_ALL_WORKSHOPS);
        if (cachedData) {
            return JSON.parse(cachedData);
        }

        const workshops = await this.database.workshop.findMany({
            include: { tags: true },
        });

        await this.cache.set(this.KEY_ALL_WORKSHOPS, JSON.stringify(workshops), 'EX', 60);

        return workshops;
    }

    /* Get workshop by ID from database or cache */
    async getById(id) {
        const parsedId = parseInt(id, 10);
        const cacheKey = this.keyOneWorkshop(parsedId);

        const cachedData = await this.cache.get(cacheKey);
        if (cachedData) {
            return JSON.parse(cachedData);
        }

        const workshop = await this.database.workshop.findUnique({
            where: { id: parsedId },
            include: { tags: true },
        });

        if (workshop) {
            await this.cache.set(cacheKey, JSON.stringify(workshop), 'EX', 60);
        }

        return workshop;
    }

    /* Update workshop in database and cache */
    async update(id, data) {
        const parsedId = parseInt(id, 10);

        const workshop = await this.database.workshop.update({
            where: { id: parsedId },
            data: {
                title: data.title,
                content: data.content,
                startDate: new Date(data.startDate),
                endDate: new Date(data.endDate),
                tags: {
                    set: [],
                    connectOrCreate: data.tags.map((tagName) => ({
                        where: { name: tagName },
                        create: { name: tagName },
                    })),
                },
            },
            include: { tags: true },
        });

        if (workshop) {
            await this.delFromCache(this.KEY_ALL_WORKSHOPS);
            await this.delFromCache(this.keyOneWorkshop(parsedId));
        }

        return workshop;
    }

    /* Delete workshop from database and cache */
    async delete(id) {
        const parsedId = parseInt(id, 10);

        const workshop = await this.database.workshop.delete({
            where: { id: parsedId },
        });

        if (workshop) {
            await this.delFromCache(this.KEY_ALL_WORKSHOPS);
            await this.delFromCache(this.keyOneWorkshop(parsedId));
        }

        return workshop;
    }

    /* REDIS CACHE */
    // Delete from redis cache
    async delFromCache(key) {
        await this.cache.del(key);
    }
}

export default WorkshopService;
