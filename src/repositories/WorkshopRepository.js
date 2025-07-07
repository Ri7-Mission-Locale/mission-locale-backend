import database from "../databases/database.js";

class WorkshopRepository {
    db = database;

    /* Create workshop */
    async create(data) {
        try {
            return await this.db.workshop.create({ data });
        } catch (err) {
            console.error(err)
            return { error: err };
        }
    }

    /* Create workshop with event */
    async createWithEvent(data, eventData) {
        try {
            return await this.db.workshop.create({
                data: {
                    ...data,
                    events: {
                        create: eventData
                    }
                },
                include: {
                    events: true
                }
            });
        } catch (err) {
            console.error(err)
            return { error: err };
        }
    }

    /* find workshop */
    async find(id) {
        try {
            return await this.db.workshop.findUnique({
                where: { workshop_id: id },
                include: {
                    events: true,
                    tag: true,
                }
            });
        } catch (err) {
            console.error(err)
            return { error: err };
        }
    }
    /* find workshop */
    /*
        
    */
    async findMany(filters = {}) {
        try {
            return await this.db.event.findMany({
                where: {
                    date: {
                        gte: filters.start ? new Date(filters.start) : undefined,
                        lte: filters.end ? new Date(filters.end) : undefined,
                    }
                },
                include: {
                    workshop: true,
                }
            });
        } catch (err) {
            console.error(err)
            return { error: err };
        }
    }

    /* update workshop */
    async update(id, data) {
        try {
            return await this.db.workshop.update({
                where: { workshop_id: id }, data
            });
        } catch (err) {
            console.error(err)
            return { error: err };
        }
    }
    /* update workshop */
    async delete(id) {
        try {
            return await this.db.workshop.delete({
                where: { workshop_id: id }
            });
        } catch (err) {
            console.error(err)
            return { error: err };
        }
    }
}
export default new WorkshopRepository();