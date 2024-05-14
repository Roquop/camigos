-- drop database biobuk ;
CREATE DATABASE camigos;
use camigos;

CREATE TABLE user(
user_id MEDIUMINT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
name VARCHAR(100) NOT NULL,
lastname VARCHAR(100) NOT NULL,
email VARCHAR(100) NOT NULL UNIQUE,
password VARCHAR(150) NOT NULL,
phone VARCHAR(20) DEFAULT NULL,
user_img VARCHAR(150) DEFAULT NULL,
type TINYINT(1) DEFAULT 0 NOT NULL,
deleted TINYINT(1) DEFAULT 1 NOT NULL
);

CREATE TABLE association(
association_id SMALLINT AUTO_INCREMENT PRIMARY KEY NOT NULL,
name_association VARCHAR(120) NOT NULL,
country VARCHAR(50) NOT NULL,
province VARCHAR(50) NOT NULL,
deleted TINYINT(1) DEFAULT 0,
owner_user_id MEDIUMINT UNSIGNED NOT NULL,
CONSTRAINT fk_user_1 FOREIGN KEY (owner_user_id)
REFERENCES user(user_id)
);

CREATE TABLE comment(
comment_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
user_id MEDIUMINT UNSIGNED NOT NULL,
association_id INT NOT NULL,
comment_text VARCHAR(255),
rating TINYINT NOT NULL,
deleted TINYINT(1) DEFAULT 0 NOT NULL,
CONSTRAINT fk_association_id_1 FOREIGN KEY (association_id)
REFERENCES association(association_id),
CONSTRAINT fk_user_2 FOREIGN KEY (user_id)
REFERENCES user(user_id)
);

CREATE TABLE puzzle(
puzzle_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
puzzle_img VARCHAR(250) DEFAULT NULL,
deleted TINYINT(1) DEFAULT 0 NOT NULL,
CONSTRAINT fk_user_3 FOREIGN KEY (user_id)
REFERENCES user(user_id)
);

-- La contraseña es "admin@admin.com"
INSERT INTO user (name, lastname, email, password, phone, user_img, type, deleted)
VALUES ('admin', 'admin','admin@admin.com', '$2a$08$9nED5MMmLmd/lt6zoajWaO6uJG6YIofmHfMWkHzGVTKL5R6085As2', '11111111A', 'foto.png', 2, 0);