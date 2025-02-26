import { PrismaClient } from "@prisma/client";
import redis from "../utils/redis.js";

class CounsellorService {
    cache = redis.userCache;
    database = new PrismaClient()

    async create(data) {
        const user = await this.database.employee.create({ data})
        console.log(user)
        if (user) await this.saveToCache(user);
        return user;
    }

    async getById(id) {
        let user = await this.getFromCacheById(id);
        if (user) return user;
        user = await this.database.employee.findUnique({ where: { id_employee: id } });
        return user;
    }

    async getByMail(email) {
        let user = await this.getFromCacheByMail(email);
        return user ? user : await this.database.employee.findUnique({ where: { email } })
    }

    async getAll() {
        let user = await this.getFromCacheByMail(email);
        return user ? user : await this.database.employee.findUnique({ where: { email } })
    }

    async update(id, data) {
        const user = await this.database.employee.update({where: { id_employee: id },data })
        if (user) this.saveToCache(user);
        return user
    }
    
    async delete(id) {
        const user = await this.database.employee.delete({ where: { id_employee: id }});
        //if (user) await this.delFromCache(user);
        return user;
    }

    /* 
        REDIS CACHE
     */
    // Get user from redis cache by id.
    async getFromCacheById(id) {
        return await this.cache.get(`user:${id}`);
    }

    
    // Get user from redis cache by mail.
    async getFromCacheByMail(mail) {
        const id = await this.cache.get(`user:${mail}`);
        return id ? await this.getFromCacheById(id) : null;
    }

    // Save user in redis cache
    async saveToCache(user) {
        return await Promise.all([
            this.cache.set(`user:${user.id_employee}`, JSON.stringify(user), 'EX', 60 * 60),
            this.cache.set(`user:${user.email}`, user.id_employee, 'EX', 60 * 60)
        ])
    }

     // Delete user from redis cache
    async delFromCache(user) {
        return await Promise.all([
            this.cache.del(`user:${user.id_employee}`),
            this.cache.del(`user:${user.email}`)
        ])
    }
}

export default CounsellorService;