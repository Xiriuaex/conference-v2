-- DropForeignKey
ALTER TABLE `Member` DROP FOREIGN KEY `Member_profileId_fkey`;

-- AddForeignKey
ALTER TABLE `Member` ADD CONSTRAINT `Member_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `Profile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
