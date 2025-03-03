/*
  Warnings:

  - You are about to drop the column `age` on the `member` table. All the data in the column will be lost.
  - You are about to drop the column `nom` on the `member` table. All the data in the column will be lost.
  - You are about to drop the column `prenom` on the `member` table. All the data in the column will be lost.
  - Added the required column `birthDate` to the `Member` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `Member` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Member` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Member` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Member_nom_prenom_key` ON `member`;

-- AlterTable
ALTER TABLE `member` DROP COLUMN `age`,
    DROP COLUMN `nom`,
    DROP COLUMN `prenom`,
    ADD COLUMN `birthDate` DATETIME(3) NOT NULL,
    ADD COLUMN `firstName` VARCHAR(191) NOT NULL,
    ADD COLUMN `lastName` VARCHAR(191) NOT NULL,
    ADD COLUMN `password` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Token` (
    `id_token` INTEGER NOT NULL AUTO_INCREMENT,
    `tokenType` ENUM('REFRESH_TOKEN', 'UNVERIFIED_MAIL_CHANGE', 'MAIL_VALIDATE') NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `type_user` ENUM('EMPLOYEE', 'MEMBER') NOT NULL,
    `id_user` INTEGER NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Token_token_key`(`token`),
    PRIMARY KEY (`id_token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
