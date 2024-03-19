create table answer_hit_log(
	id int auto_increment primary key,
    aid int not null,
    uid int not null,
    hit int not null,
    foreign key (aid) references answers(aid),
    foreign key (uid) references users(uid)
);