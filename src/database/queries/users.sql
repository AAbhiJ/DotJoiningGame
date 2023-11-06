/* Insert  */

insert into users(usr_username, usr_password, usr_role, usr_last_login) values('test','pass','admin',current_timestamp)

/* update  */

update users set usr_password   = 'passup',
                 usr_role       = 'student',
				 usr_last_login = current_timestamp
where usr_id = 2;

/* delete   */
delete from users where usr_id = 2;