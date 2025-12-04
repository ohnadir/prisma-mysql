-- DropForeignKey
ALTER TABLE `fcmtoken` DROP FOREIGN KEY `FcmToken_userId_fkey`;

-- AddForeignKey
ALTER TABLE `FcmToken` ADD CONSTRAINT `fk_fcmtoken_user` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
