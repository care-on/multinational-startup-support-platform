
create table answer_like_log(
	id int auto_increment primary key,
    aid int not null,
    uid int not null,
    likes int not null,
    foreign key (aid) references answers(aid),
    foreign key (uid) references users(uid)
    
);
