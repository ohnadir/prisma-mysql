/*
  Warnings:

  - A unique constraint covering the columns `[contact]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `contact` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_contact_key` ON `User`(`contact`);
