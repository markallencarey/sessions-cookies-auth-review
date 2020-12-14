drop table if exists puppygram_user;

create table puppygram_user (
  puppygram_user_id serial primary key,
  username varchar(15),
  hash varchar(500),
  is_admin boolean
);