/* Select */

select * from practical;

/* Insert  */

insert into practical(prc_title, prc_desc) values('Flip Flop','Flip Flop practical');

insert into practical(prc_title, prc_desc, prc_header_id)
values('SR', 'SR Flip Flop', 1);

insert into practical(prc_title, prc_desc, prc_header_id)
values('Clocked', 'Clocked Flip Flop', 1);

insert into practical(prc_title, prc_desc, prc_header_id)
values('D', 'D Flip Flop', 1);



/* update  */

update practical set prc_title = 'Flip flop',
                     prc_desc = 'Flip flop practical'
where prc_id = 1;


/* delete   */
delete from practical where prc_id = 1;