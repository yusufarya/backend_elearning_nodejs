-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_classId_fkey`;

-- AlterTable
ALTER TABLE `users` MODIFY `classId` INTEGER NULL,
    MODIFY `status` INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_classId_fkey` FOREIGN KEY (`classId`) REFERENCES `classes`(`id_class`) ON DELETE SET NULL ON UPDATE CASCADE;
