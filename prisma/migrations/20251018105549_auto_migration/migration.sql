-- DropIndex
DROP INDEX `User_contact_key` ON `user`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `authentication` JSON NULL,
    ADD COLUMN `location` VARCHAR(191) NULL,
    ADD COLUMN `profile` VARCHAR(191) NULL DEFAULT 'https://res.cloudinary.com/dzo4husae/image/upload/v1733459922/zfyfbvwgfgshmahyvfyk.png',
    ALTER COLUMN `role` DROP DEFAULT;

-- CreateTable
CREATE TABLE `FcmToken` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `token` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `FcmToken` ADD CONSTRAINT `FcmToken_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
