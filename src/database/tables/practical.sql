create table practical(
    prc_id BIGSERIAL not null,
    prc_title varchar(100) not null,
	prc_desc varchar(300) not null,
	prc_header_id bigint null,
	constraint pk_practical primary key (prc_id)
);

comment on table practical is 'Table containing practicals information';

comment on column practical.prc_id is 'Unique identifier for the practical';
comment on column practical.prc_title is 'Practical title';
comment on column practical.prc_desc is 'Practical password';
comment on column practical.prc_header_id is 'Practical Header id, If no header it will be null';