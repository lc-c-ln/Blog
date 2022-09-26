create table if not exists user (
	id int not null primary key AUTO_INCREMENT,
	name varchar(15) not null,
	password varchar(64) not null
	email varchar(50) not null
)

create table if not exists post (
	id int not null primary key AUTO_INCREMENT,
	title varchar(45) not null,
	user_id int not null,
	foreign key (user_id) references user(id) on delete cascade,
	register_date datetime not null default current_timestamp,
	comment_cnt int not null default 0,
    view_cnt int not null default 0,
    like_cnt int not null default 0,
    content text not null,
);

create table if not exists comment (
	id int not null primary key AUTO_INCREMENT,
	post_id int not null,
    foreign key (post_id) references post(id) on delete cascade,
	register_date datetime not null default current_timestamp,
    user_id int not null,
	foreign key (user_id) references user(id) on delete cascade,
    parent_comment_id int default null,
	foreign key (parent_comment_id) references comment (id),
    deleted_flag boolean default false,
    content text not null,
);

create table if not exists like_post (
	user_id int not null,
	foreign key (user_id) references user(id) on delete cascade,
    post_id int not null,
    foreign key (post_id) references post(id) on delete cascade,
	like_flag int,
	primary key (user_id, post_id)
)

create table if not exists tag(
	id int not null primary key AUTO_INCREMENT,
	name varchar(20) not null,
	unique index (name)
);

create table if not exists post_tag (
	post_id int not null,
    foreign key (post_id) references post(id) on delete cascade,
    tag_id int not null,
    foreign key (tag_id) references tag(id)
);

create table like_comment (
	user_id int not null,
	foreign key (user_id) references user(id) on delete cascade,
    comment_id int not null,
    foreign key (comment_id) references comment(id) on delete cascade,
	primary key (user_id, comment_id)
	like_flag int, 
)

alter table user AUTO_INCREMENT = 1;
alter table post AUTO_INCREMENT = 1;
alter table comment AUTO_INCREMENT = 1;
alter table tag AUTO_INCREMENT = 1;


-- create table if not exists post (
-- 	id int not null primary key AUTO_INCREMENT,
-- 	title varchar(45) not null,
-- 	writer varchar(10) not null,
-- 	reg_date datetime not null default current_timestamp,
-- 	comment_cnt int not null default 0,
--     view_cnt int not null default 0,
--     like_cnt int not null default 0,
--     content text not null,
-- 	password varchar(64) not null
-- );

-- create table if not exists comment (
-- 	id int not null primary key AUTO_INCREMENT,
-- 	post_id int not null,
--     foreign key (post_id) references post(id) on delete cascade,
-- 	writer varchar(10) not null,
-- 	reg_date datetime not null default current_timestamp,
--     parent_comment_id int default null,
--     foreign key (parent_comment_id) references comment (id),
--     deleted boolean default false,
--     content text not null,
-- 	password varchar(45) not null
-- );

-- create table if not exists tag(
-- 	id int not null primary key AUTO_INCREMENT,
-- 	name varchar(20) not null,
-- 	unique index (name)
-- );

-- create table if not exists post_tag (
-- 	post_id int not null,
--     foreign key (post_id) references post(id) on delete cascade,
--     tag_id int not null,
--     foreign key (tag_id) references tag(id)
-- );


-- alter table post AUTO_INCREMENT = 1;
-- alter table comment AUTO_INCREMENT = 1;
-- alter table tag AUTO_INCREMENT = 1;

