-- CREATE DATABASE `smarthack`;

CREATE TABLE `blockchain` (
  `number` int NOT NULL AUTO_INCREMENT,
  `hash` varchar(64) DEFAULT NULL,
  `previous` varchar(64) DEFAULT NULL,
  `nonce` int DEFAULT NULL,
  `data` varchar(4096) DEFAULT NULL,
  PRIMARY KEY (`number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `smarthack`.`documents` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(256) NULL,
  `file_path` VARCHAR(4096) NULL,
  `size` INT NULL,
  PRIMARY KEY (`id`));
