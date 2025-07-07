/*
  Warnings:

  - You are about to drop the `Appointment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Document` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Event` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Informations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Message` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `QueueEntry` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Token` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Workshop` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_workshop_tags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Appointment` DROP FOREIGN KEY `Appointment_advisor_id_fkey`;

-- DropForeignKey
ALTER TABLE `Appointment` DROP FOREIGN KEY `Appointment_member_id_fkey`;

-- DropForeignKey
ALTER TABLE `Document` DROP FOREIGN KEY `Document_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `Event` DROP FOREIGN KEY `Event_workshop_id_fkey`;

-- DropForeignKey
ALTER TABLE `Message` DROP FOREIGN KEY `Message_receiver_id_fkey`;

-- DropForeignKey
ALTER TABLE `Message` DROP FOREIGN KEY `Message_sender_id_fkey`;

-- DropForeignKey
ALTER TABLE `QueueEntry` DROP FOREIGN KEY `QueueEntry_event_id_fkey`;

-- DropForeignKey
ALTER TABLE `QueueEntry` DROP FOREIGN KEY `QueueEntry_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `Token` DROP FOREIGN KEY `Token_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_informations_id_fkey`;

-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_users_id_fkey`;

-- DropForeignKey
ALTER TABLE `_workshop_tags` DROP FOREIGN KEY `_workshop_tags_A_fkey`;

-- DropForeignKey
ALTER TABLE `_workshop_tags` DROP FOREIGN KEY `_workshop_tags_B_fkey`;

-- DropTable
DROP TABLE `Appointment`;

-- DropTable
DROP TABLE `Document`;

-- DropTable
DROP TABLE `Event`;

-- DropTable
DROP TABLE `Informations`;

-- DropTable
DROP TABLE `Message`;

-- DropTable
DROP TABLE `QueueEntry`;

-- DropTable
DROP TABLE `Tag`;

-- DropTable
DROP TABLE `Token`;

-- DropTable
DROP TABLE `User`;

-- DropTable
DROP TABLE `Workshop`;

-- DropTable
DROP TABLE `_workshop_tags`;
