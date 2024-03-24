const Answer = require("../models/answer.model");
const questionService = require("../services/question.service");

class AnswerController {
  async create(req, res, next) {
    try {
      const { uid } = req.user;
      const { qid } = req.params;
      const { content } = req.body;
      const newAnswer = new Answer(uid, qid, content);
      questionService.createAnswer(newAnswer);
      res.status(201).json({ message: "Question created successfully." });
    } catch (error) {
      next(error);
    }
  }
  async update(req, res, next) {
    try {
      const { aid } = req.query;
      const uid = await questionService.findAnswerAuthor(
        Number(qid),
        Number(aid)
      );
      const { qid } = req.params;
      const { content } = req.body;
      if (req.user.uid !== uid) throw new Error("not Matched User");

      const updatedAnswer = new Answer(uid, qid, content);

      questionService.updateAnswer(aid, updatedAnswer);
      res.status(201).json({ message: "Question updated successfully." });
    } catch (error) {
      next(error);
    }
  }
  async like(req, res, next) {
    try {
      const { uid } = req.user;
      const { qid } = req.params;
      const { aid } = req.query;

      await questionService.likeWithAnswer(uid, qid, aid);

      res.json({ state: "success" });
    } catch (err) {
      next(err);
    }
  }
  async unLike(req, res, next) {
    try {
      const { uid } = req.user;
      const { qid } = req.params;
      const { aid } = req.query;

      await questionService.unLikeWithAnswer(uid, qid, aid);

      res.json({ state: "success" });
    } catch (err) {
      next(err);
    }
  }
  async delete(req, res, next) {
    try {
      const { qid, aid } = req.query;
      const uid = await questionService.findAnswerAuthor(
        Number(qid),
        Number(aid)
      );
      if (req.user.uid !== uid) throw new Error("not Matched User");
      questionService.deleteAnswer(Number(qid), Number(aid));
      res.status(201).json({ message: "Answer deleted successfully." });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AnswerController();
