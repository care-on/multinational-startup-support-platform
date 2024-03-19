const { connection_pool } = require("../config/db.config");
const { question } = require("../models/question.model");

class QuestionService {
  constructor() {
    this.questions = [];
    this.initializeQuestionsAndAnswers();
  }
  async initializeQuestionsAndAnswers() {
    try {
      const connection = await connection_pool.getConnection();
      await connection.beginTransaction();
      const [rows, fields] = await connection.query(
        "call GetQuestionDetails()"
      );
      rows[0].forEach(async (row) => {
        const [childRows, childFields] = await connection.query(
          "call GetAnswersByQuestionId(?)",
          [row.qid]
        );
        this.questions.push(
          new question.hierarchy({ ...row, child: childRows[0] }).toJson()
        );
      });

      await connection.commit();
      connection.release();
    } catch (err) {
      throw err;
    }
  }

  async create(newQuestion) {
    try {
      const connection = await connection_pool.getConnection();
      await connection.beginTransaction();

      const result = await connection.query(
        "INSERT INTO questions SET ?",
        newQuestion
      );
      const [rows, fields] = await connection.query(
        "call GetQuestionDetailsById(?)",
        [result[0].insertId]
      );

      await connection.commit();
      connection.release();
      this.questions.push(new question.hierarchy({ ...rows[0][0], child: [] }));
      return rows[0][0];
    } catch (err) {
      throw err;
    }
  }

  async createAnswer(newAnswer) {
    try {
      const [result, fields] = await connection_pool.query(
        "call InsertAnswerAndRelation(?,?,?)",
        [newAnswer.uid, newAnswer.qid, newAnswer.content]
      );
      const { deleted_date, ...filteredData } = result[0][0];
      await this.updateQuestionsWithNewAnswer(
        Number(newAnswer.qid),
        filteredData
      );

      //this.questions.push(new question.hierarchy({ ...rows[0][0], child: [] }));
      //   return rows[0][0];
      return filteredData;
    } catch (err) {
      throw err;
    }
  }
  async updateQuestionsWithNewAnswer(qid, newAnswer) {
    // this.questions에서 해당 질문을 찾아서 업데이트
    this.questions.forEach((question) => {
      if (question.qid === qid) {
        question.child.push({ ...newAnswer, hit_count: 0, like_count: 0 });
      }
    });
  }

  async read(pageNumber, pageSize) {
    try {
      const questionsWithoutChild = this.questions.map((question) => {
        const { child, ...questionWithoutChild } = question;
        return questionWithoutChild;
      });

      return await this.getItemsForPage(
        questionsWithoutChild,
        pageNumber,
        pageSize
      );
    } catch (err) {
      throw err;
    }
  }

  async getItemsForPage(arr, pageNumber, pageSize) {
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = pageNumber * pageSize;
    // 배열 슬라이싱을 사용하여 해당 페이지의 아이템을 추출합니다.
    const paginatedItems = arr.slice(startIndex, endIndex);
    return paginatedItems;
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
  async updateHit(qid, uid) {}
  async findAuthor(qid) {
    try {
      const question = this.questions.find((question) => question.qid === qid);
      if (!question) throw new Error("cannot find question post");
      return question.uid;
    } catch (err) {
      throw err;
    }
  }
  async findAnswerAuthor(qid, aid) {
    try {
      const question = this.questions.find((question) => question.qid === qid);
      console.log(aid);
      const answer = question.child.find((answer) => answer.aid === aid);
      if (!answer) throw new Error("cannot find question post");
      return answer.uid;
    } catch (err) {
      throw err;
    }
  }
  /** transaction done */
  async update(qid, updatedQuestion) {
    try {
      const connection = await connection_pool.getConnection();
      await connection.beginTransaction();

      await connection.query(
        "UPDATE questions SET ? WHERE qid = ? and uid = ?",
        [updatedQuestion, qid, updatedQuestion.uid]
      );

      // 업데이트된 질문을 다시 가져와서 업데이트
      const [rows, fields] = await connection.query(
        "call GetQuestionDetailsById(?)",
        [qid]
      );
      await connection.commit();
      connection.release();

      const updatedIndex = this.questions.findIndex((q) => q.qid === qid);
      if (updatedIndex !== -1) {
        this.questions[updatedIndex] = rows[0];
      }

      return rows[0];
    } catch (err) {
      throw err;
    }
  }

  async updateAnswer(aid, updatedAnswer) {
    try {
      const connection = await connection_pool.getConnection();
      await connection.beginTransaction();
      await connection.query("UPDATE answers SET ? WHERE aid = ? and uid = ?", [
        updatedAnswer,
        aid,
        updatedAnswer.uid,
      ]);

      // 업데이트된 질문을 다시 가져와서 업데이트
      const [rows, fields] = await connection.query(
        "call GetAnswerDetailsById(?)",
        [aid]
      );

      await connection.commit();
      connection.release();

      const updatedIndex = this.questions.findIndex(
        (q) => q.qid === updatedAnswer.qid
      );
      if (updatedIndex === -1) throw new Error("cannot found post");
      const childIndex = this.questions[questionIndex].child.findIndex(
        (answer) => updatedAnswer.aid === aid
      );

      if (childIndex === -1) throw new Error("cannot found answer");
      this.questions[updatedIndex].child[childIndex] = rows[0];
      return rows[0];
    } catch (err) {
      throw err;
    }
  }

  async delete(qid) {
    try {
      const connection = await connection_pool.getConnection();
      await connection.beginTransaction();

      const result = await connection.query(
        "UPDATE questions SET deleted_date = CURRENT_TIMESTAMP WHERE qid = ?",
        [qid]
      );

      await connection.commit();
      connection.release();

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
  async deleteAnswer(qid, aid) {
    try {
      const result = await connection_pool.query(
        "UPDATE answers SET deleted_date = CURRENT_TIMESTAMP WHERE aid = ?",
        [aid]
      );

      if (result[0].affectedRows > 0) {
        const questionIndex = this.questions.findIndex(
          (question) => question.qid === qid
        );
        if (questionIndex !== -1) {
          this.questions[questionIndex].child = this.questions[
            questionIndex
          ].child.filter((answer) => answer.aid !== aid);
        }

        return result[0];
      } else {
        throw new Error("not found answer.");
      }
    } catch (err) {
      throw err;
    }
  }
}

module.exports = new QuestionService();
