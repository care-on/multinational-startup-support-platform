create table questions(
    qid int auto_increment PRIMARY key,
    uid int not null,
    title varchar(64) not null,
    content LONGTEXT not null,
    hit int default(0),
    like int default(0),
    created_date DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_date DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_date DATETIME,
    Foreign Key (uid) REFERENCES users(uid)
);

-- hit 추가
-- star (추천)
