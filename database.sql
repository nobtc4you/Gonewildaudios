CREATE TABLE `Users` (
    `Id` INT(19) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `User` VARCHAR(20) NOT NULL UNIQUE,
    `Mail` VARCHAR(70) NOT NULL UNIQUE,
    `Password` VARCHAR(20) NOT NULL,
    `About_me` VARCHAR(200),
    `ProfilePhoto` VARCHAR (100),
    `Gender` VARCHAR (30),
    `Pronouns` ENUM ('They/them','She/her','He/him','Honestly, idk yet'),
    `IsAdmin` tinyint(1) NOT NULL DEFAULT 0);
CREATE TABLE `Podcasts`(
	`Id` INT(19) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `Title` VARCHAR(70) NOT NULL UNIQUE,
    `Tags` VARCHAR(200),
    `File` VARCHAR (100),
    `Description` VARCHAR(500)
    `Script` VARCHAR(500)
    `UserId` int(19) NOT NULL);

CREATE TABLE `Favorites`(
	`Id` INT(19) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `UserId` INT(19) NOT NULL,
    `PodcastId` INT(19) NOT NULL);



