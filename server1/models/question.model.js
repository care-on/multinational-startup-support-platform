class Question {
  constructor(uid, title, content) {
    this.uid = uid;
    this.title = title;
    this.content = content;
  }
}

class HierarchicalQuestion {
  constructor(question) {
    this.qid = question.qid;
    this.uid = question.uid;
    this.title = question.title;
    this.content = question.content;
    this.created_date = question.created_date;
    this.updated_date = question.updated_date;
    this.hit = question.hit;
    this.like = question.like;
    this.child = question.child;
  }

  toJson() {
    return {
      qid: this.qid,
      uid: this.uid,
      title: this.title,
      content: this.content,
      created_date: this.created_date,
      updated_date: this.updated_date,
      hit: this.hit,
      like: this.like,
      child: this.child,
    };
  }
}

module.exports = {
  question: {
    default: Question,
    hierarchy: HierarchicalQuestion,
  },
};
