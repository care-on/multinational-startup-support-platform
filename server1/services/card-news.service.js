const { connection_pool } = require("../config/db.config");
const logger = require("../config/logger.config");

class CardNewsService {
  async read(pageNumber, pageSize) {
    try {
      const connection = await connection_pool.getConnection();
      await connection.beginTransaction();

      const [rows, fields] = await connection.query("call GetCardNews(?,?)", [
        pageNumber,
        pageSize,
      ]);
      const [childRows, childFields] = await connection.query(
        "call GetCardNewPageCount(?)",
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
  async readOneByCid(cid, uid) {
    try {
      const [rows, fields] = await connection_pool.query(
        "select * from cardnews where idcardnews = ?",
        [cid]
      );
      if (rows.length === 0) throw new Error("nop");
      const { content, ...articleWithoutContent } =
        await this.readOneByCidAndUpdateHit(cid, uid);
      const articleWithoutBackslashes = JSON.parse(
        content.replace(/[\u0000-\u0019]+/g, "")
      );
      const article = {
        ...articleWithoutContent,
        content: articleWithoutBackslashes,
      };
      return article;
    } catch (err) {
      throw err;
    }
  }
  async readOneByCidAndUpdateHit(cid, uid) {
    try {
      const connection = await connection_pool.getConnection();
      await connection.beginTransaction();

      const [rows, fields] = await connection.query(
        "select * from cardnews_hit_log where idcardnews = ? and uid = ?",
        [cid, uid]
      );

      if (rows.length === 0) {
        await connection.query(
          "insert into cardnews_hit_log(idcardnews, uid, hit) values(?,?,?)",
          [cid, uid, 1]
        );
      }
      const [childRows, childFields] = await connection.query(
        "call GetCardNewsDetail (?)",
        [cid]
      );
      await connection.commit();
      connection.release();
      return childRows[0][0];
    } catch (err) {
      throw err;
    }
  }
  async likeWithArticle(uid, cid) {
    try {
      const connection = await connection_pool.getConnection();
      await connection.beginTransaction();

      const [rows, fields] = await connection.query(
        "select * from cardnews_like_log where uid = ? and idcardnews =?",
        [uid, cid]
      );

      if (rows.length != 0) throw new Error("already like this post");
      await connection.query(
        "insert into cardnews_like_log(idcardnews,uid,likes) values(?,?,?)",
        [cid, uid, 1]
      );
      await connection.commit();
      connection.release();
    } catch (err) {
      throw err;
    }
  }
  async unLikeWithArticle(uid, cid) {
    try {
      const connection = await connection_pool.getConnection();
      await connection.beginTransaction();

      const [rows, fields] = await connection.query(
        "select * from cardnews_like_log where uid = ? and idcardnews =?",
        [uid, cid]
      );

      if (rows.length == 0) throw new Error("already unLike this post");
      await connection.query(
        "delete from cardnews_like_log where idcardnews = ? and uid = ?",
        [cid, uid]
      );
      await connection.commit();
      connection.release();
    } catch (err) {
      throw err;
    }
  }
}

module.exports = new CardNewsService();
