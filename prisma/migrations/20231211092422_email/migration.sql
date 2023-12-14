/*
  Warnings:

  - Added the required column `userEmail` to the `Quiz` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `quiz` ADD COLUMN `userEmail` VARCHAR(191) NOT NULL;
