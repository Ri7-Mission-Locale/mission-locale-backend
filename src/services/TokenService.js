import { PrismaClient } from "@prisma/client";
import redis from "../utils/redis.js";
import jwt from 'jsonwebtoken';
import { randomBytes } from 'crypto';

const { sign, verify } = jwt;

class TokenService {

    cache = redis.tokenCache;
    database = new PrismaClient();
    secrets = {
        REFRESH_TOKEN: process.env.JWT_REFRESH_KEY || "@!@ Awesome key for refresh token #!/",
    }

    /* Generate a token and save it in database and cache */
    async generate(userId, userType, tokenType, expiresIn) {
        const secret = this.secrets[tokenType];
        const key = randomBytes(10).toString('hex');
        const token = sign({ key, userType }, secret, { expiresIn });

        save(userId, userType, tokenType, key, expiresIn);

        return token;
    }


    /* Validate a token and return user id and type */
    async validate(token, tokenType) {
        const secret = this.secrets[tokenType];

        try {
            const { key, userType } = verify(token, secret);

            let tokenData = await this.get(key);
            if (tokenData && tokenData.expiresAt > new Date() && tokenData.type_user === userType) {
                return { id: tokenData.id_user, type: tokenData.type_user }
            }
            return null;
        } catch (err) {
            return null;
        }
    }

    async invalidateUserToken(token) {
        try {
            const { key } = verify(token, secret);
            await Promise.all([
                this.delete(key),
                this.deleteFromCache(key)
            ])
        } catch (err) { }
    }

    async get(tokenId) {
        let tokenData = await this.getInCache(key);
        if (tokenData) return tokenData;

        tokenData = await this.database.token.findUnique({ where: { token: tokenId } });
        if (tokenData) this.saveInCache(tokenId, tokenData)

        return tokenData;
    }

    async save(userId, userType, tokenType, tokenId, expiresIn) {
        const expiresAt = new Date(Date.now() + expiresIn * 1000);
        const tokenData = await this.database.token.upsert({
            where: { token: tokenId },
            update: { expiresAt },
            create: { token: tokenId, tokenType, type_user: userType, id_user: userId, expiresAt },
        });
        this.saveInCache(tokenId, tokenData);
    }
    async delete(tokenId) {
        await this.database.deleteMany({ where: { token: tokenId } })
    }

    async getInCache(tokenId) {
        const data = this.cache.get(`token:${tokenId}`)
        return data ? JSON.parse(data) : null;
    }

    async saveInCache(tokenId, tokenData) {
        this.cache.set(`token:${tokenId}`, JSON.stringify(tokenData), 'EX', 60 * 60);
    }
    async deleteFromCache(tokenId) {
        await this.cache.del(`token:${tokenId}`);
    }
}
export default TokenService;