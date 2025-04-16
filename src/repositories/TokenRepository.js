import database from "../databases/database.js";

class TokenRepository {
    db = database;
    secrets = {
        REFRESH_TOKEN: process.env.JWT_REFRESH_KEY,
        MAIL_VALIDATION: process.env.JWT_MAIL_VALIDATION,
        ACCESS_TOKEN: process.env.JWT_ACCESS_KEY
    }

    /* Generate a token */
    async generate(userId, tokenType, expiresIn, additionnalData = {}) {
        const secret = this.secrets[tokenType];
        const key = randomBytes(10).toString('hex');
        const token = sign({ key }, secret, { expiresIn });

        if (tokenType !== "ACCESS_TOKEN") {
            await this.save(userId, tokenType, key, expiresIn);
        }

        return token;
    }

    /* Delete a specific token */
    async delete(token) {
        return await this.db.token.deleteMany({ where: { token } })
    }

    /* Delete all user's token*/
    async deleteAll(userId) {
        return await this.db.token.deleteMany({ where: { user_id: userId } })
    }

    /* Find token with user */
    async find(token) {
        return await this.db.token.findUnique({
            where: { token },
            include: { user: true }
        })
    }

    /* Save token in database */
    async save(userId, type, token, expiresIn) {
        const expiresAt = new Date(Date.now() + expiresIn * 1000);

        return await this.db.token.upsert({
            where: { token },
            update: { expiresAt },
            create: { token, id_user: userId, type, expiresAt },
        });
    }
}
export default new TokenRepository();