const Question = require("../models/question.model");
const questionService = require("../services/question.service");

class QuestionController {
  async create(req, res, next) {
    try {
      const { title, content } = req.body;
      /**TODO: uid --change--> uid in parsing guard middleware */
      const { uid } = req.query;
      const newQuestion = new Question(uid, title, content);
      questionService.create(newQuestion);
      res.status(201).json({ message: "Question created successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error." });
    }
  }
  async read(req, res, next) {
    try {
      const questions = await questionService.read();
      res.json(questions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error." });
    }
  }
  async update(req, res, next) {
    try {
      const { uid } = req.query;
      const { qid, title, content } = req.body;
      const updatedQuestion = new Question(uid, title, content);
      questionService.update(qid, updatedQuestion);
      res.status(201).json({ message: "Question updated successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error." });
    }
  }

  async delete(req, res, next) {
    try {
      const { qid } = req.query;
      questionService.delete(qid);
      res.status(201).json({ message: "Question deleted successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error." });
    }
  }
}

module.exports = new QuestionController();
