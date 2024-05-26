/*
  Warnings:

  - You are about to drop the column `providerId` on the `accounts` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[provider,provider_account_id]` on the table `accounts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `provider` to the `accounts` table without a default value. This is not possible if the table is not empty.
  - Made the column `providerType` on table `accounts` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX `accounts_providerId_provider_account_id_key` ON `accounts`;

-- AlterTable
ALTER TABLE `accounts` DROP COLUMN `providerId`,
    ADD COLUMN `provider` VARCHAR(191) NOT NULL,
    MODIFY `providerType` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `accounts_provider_provider_account_id_key` ON `accounts`(`provider`, `provider_account_id`);
