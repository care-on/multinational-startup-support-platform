create table `cardnews_hit_log`(
	id int auto_increment primary key,
    idcardnews int unsigned not null,
    uid int not null,
    hit int not null,
    foreign key (idcardnews) references cardnews(idcardnews),
    foreign key (uid) references users(uid)
);