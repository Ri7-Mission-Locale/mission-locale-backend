-- CreateTable
CREATE TABLE `Appointment` (
    `rdv_id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `type` ENUM('INSCRIPTION', 'OTHER') NOT NULL DEFAULT 'INSCRIPTION',
    `date` DATETIME(3) NOT NULL,
    `duration` DATETIME(3) NOT NULL,
    `state` ENUM('PENDING', 'VALIDATED', 'CANCELLED', 'MISSED', 'COMPLETED') NOT NULL DEFAULT 'PENDING',
    `advisor_id` VARCHAR(191) NOT NULL,
    `member_id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Appointment_rdv_id_key`(`rdv_id`),
    PRIMARY KEY (`rdv_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Document` (
    `document_id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` ENUM('CNI', 'JUSTIFICATION_DOMICILE', 'PASSPORT', 'PERMIS_DE_CONDUIRE', 'OTHER') NOT NULL,
    `path` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Document_document_id_key`(`document_id`),
    PRIMARY KEY (`document_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Event` (
    `event_id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `size` INTEGER NOT NULL,
    `workshop_id` INTEGER NOT NULL,

    UNIQUE INDEX `Event_event_id_key`(`event_id`),
    PRIMARY KEY (`event_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Informations` (
    `informations_id` INTEGER NOT NULL AUTO_INCREMENT,
    `gender` ENUM('M', 'MME') NULL,
    `family_situation` ENUM('SINGLE', 'MARRIED') NULL,
    `marital_name` VARCHAR(191) NULL,
    `childrens` INTEGER NULL DEFAULT 0,
    `birth_city` VARCHAR(191) NULL,
    `home_number` INTEGER NULL,
    `home_address` VARCHAR(191) NULL,
    `home_postal_code` INTEGER NULL,
    `home_municipality` VARCHAR(191) NULL,
    `nationnality` ENUM('FR', 'CEE', 'HORS_CEE', 'JAPD', 'RECENSE') NULL,
    `hosting` ENUM('AUTO', 'FAMILLY', 'FOYER', 'OTHER', 'PROBLEMS') NULL,
    `driving_liscence` ENUM('NO', 'WAINTING', 'YES') NULL,
    `transport` ENUM('NONE', 'AUTO', 'MOTO_OR_CYCLO') NULL,
    `social_coverage` ENUM('NONE', 'MUTUELLE', 'RSA', 'SOCIAL_SECURITY', 'BENEFICIARIES', 'RIGHT_HOLDERS', 'CMU') NULL,
    `ressources` ENUM('NONE', 'SALARIES', 'ARE_POLE_EMPLOI', 'RSA', 'OTHER') NULL,

    UNIQUE INDEX `Informations_informations_id_key`(`informations_id`),
    PRIMARY KEY (`informations_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Message` (
    `message_id` INTEGER NOT NULL AUTO_INCREMENT,
    `message` VARCHAR(191) NOT NULL,
    `sender_id` VARCHAR(191) NOT NULL,
    `receiver_id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Message_message_id_key`(`message_id`),
    PRIMARY KEY (`message_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `QueueEntry` (
    `queue_id` INTEGER NOT NULL AUTO_INCREMENT,
    `state` ENUM('REGISTERED', 'CANCELLED', 'PENDING') NOT NULL DEFAULT 'PENDING',
    `user_id` VARCHAR(191) NOT NULL,
    `event_id` INTEGER NOT NULL,

    UNIQUE INDEX `QueueEntry_queue_id_key`(`queue_id`),
    PRIMARY KEY (`queue_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tag` (
    `tag_name` VARCHAR(191) NOT NULL,
    `color` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Tag_tag_name_key`(`tag_name`),
    UNIQUE INDEX `Tag_color_key`(`color`),
    PRIMARY KEY (`tag_name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Token` (
    `token_id` INTEGER NOT NULL AUTO_INCREMENT,
    `token` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NULL,
    `agent` VARCHAR(191) NULL,
    `type` ENUM('REFRESH_TOKEN', 'MAIL_VALIDATION') NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Token_token_id_key`(`token_id`),
    UNIQUE INDEX `Token_token_key`(`token`),
    PRIMARY KEY (`token_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `user_id` VARCHAR(191) NOT NULL,
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `phone` CHAR(8) NOT NULL,
    `home_phone` CHAR(8) NULL,
    `birth_date` DATETIME(3) NOT NULL,
    `role` ENUM('USER', 'ADVISOR', 'ADMIN') NOT NULL DEFAULT 'USER',
    `verified` BOOLEAN NOT NULL DEFAULT false,
    `informations_id` INTEGER NOT NULL,
    `users_id` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_user_id_key`(`user_id`),
    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_informations_id_key`(`informations_id`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Workshop` (
    `workshop_id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Workshop_workshop_id_key`(`workshop_id`),
    PRIMARY KEY (`workshop_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_workshop_tags` (
    `A` VARCHAR(191) NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_workshop_tags_AB_unique`(`A`, `B`),
    INDEX `_workshop_tags_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Appointment` ADD CONSTRAINT `Appointment_advisor_id_fkey` FOREIGN KEY (`advisor_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Appointment` ADD CONSTRAINT `Appointment_member_id_fkey` FOREIGN KEY (`member_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Document` ADD CONSTRAINT `Document_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Event` ADD CONSTRAINT `Event_workshop_id_fkey` FOREIGN KEY (`workshop_id`) REFERENCES `Workshop`(`workshop_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_sender_id_fkey` FOREIGN KEY (`sender_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_receiver_id_fkey` FOREIGN KEY (`receiver_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QueueEntry` ADD CONSTRAINT `QueueEntry_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QueueEntry` ADD CONSTRAINT `QueueEntry_event_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `Event`(`event_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Token` ADD CONSTRAINT `Token_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_informations_id_fkey` FOREIGN KEY (`informations_id`) REFERENCES `Informations`(`informations_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_users_id_fkey` FOREIGN KEY (`users_id`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_workshop_tags` ADD CONSTRAINT `_workshop_tags_A_fkey` FOREIGN KEY (`A`) REFERENCES `Tag`(`tag_name`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_workshop_tags` ADD CONSTRAINT `_workshop_tags_B_fkey` FOREIGN KEY (`B`) REFERENCES `Workshop`(`workshop_id`) ON DELETE CASCADE ON UPDATE CASCADE;
