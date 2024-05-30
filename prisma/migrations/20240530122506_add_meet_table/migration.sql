/*
  Warnings:

  - You are about to drop the `VerificationToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `Room` MODIFY `name` VARCHAR(191) NULL,
    MODIFY `imageUrl` TEXT NULL,
    MODIFY `inviteCode` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `VerificationToken`;

-- CreateTable
CREATE TABLE `Meetings` (
    `meetId` VARCHAR(191) NOT NULL,
    `meetName` VARCHAR(191) NULL,
    `meetDesc` LONGTEXT NULL,
    `meetDuration` VARCHAR(191) NULL,
    `meetInviteCode` VARCHAR(191) NULL,
    `startingTime` DATETIME(3) NOT NULL,
    `endingTime` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`meetId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_MeetingsToUser` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_MeetingsToUser_AB_unique`(`A`, `B`),
    INDEX `_MeetingsToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_MeetingsToRoom` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_MeetingsToRoom_AB_unique`(`A`, `B`),
    INDEX `_MeetingsToRoom_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_MeetingsToUser` ADD CONSTRAINT `_MeetingsToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `Meetings`(`meetId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_MeetingsToUser` ADD CONSTRAINT `_MeetingsToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_MeetingsToRoom` ADD CONSTRAINT `_MeetingsToRoom_A_fkey` FOREIGN KEY (`A`) REFERENCES `Meetings`(`meetId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_MeetingsToRoom` ADD CONSTRAINT `_MeetingsToRoom_B_fkey` FOREIGN KEY (`B`) REFERENCES `Room`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
