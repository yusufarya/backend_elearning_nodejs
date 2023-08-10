/*
  Warnings:

  - Added the required column `file` to the `evaluation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `file` to the `task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `evaluation` ADD COLUMN `file` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `task` ADD COLUMN `file` TEXT NOT NULL;
