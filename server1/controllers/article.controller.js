const articleService = require("../services/article.service");

class ArticleController {
  async read(req, res, next) {
    try {
      const pageNumber = parseInt(req.query.pageNumber) || 1;
      const pageSize = parseInt(req.query.pageSize) || 10;
      const articles = await articleService.read(pageNumber, pageSize);
      res.json(articles);
    } catch (err) {
      next(err);
    }
  }
  async readOneByAid(req, res, next) {
    try {
      const { aid } = req.params;
      const { uid } = req.user;
      const article = await articleService.readOneByAid(aid, uid);
      res.json(article);
    } catch (err) {
      next(err);
    }
  }
  async like(req, res, next) {
    try {
      const { uid } = req.user;
      const { aid } = req.params;
      await articleService.likeWithArticle(uid, aid);

      res.json({ state: "success" });
    } catch (err) {
      next(err);
    }
  }
  async unLike(req, res, next) {
    try {
      const { uid } = req.user;
      const { aid } = req.params;
      await articleService.unLikeWithArticle(uid, aid);

      res.json({ state: "success" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new ArticleController();
