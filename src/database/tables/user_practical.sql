create table user_practical(
    upr_id BIGSERIAL not null,
    upr_user bigint not null,
	upr_practical bigint not null,
	upr_submitted_value json not null,
	upr_submitted_at timestamp not null,
	upr_status varchar(30) not null,
	upr_approved_by bigint,
	upr_approved_at timestamp,
	upr_rejected_by bigint,
	upr_rejected_at timestamp,
	upr_remark text not null,
	constraint pk_user_practical primary key (upr_id),
	constraint fk_user_practical__user_submitted_by foreign key (upr_user) references users(usr_id),
	constraint fk_user_practical__practical_submitted_practical foreign key (upr_practical) references practical(prc_id),
	constraint fk_user_practical__user_approved_by foreign key (upr_approved_by) references users(usr_id),
	constraint fk_user_practical__user_rejected_by foreign key (upr_rejected_by) references users(usr_id),
	constraint ck_user_practical_status check (upr_status in ('pending','rejected','approved'))
);

ALTER TABLE user_practical
ALTER COLUMN upr_remark SET DEFAULT ''::TEXT;

comment on table user_practical is 'Table containing users submitted practicals information';

comment on column user_practical.upr_id is 'Unique identifier for the users practical';
comment on column user_practical.upr_user is 'Users id who submitted practical';
comment on column user_practical.upr_practical is 'Practical id of the submitted practical';
comment on column user_practical.upr_submitted_value is 'submitted data json';
comment on column user_practical.upr_submitted_at is 'timestamp of submitted practical';
comment on column user_practical.upr_status is 'practical status - pending, rejected, approved';
comment on column user_practical.upr_approved_by is 'admin user id who approved practical';
comment on column user_practical.upr_approved_at is 'timestamp of approved practical';
comment on column user_practical.upr_rejected_by is 'admin user id who rejected practical';
comment on column user_practical.upr_rejected_at is 'timestamp of rejected practical';
comment on column user_practical.upr_remark is 'remark on practical by admin';
