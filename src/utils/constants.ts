export const initialText = `create table student
(sid int not null primary key,
 sname varchar(15) not null);

create table course
(cid char(8) not null primary key,
 cname varchar(15) not null);

create table registration
(sid int not null,
 cid char(8) not null,
 semester char(6) not null,
 constraint registration_pk primary key(sid, cid),
 constraint registration_fk1 foreign key(sid) references student(sid),
 constraint registration_fk2 foreign key(cid) references course(cid));

create table faculty
(fid int not null primary key,
 fname varchar(15) not null);

create table qualification
(fid int not null,
 cid char(8) not null,
 date_qualified date not null,
 constraint qualification_pk primary key(fid, cid   ),
 constraint qualification_fk1 foreign key(fid) references faculty(fid),
 constraint qualification_fk2 foreign key(cid) references course(cid));

create table assessment
(aid int not null,
 aname varchar(15) not null, 
 weight decimal(3,2) not null, 
 constraint assessment_pk primary key(aid));

create table performance
(sid int not null,
 cid char(8) not null,
 aid int not null, 
 rid int not null,
 mark int not null,
 constraint performance_pk primary key(sid, cid, aid),
 constraint performance_fk1 foreign key(sid, cid) references registration(sid,cid),
 constraint performance_fk3 foreign key(rid) references room(rid),
 constraint performance_fk2 foreign key(aid) references assessment(aid));

create table room
(rid int not null primary key,
 type varchar(20) not null,
 capacity int not null,
 size ENUM('small', 'large')
 );
`;
