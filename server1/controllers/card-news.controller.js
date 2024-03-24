const cardNewsService = require("../services/card-news.service");

class CardNewsController {
  async read(req, res, next) {
    try {
      const pageNumber = parseInt(req.query.pageNumber) || 1;
      const pageSize = parseInt(req.query.pageSize) || 10;
      const articles = await cardNewsService.read(pageNumber, pageSize);
      res.json(articles);
    } catch (err) {
      next(err);
    }
  }
  async readOneByCid(req, res, next) {
    try {
      const { cid } = req.params;
      const { uid } = req.user;
      const article = await cardNewsService.readOneByCid(cid, uid);
      res.json(article);
    } catch (err) {
      next(err);
    }
  }
  async like(req, res, next) {
    try {
      const { uid } = req.user;
      const { cid } = req.params;
      await cardNewsService.likeWithArticle(uid, cid);

      res.json({ state: "success" });
    } catch (err) {
      next(err);
    }
  }
  async unLike(req, res, next) {
    try {
      const { uid } = req.user;
      const { cid } = req.params;
      await cardNewsService.unLikeWithArticle(uid, cid);

      res.json({ state: "success" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new CardNewsController();
