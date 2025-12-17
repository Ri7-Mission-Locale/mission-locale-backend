import database from "../databases/database.js";

class ArticleRepository {
  db = database;

  /* Create article */
  async create(data, authorId) {
    try {
      return await this.db.article.create({
        data: {
          title: data.title,
          description: data.description,
          backgroundImagePath: data.backgroundImagePath,
          author_id: authorId,
          tag: {
            connectOrCreate: data.tags.map((tagName) => ({
              where: { tag_name: tagName },
              create: { tag_name: tagName, color: "blue" },
            })),
          },
        },
      });
    } catch (err) {
      console.error(err);
      return null;
    }
  }

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
