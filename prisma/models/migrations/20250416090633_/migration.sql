-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_informations_id_fkey`;

-- AlterTable
ALTER TABLE `User` MODIFY `informations_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_informations_id_fkey` FOREIGN KEY (`informations_id`) REFERENCES `Informations`(`informations_id`) ON DELETE SET NULL ON UPDATE CASCADE;
