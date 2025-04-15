import database from "../databases/database";

class UserRepository {

    db = database;

    /* Create user */
    async create(data) {
        return await this.db.user.create({ data });
    }

    /* Find a specific user with id or mail */
    async find(idOrEmail) {
        return await this.db.user.findUnique({ where: typeof idOrEmail === 'string' ? { email: idOrEmail } : { user_id: idOrEmail }});
    }

    /* Find a list of user with optionnal filter */
    async findMany(filter = {}) {
        return await this.db.user.findMany({
            
        })
    }

    /* Update a specific user */
    async update(id, data) {
        return await this.db.user.update({ where: { user_id: id }, data});
    }

    /* Delete a specific user */
    async delete(id) {
        return await this.db.user.delete({ where: { user_id: id }});
    }
}
export default new UserRepository();