/*
  Warnings:

  - You are about to drop the column `userId` on the `fcmtoken` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[token]` on the table `FcmToken` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user` to the `FcmToken` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `fcmtoken` DROP FOREIGN KEY `FcmToken_userId_fkey`;

-- DropIndex
DROP INDEX `FcmToken_userId_fkey` ON `fcmtoken`;

-- AlterTable
ALTER TABLE `fcmtoken` DROP COLUMN `userId`,
    ADD COLUMN `user` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Banner` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `image` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Category_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Faq` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `question` VARCHAR(191) NOT NULL,
    `answer` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `FcmToken_token_key` ON `FcmToken`(`token`);

-- CreateIndex
CREATE INDEX `FcmToken_user_idx` ON `FcmToken`(`user`);

-- AddForeignKey
ALTER TABLE `FcmToken` ADD CONSTRAINT `FcmToken_user_fkey` FOREIGN KEY (`user`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
