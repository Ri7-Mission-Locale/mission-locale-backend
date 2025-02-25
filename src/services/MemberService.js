import { PrismaClient } from "@prisma/client";
import redis from "../utils/redis.js";

class MemberService {
    cache = redis.userCache;
    database = new PrismaClient()

    /* Create user in database and cache */
    async create(data) {
        const user = await this.database.member.create({ data }) // Create in MySQL
        if (user) await this.saveToCache(user); // If ok save to cache
        return user;
    }

    /* Get user in database or cache with this id */
    async getById(id) {
        let user = await this.getFromCacheById(id); // Try to get from cache
        if (user) return user; // If ok return

        user = await this.database.member.findUnique({ where: { id_member: id } }); // Else try in MySQL
        if (user) this.saveToCache(user) // If ok save to cache
        
        return user;
    }

    /* Get user in database or cache with this email */
    async getByMail(email) {
        let user = await this.getFromCacheByMail(email);
        if (user) return user;

        user = await this.database.member.findUnique({ where: { email } }); 
        if (user) this.saveToCache(user);
        return user;
    }

    /* Update user in database and cache */
    async update(id, data) {
        const user = await this.database.member.update({where: { id_member: id }, data }) // Update in MySQL
        if (user) {
            if (data.email) {
                await this.delFromCache(data); // If mail has changed del old mail in cache
            }
            this.saveToCache(user) // Save update in MySQL
        }
        return user
    }
    
    /* Delete user from database and cache */
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
            this.cache.set(`user:${user.id_member}`, JSON.stringify(user), 'EX', 60 * 60),
            this.cache.set(`user:${user.email}`, user.id_member, 'EX', 60 * 60)
        ])
    }

     // Delete user from redis cache
    async delFromCache(user) {
        return await Promise.all([
            this.cache.del(`user:${user.id_member}`),
            this.cache.del(`user:${user.email}`)
        ])
    }
}

export default MemberService;