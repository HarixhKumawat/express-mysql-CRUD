/*here i have made a table user with my requirements edit if wished*/
CREATE TABLE `users` (
  `id` int(11) primary key AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `email` varchar(150) NOT NULL,
  `phone_no` varchar(25) NOT NULL
);


/***NOTE

your primary key must have auto increment on*/
