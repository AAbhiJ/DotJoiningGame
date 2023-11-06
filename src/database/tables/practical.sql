create table practical(
    prc_id BIGSERIAL not null,
    prc_title varchar(100) not null,
	prc_desc varchar(300) not null,
	constraint pk_practical primary key (prc_id)
);

comment on table users is 'Table containing practicals information';

comment on column users.usr_id is 'Unique identifier for the practical';
comment on column users.usr_username is 'Practical title';
comment on column users.usr_password is 'Practical password';
