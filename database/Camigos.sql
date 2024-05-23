-- Esta es el script que he utilizado para crear la base de datos, con lo que se podría replicar. Podría haber incluido los cambios directamente en el create table, pero he decidido dejar las secuencias alter TABLE para que se vea la progresión.

CREATE DATABASE camigos;
use camigos;

CREATE TABLE user (
    user_id MEDIUMINT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(150) NOT NULL,
    phone VARCHAR(20) DEFAULT NULL,
    user_img VARCHAR(150) DEFAULT NULL,
    type TINYINT(1) DEFAULT 0 NOT NULL,
    deleted TINYINT(1) DEFAULT 0 NOT NULL
);

CREATE TABLE association (
    association_id SMALLINT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    owner_user_id MEDIUMINT UNSIGNED NOT NULL,
    name_association VARCHAR(120) NOT NULL,
    country VARCHAR(50) NOT NULL,
    province VARCHAR(50) NOT NULL,
    deleted TINYINT(1) DEFAULT 0,
    CONSTRAINT fk_user_1 FOREIGN KEY (owner_user_id)
        REFERENCES user (user_id)
);

CREATE TABLE comment (
    comment_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    user_id MEDIUMINT UNSIGNED NOT NULL,
    association_id SMALLINT NOT NULL,
    comment_text VARCHAR(255),
    rating TINYINT NOT NULL,
    deleted TINYINT(1) DEFAULT 0 NOT NULL,
    CONSTRAINT fk_association_id_1 FOREIGN KEY (association_id)
        REFERENCES association (association_id),
    CONSTRAINT fk_user_2 FOREIGN KEY (user_id)
        REFERENCES user (user_id)
);

CREATE TABLE puzzle (
    puzzle_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    user_id MEDIUMINT UNSIGNED NOT NULL,
    puzzle_img VARCHAR(250) DEFAULT NULL,
    deleted TINYINT(1) DEFAULT 0 NOT NULL,
    CONSTRAINT fk_user_3 FOREIGN KEY (user_id)
        REFERENCES user (user_id)
);

-- La contraseña es "admin@admin.com"
INSERT INTO user (name, lastname, email, password, phone, user_img, type, deleted)
VALUES ('admin', 'admin','admin@admin.com', '$2a$08$9nED5MMmLmd/lt6zoajWaO6uJG6YIofmHfMWkHzGVTKL5R6085As2', '11111111A', 'foto.png', 2, 0);
INSERT INTO user (name, lastname, email, password, phone, user_img, type, deleted)
VALUES ('roque', 'perez','roque@roque.com', '$2a$08$9nED5MMmLmd/lt6zoajWaO6uJG6YIofmHfMWkHzGVTKL5R6085As2', '690311993', 'foto.png', 1, 0);
ALTER TABLE association DROP FOREIGN KEY fk_user_1;
ALTER TABLE association DROP COLUMN owner_user_id;
ALTER TABLE association ADD COLUMN description TEXT;
ALTER TABLE association ADD COLUMN url VARCHAR(255);
ALTER TABLE association ADD COLUMN image VARCHAR(200);
ALTER TABLE `user`ALTER COLUMN `type` SET DEFAULT 1;
ALTER TABLE user DROP COLUMN phone;

INSERT INTO `camigos`.`association`(`name_association`,`country`,`province`,`description`,`url`,`image`)VALUES('Assaib Eivissa','españa','ibiza','Associació Animalista de les Illes Balears.Trabajamos por los derechos y el bienestar de los animales. Trabajan tanto con perros como con otros animales','https://www.facebook.com/assaibibiza.ibiza/','assaib.jpg');
INSERT INTO `camigos`.`association`(`name_association`,`country`,`province`,`description`,`url`,`image`)VALUES('Fundacion Pai','españa','ibiza','La Fundación PERROS ABANDONADOS EN IBIZA, entidad sin ánimos de lucro, constituida en Ibiza en el año 2015 e inscripta con el número 100000000352 en el registro de Fundaciones de Baleares, desarrolla programas y proyectos dedicados todos ellos a la ayuda de los perros y gatos abandonados de Ibiza y Formentera, y se financia con las aportaciones económicas de particulares.','https://fundacionpai.com/','fundacionpai.jpg');
UPDATE `camigos`.`association`SET `name_association` = 'Fundacion Pai' WHERE `name_association` = 'fundacion Pai';
select * from association;
select * from user;
SELECT * from association WHERE association_id = 1;

INSERT INTO `camigos`.`comment`(`user_id`,`association_id`, `comment_text`, `rating`) VALUES ( 2, 1, 'Tenía mucho miedo porque oí hablar mal de algunas asociaciones, pero esta me ayudó mucho y su web está llena de recursos', 3);
SELECT name, comment_text, rating FROM user, comment WHERE association_id = 1 AND user.user_id = comment.user_id;
SELECT comment_text, name_association, rating FROM comment, association, user WHERE comment.user_id = 2 and  comment.association_id = association.association_id and comment.user_id = user.user_id ;
INSERT INTO comment (user_id, association_id, comment_text, rating) VALUES (1, 2, 'esta asociación es la mejor claramente', '5');

SELECT name, comment_text, rating FROM user, comment WHERE association_id = 14 AND user.user_id = comment.user_id;
SELECT * FROM user WHERE email = 'resuelve@resuelve.com'