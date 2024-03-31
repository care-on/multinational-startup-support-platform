const logger = require("../config/logger.config");
const { question } = require("../models/question.model");
const questionService = require("../services/question.service");

class QuestionController {
  async create(req, res, next) {
    try {
      const { title, content } = req.body;
      const { uid } = req.user;
      const newQuestion = new question.default(uid, title, content);
      questionService.create(newQuestion);
      res.status(201).json({ message: "Question created successfully." });
    } catch (error) {
      next(error);
    }
  }
  async read(req, res, next) {
    try {
      const pageNumber = parseInt(req.query.pageNumber) || 1;
      const pageSize = parseInt(req.query.pageSize) || 10;
      logger.debug(pageNumber);

      const questions = await questionService.read(pageNumber, pageSize);
      res.json(questions);
    } catch (error) {
      next(error);
    }
  }
  async readOneByQid(req, res, next) {
    try {
      const { qid } = req.params;
      const question = await questionService.readOneByQidAndUpdateHit(
        qid,
        req.user.uid
      );
      res.json(question);
    } catch (err) {
      next(err);
    }
  }
  async like(req, res, next) {
    try {
      const { uid } = req.user;
      const { qid } = req.params;

      await questionService.likeWithQuestion(uid, qid);

      res.json({ state: "success" });
    } catch (err) {
      next(err);
    }
  }
  async unLike(req, res, next) {
    try {
      const { uid } = req.user;
      const { qid } = req.params;

      await questionService.unLikeWithQuestion(uid, qid);

      res.json({ state: "success" });
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const { qid } = req.query;
      const uid = await questionService.findAuthor(Number(qid));

      if (req.user.uid !== uid) throw new Error("not Matched User");
      const { title, content } = req.body;
      const updatedQuestion = new question.default(uid, title, content);

      questionService.update(qid, updatedQuestion);
      res.status(201).json({ message: "Question updated successfully." });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { qid } = req.query;
      const uid = await questionService.findAuthor(Number(qid));
      if (req.user.uid !== uid) throw new Error("not Matched User");
      questionService.delete(Number(qid));
      res.status(201).json({ message: "Question deleted successfully." });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new QuestionController();
