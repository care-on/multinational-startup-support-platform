const { connection_pool } = require("../config/db.config");
const logger = require("../config/logger.config");

class ArticleService {
  async read(pageNumber, pageSize) {
    try {
      const connection = await connection_pool.getConnection();
      await connection.beginTransaction();

      const [rows, fields] = await connection.query("call GetArticles(?,?)", [
        pageNumber,
        pageSize,
      ]);
      const [childRows, childFields] = await connection.query(
        "call GetArticlePageCount(?)",
        [pageSize]
      );
      await connection.commit();
      connection.release();
      return {
        page_count: childRows[0][0].pageCount,
        data: rows[0],
      };
    } catch (err) {
      throw err;
    }
  }
  async readOneByAid(aid, uid) {
    try {
      const [rows, fields] = await connection_pool.query(
        "select * from articles where a_id = ?",
        [aid]
      );
      if (rows.length === 0) throw new Error("nop");
      const { a_content, ...articleWithoutContent } =
        await this.readOneByAidAndUpdateHit(aid, uid);
      const articleWithoutBackslashes = JSON.parse(
        a_content.replace(/[\u0000-\u0019]+/g, "")
      );
      const article = {
        ...articleWithoutContent,
        a_content: articleWithoutBackslashes,
      };
      return article;
    } catch (err) {
      throw err;
    }
  }
  async readOneByAidAndUpdateHit(aid, uid) {
    try {
      const connection = await connection_pool.getConnection();
      await connection.beginTransaction();

      const [rows, fields] = await connection.query(
        "select * from article_hit_log where a_id = ? and uid = ?",
        [aid, uid]
      );

      if (rows.length === 0) {
        await connection.query(
          "insert into article_hit_log(a_id, uid, hit) values(?,?,?)",
          [aid, uid, 1]
        );
      }
      const [childRows, childFields] = await connection.query(
        "call GetArticleDetails (?,?)",
        [aid, uid]
      );
      await connection.commit();
      connection.release();
      return childRows[0][0];
    } catch (err) {
      throw err;
    }
  }
  async likeWithArticle(uid, aid) {
    try {
      const connection = await connection_pool.getConnection();
      await connection.beginTransaction();

      const [rows, fields] = await connection.query(
        "select * from article_like_log where uid = ? and a_id =?",
        [uid, aid]
      );

      if (rows.length != 0) throw new Error("already like this post");
      await connection.query(
        "insert into article_like_log(a_id,uid,likes) values(?,?,?)",
        [aid, uid, 1]
      );
      await connection.commit();
      connection.release();
    } catch (err) {
      throw err;
    }
  }
  async unLikeWithArticle(uid, aid) {
    try {
      const connection = await connection_pool.getConnection();
      await connection.beginTransaction();

      const [rows, fields] = await connection.query(
        "select * from article_like_log where uid = ? and a_id =?",
        [uid, aid]
      );

      if (rows.length == 0) throw new Error("already unLike this post");
      await connection.query(
        "delete from article_like_log where a_id = ? and uid = ?",
        [aid, uid]
      );
      await connection.commit();
      connection.release();
    } catch (err) {
      throw err;
    }
  }
}

module.exports = new ArticleService();
