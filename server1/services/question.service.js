const { connection_pool } = require("../config/db.config");
const { question } = require("../models/question.model");

class QuestionService {
  constructor() {
    this.questions = [];
    this.initializeQuestions();
  }

  async initializeQuestions() {
    try {
      const [rows, fields] = await connection_pool.query(
        "call GetQuestionDetails()"
      );
      this.questions = rows[0];
    } catch (err) {
      throw err;
    }
  }

  async create(newQuestion) {
    try {
      const result = await connection_pool.query(
        "INSERT INTO questions SET ?",
        newQuestion
      );
      const [rows, fields] = await connection_pool.query(
        "call GetQuestionDetailsById(?)",
        [result[0].insertId]
      );
      this.questions.push(rows[0][0]);
      return rows[0];
    } catch (err) {
      throw err;
    }
  }

  async read() {
    try {
      return this.questions;
    } catch (err) {
      throw err;
    }
  }

  async readOneByQid(qid) {
    try {
      const question = this.questions.find(
        (question) => question.qid === Number(qid)
      );
      if (!question) throw new Error("cannot find question post");
      return question;
    } catch (err) {
      throw err;
    }
  }
  async findAuthor(qid) {
    try {
      const question = this.questions.find((question) => question.qid === qid);
      if (!question) throw new Error("cannot find question post");
      return question.uid;
    } catch (err) {
      throw err;
    }
  }

  async update(qid, updatedQuestion) {
    try {
      await connection_pool.query(
        "UPDATE questions SET ? WHERE qid = ? and uid = ?",
        [updatedQuestion, qid, updatedQuestion.uid]
      );

      // 업데이트된 질문을 다시 가져와서 업데이트
      const [rows, fields] = await connection_pool.query(
        "call GetQuestionDetailsById(?)",
        [qid]
      );

      const updatedIndex = this.questions.findIndex((q) => q.qid === qid);
      if (updatedIndex !== -1) {
        this.questions[updatedIndex] = rows[0];
      }

      return rows[0];
    } catch (err) {
      throw err;
    }
  }

  async delete(qid) {
    try {
      const result = await connection_pool.query(
        "UPDATE questions SET deleted_date = CURRENT_TIMESTAMP WHERE qid = ?",
        [qid]
      );

      if (result[0].affectedRows > 0) {
        // 메모리에 있는 배열에서 질문을 제거합니다.
        this.questions = this.questions.filter(
          (question) => question.qid !== qid
        );

        const deletedQuestion = result[0];
        return deletedQuestion;
      } else {
        throw new Error("not found question.");
      }
    } catch (err) {
      throw err;
    }
  }
}

module.exports = new QuestionService();
