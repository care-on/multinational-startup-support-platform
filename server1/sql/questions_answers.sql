CREATE TABLE questions_answers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    aid INT NOT NULL,
    qid INT NOT NULL,
    UNIQUE (aid, qid),
    foreign key (qid) references questions(qid),
    foreign key (aid) references answers(aid)
);