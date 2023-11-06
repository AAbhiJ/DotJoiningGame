/* Insert  */

insert into practical(prc_title, prc_desc) values('Flip Flop','Flip Flop practical');

/* update  */

update practical set prc_title = 'Flip flop',
                     prc_desc = 'Flip flop practical'
where prc_id = 1;


/* delete   */
delete from practical where prc_id = 1;