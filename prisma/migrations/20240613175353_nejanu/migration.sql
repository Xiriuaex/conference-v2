/*
  Warnings:

  - You are about to drop the column `admin` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Meetings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_MeetingsToRoom` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_MeetingsToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_MeetingsToRoom` DROP FOREIGN KEY `_MeetingsToRoom_A_fkey`;

-- DropForeignKey
ALTER TABLE `_MeetingsToRoom` DROP FOREIGN KEY `_MeetingsToRoom_B_fkey`;

-- DropForeignKey
ALTER TABLE `_MeetingsToUser` DROP FOREIGN KEY `_MeetingsToUser_A_fkey`;

-- DropForeignKey
ALTER TABLE `_MeetingsToUser` DROP FOREIGN KEY `_MeetingsToUser_B_fkey`;

-- DropIndex
DROP INDEX `User_username_key` ON `User`;

-- AlterTable
ALTER TABLE `Room` DROP COLUMN `admin`,
    ADD COLUMN `description` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `username`;

-- DropTable
DROP TABLE `Meetings`;

-- DropTable
DROP TABLE `_MeetingsToRoom`;

-- DropTable
DROP TABLE `_MeetingsToUser`;
