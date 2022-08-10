create table if not exists post (
	id int not null primary key AUTO_INCREMENT,
	title varchar(45) not null,
	writer varchar(10) not null,
	reg_date datetime not null default current_timestamp,
	comment_cnt int not null default 0,
    view_cnt int not null default 0,
    like_cnt int not null default 0,
    content text not null,
	password varchar(64) not null
);

create table if not exists comment (
	id int not null primary key AUTO_INCREMENT,
	post_id int not null,
    foreign key (post_id) references post(id),
		writer varchar(10) not null,
	  reg_date datetime not null default current_timestamp,
    parent_comment_id int default null,
    foreign key (parent_comment_id) references comment (id),
    deleted boolean default false,
    content text not null,
	password varchar(45) not null
);

create table if not exists tag(
		id int not null primary key AUTO_INCREMENT,
	  name varchar(20) not null
);

create table if not exists post_tag (
		post_id int not null,
    foreign key (post_id) references post(id),
    tag_id int not null,
    foreign key (tag_id) references tag(id)
);


alter table post AUTO_INCREMENT = 1;
alter table comment AUTO_INCREMENT = 1;
alter table tag AUTO_INCREMENT = 1;