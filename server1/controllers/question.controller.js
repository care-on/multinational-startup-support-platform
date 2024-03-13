const Question = require("../models/question.model");
const questionService = require("../services/question.service");

class QuestionController {
  async create(req, res, next) {
    try {
      const { title, content } = req.body;
      /**TODO: uid --change--> uid in parsing guard middleware */
      const { uid } = req.user;
      const newQuestion = new Question(uid, title, content);
      questionService.create(newQuestion);
      res.status(201).json({ message: "Question created successfully." });
    } catch (error) {
      next(error);
    }
  }
  async read(req, res, next) {
    try {
      const questions = await questionService.read();
      res.json(questions);
    } catch (error) {
      next(error);
    }
  }
  async update(req, res, next) {
    try {
      const { qid } = req.query;
      const { uid } = req.user;
      const { title, content } = req.body;
      const updatedQuestion = new Question(uid, title, content);

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

  /**TODO: find who author */
  async isCheckedAuthor() {}
}

module.exports = new QuestionController();
