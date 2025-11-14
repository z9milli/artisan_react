/* Suppression de la base si elle existe déjà */
DROP DATABASE IF EXISTS `trouve_ton_artisan`;

/* Création de la base de données */
CREATE DATABASE IF NOT EXISTS trouve_ton_artisan CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `trouve_ton_artisan`;

/* Création de l'utilisateur */
CREATE USER 'ton_artisan'@'localhost' IDENTIFIED BY 'T********';
GRANT SELECT, INSERT, UPDATE, DELETE ON trouve_ton_artisan.* TO 'ton_artisan'@'localhost';