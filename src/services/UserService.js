import redis from "../utils/redis";

class UserService {
    cache = redis.userCache;


    getById(id) {
        let user = this.getFromCacheById(id);
        if (user) return user;

    }
    getByMail(mail) {
        let user = this.getFromCacheByMail(mail);
        if (user) return user;

        //ELse prisma
    }
    update(user) {
        //Update on prisma

        //If ok save on redis
    }
    delete(user) {

    }



    /* REDIS CACHE */
    getFromCacheById(id) {
        
    }

    async getIdByMail(mail) {
        return await this.cache.get(`user:${mail}`);
    }

    async saveToCache(user) {
        return await Promise.all([
            this.cache.save(`user:${user.id}`, JSON.stringify(user), 'EX', 60 * 60),
            this.cache.save(`user:${user.mail}`, user.id, 'EX', 60 * 60)
        ])
    }

    async delFromCache(user) {
        return await Promise.all([
            this.cache.del(`user:${user.id}`),
            this.cache.del(`user:${user.mail}`)
        ])
    }
}

export default UserService;