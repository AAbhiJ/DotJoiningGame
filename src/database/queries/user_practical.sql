/* Store Students Submitted Practical  */

insert into user_practical(upr_user, upr_practical, upr_submitted_value, upr_submitted_at, upr_status) 
values(2, 1, '{"value" : 1}',current_timestamp, 'pending');

/* Get Studnet Submitted practical */
select upr_id, upr_user, upr_practical, upr_submitted_value, upr_submitted_at, upr_status from user_practical
inner join users on usr_id = upr_user
inner join practical on prc_id = prc_id


