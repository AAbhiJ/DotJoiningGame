create table sub_practical(
    sprc_id BIGSERIAL not null,
    sprc_practical bigint not null,
    sprc_title varchar(100) not null,
	sprc_desc varchar(300) not null,
	constraint pk_sub_practical primary key (sprc_id)
);

comment on table sub_practical is 'Table containing sub practicals information';

comment on column sub_practical.sprc_id is 'Unique identifier for the sub practicals';
comment on column sub_practical.sprc_practical is 'Practical id';
comment on column sub_practical.sprc_title is 'Sub Practical title';
comment on column sub_practical.sprc_desc is 'Sub Practical password';
