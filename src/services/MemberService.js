import { PrismaClient } from "@prisma/client";
import redis from "../utils/redis";

class MemberService {
    cache = redis.userCache;
    database = new PrismaClient()

    async getById(id) {
        let user = await this.getFromCacheById(id);
        if (user) return user;

        user = await this.database.member.findUnique({ where: { id_member: id } });
        return user;

    }
    async getByMail(email) {
        let user = this.getFromCacheByMail(email);
        if (user) return user;
        user = await this.database.member.findUnique({ where: { email } });
    }
    async update(id, data) {
        const user = await this.database.member.update({where: { id_member: id },data })
        if (user) this.saveToCache(user);
        return user
    }
    async delete(id) {
        const user = await this.database.member.delete({ where: { id_member: id }});
        if (user) await this.delFromCache(user);
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
            this.cache.save(`user:${user.id}`, JSON.stringify(user), 'EX', 60 * 60),
            this.cache.save(`user:${user.mail}`, user.id, 'EX', 60 * 60)
        ])
    }

     // Delete user from redis cache
    async delFromCache(user) {
        return await Promise.all([
            this.cache.del(`user:${user.id}`),
            this.cache.del(`user:${user.mail}`)
        ])
    }
}

export default MemberService;