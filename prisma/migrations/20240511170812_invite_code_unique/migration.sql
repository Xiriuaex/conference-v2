/*
  Warnings:

  - A unique constraint covering the columns `[inviteCode]` on the table `Room` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Room` MODIFY `inviteCode` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Room_inviteCode_key` ON `Room`(`inviteCode`);
