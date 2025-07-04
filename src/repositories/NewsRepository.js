import database from "../databases/database.js";

class NewsRepository {
  db = database;

  /* Create news */
  async create(data, userId) {
    try {
      return await this.db.news.create({
        data: {
          title: data.title,
          description: data.description,
          imagePath: data.imagePath,
          user_id: userId,
          tag: {
            connect: data.tags.map((tagName) => ({ tag_name: tagName })),
          },
        },
      });
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  /* Find a list of news with optionnal filter */
  //J'ai du enlver mode : "insensitive" pour pouvoir faire tourner la requête correctement
  async findMany(filter = {}) {
    const { limit = 10, page = 1, name, order = "asc" } = filter;

    try {
      return await this.db.news.findMany({
        where: name
          ? {
              OR: [
                { title: { contains: name } },
                { description: { contains: name } },
              ],
            }
          : {},
        orderBy: { createdAt: order },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          tag: true,
        },
      });
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  /* Find a specific news with id */
  async find(news_id) {
    try {
      return await this.db.news.findUnique({
        where: { news_id },
        include: {
          tag: true,
        },
      });
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  /* Delete a specific news */
  async delete(news_id) {
    try {
      return await this.db.news.delete({
        where: { news_id },
      });
    } catch (err) {
      console.error(err);

      return null;
    }
  }

  /* Update a specific news */
  async update(news_id, data) {
    try {
      return await this.db.news.update({ where: { news_id }, data });
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}

export default new NewsRepository();
