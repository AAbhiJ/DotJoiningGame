create table users(
    usr_id BIGSERIAL not null,
    usr_username varchar(50) not null,
	usr_password TEXT not null,
	usr_role varchar(30) not null,
	usr_last_login timestamp,
	constraint pk_users primary key (usr_id),
	constraint ck_user_role check (usr_role in ('admin', 'student'))
);

comment on table users is 'Table containing user information';

comment on column users.usr_id is 'Unique identifier for the user';
comment on column users.usr_username is 'Users username';
comment on column users.usr_password is 'Users encrypted password';
comment on column users.usr_role is 'Users role - admin or student';
comment on column users.usr_last_login is 'timestamp of users last login';
