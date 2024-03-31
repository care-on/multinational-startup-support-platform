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
    this.hit_count = question.hit_count;
    this.like_count = question.like_count;
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
      hit_count: this.hit_count,
      like_count: this.like_count,
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
