/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Room` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Room` DROP COLUMN `imageUrl`,
    MODIFY `description` TEXT NULL;
