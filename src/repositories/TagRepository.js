import database from "../databases/database.js";

class TagRepository {
    db = database;
 async findMany(){
        try {
            return await this.db.tag.findMany();
        } catch (err) {
            console.error(err);
            return null;
        }
    }}


    export default new TagRepository();
