/*
  Warnings:

  - You are about to drop the column `user` on the `fcmtoken` table. All the data in the column will be lost.
  - Added the required column `userId` to the `FcmToken` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `fcmtoken` DROP FOREIGN KEY `FcmToken_user_fkey`;

-- DropIndex
DROP INDEX `FcmToken_user_idx` ON `fcmtoken`;

-- AlterTable
ALTER TABLE `fcmtoken` DROP COLUMN `user`,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX `FcmToken_userId_idx` ON `FcmToken`(`userId`);

-- AddForeignKey
ALTER TABLE `FcmToken` ADD CONSTRAINT `FcmToken_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
