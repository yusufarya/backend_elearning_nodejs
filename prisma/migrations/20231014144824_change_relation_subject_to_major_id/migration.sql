-- CreateTable
CREATE TABLE `users` (
    `identity_number` CHAR(20) NOT NULL,
    `fullname` VARCHAR(100) NOT NULL,
    `gender` ENUM('M', 'F') NOT NULL,
    `place_of_birth` VARCHAR(30) NOT NULL,
    `date_of_birth` DATE NOT NULL,
    `telp` CHAR(20) NOT NULL,
    `address` TEXT NULL,
    `religion` VARCHAR(30) NULL,
    `majorId` INTEGER NULL,
    `gradeId` INTEGER NULL,
    `subjectId` TEXT NULL,
    `email` VARCHAR(256) NOT NULL,
    `password` VARCHAR(256) NOT NULL,
    `image` TEXT NULL,
    `status` INTEGER NOT NULL DEFAULT 1,
    `roleId` INTEGER NOT NULL,
    `token` VARCHAR(100) NULL,
    `createdAt` DATE NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `users_majorId_key`(`majorId`),
    UNIQUE INDEX `users_gradeId_key`(`gradeId`),
    PRIMARY KEY (`identity_number`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `major` (
    `id_major` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(30) NOT NULL,

    PRIMARY KEY (`id_major`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `grade` (
    `id_grade` INTEGER NOT NULL AUTO_INCREMENT,
    `grade` VARCHAR(30) NOT NULL,

    PRIMARY KEY (`id_grade`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `gradeCategory` (
    `id_category` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `gradeId` INTEGER NOT NULL,

    PRIMARY KEY (`id_category`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subjects` (
    `id_subject` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `gradeId` INTEGER NOT NULL,
    `majorId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdBy` VARCHAR(50) NOT NULL,
    `updatedAt` DATETIME(3) NULL,
    `updatedBy` VARCHAR(50) NULL,

    PRIMARY KEY (`id_subject`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `scheduleOfSubjects` (
    `id_schedule` INTEGER NOT NULL AUTO_INCREMENT,
    `subjectId` INTEGER NOT NULL,
    `semesterId` INTEGER NOT NULL,
    `day` VARCHAR(50) NOT NULL,
    `start_time` TIME(0) NOT NULL,
    `end_time` TIME(0) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdBy` VARCHAR(50) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `updatedBy` VARCHAR(50) NULL,

    PRIMARY KEY (`id_schedule`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MaterialDiscussion` (
    `id_discuss` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(100) NOT NULL,
    `iscuss` TEXT NOT NULL,
    `date` DATE NOT NULL,
    `file` TEXT NOT NULL,
    `link` VARCHAR(100) NOT NULL,
    `subjectId` INTEGER NOT NULL,
    `semesterId` INTEGER NOT NULL,
    `meeting` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdBy` VARCHAR(50) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `updatedBy` VARCHAR(50) NULL,

    PRIMARY KEY (`id_discuss`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `task` (
    `id_task` INTEGER NOT NULL AUTO_INCREMENT,
    `discussId` INTEGER NOT NULL,
    `semesterId` INTEGER NOT NULL,
    `taskTitle` VARCHAR(100) NULL,
    `deskripsi` TEXT NULL,
    `file` TEXT NOT NULL,
    `meeting` INTEGER NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `updatedBy` VARCHAR(50) NULL,

    PRIMARY KEY (`id_task`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `evaluation` (
    `id_evaluation` INTEGER NOT NULL AUTO_INCREMENT,
    `identity_number` CHAR(20) NOT NULL,
    `file` TEXT NOT NULL,
    `taskId` INTEGER NOT NULL,
    `value` DOUBLE NULL,
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedBy` VARCHAR(50) NULL,

    PRIMARY KEY (`id_evaluation`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `userRole` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `role` VARCHAR(30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `semester` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_majorId_fkey` FOREIGN KEY (`majorId`) REFERENCES `major`(`id_major`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_gradeId_fkey` FOREIGN KEY (`gradeId`) REFERENCES `grade`(`id_grade`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `userRole`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `gradeCategory` ADD CONSTRAINT `gradeCategory_gradeId_fkey` FOREIGN KEY (`gradeId`) REFERENCES `grade`(`id_grade`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `subjects` ADD CONSTRAINT `subjects_gradeId_fkey` FOREIGN KEY (`gradeId`) REFERENCES `grade`(`id_grade`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `subjects` ADD CONSTRAINT `subjects_majorId_fkey` FOREIGN KEY (`majorId`) REFERENCES `major`(`id_major`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `scheduleOfSubjects` ADD CONSTRAINT `scheduleOfSubjects_subjectId_fkey` FOREIGN KEY (`subjectId`) REFERENCES `subjects`(`id_subject`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `scheduleOfSubjects` ADD CONSTRAINT `scheduleOfSubjects_semesterId_fkey` FOREIGN KEY (`semesterId`) REFERENCES `semester`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MaterialDiscussion` ADD CONSTRAINT `MaterialDiscussion_subjectId_fkey` FOREIGN KEY (`subjectId`) REFERENCES `subjects`(`id_subject`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MaterialDiscussion` ADD CONSTRAINT `MaterialDiscussion_semesterId_fkey` FOREIGN KEY (`semesterId`) REFERENCES `semester`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `task` ADD CONSTRAINT `task_discussId_fkey` FOREIGN KEY (`discussId`) REFERENCES `MaterialDiscussion`(`id_discuss`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `task` ADD CONSTRAINT `task_semesterId_fkey` FOREIGN KEY (`semesterId`) REFERENCES `semester`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `evaluation` ADD CONSTRAINT `evaluation_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `task`(`id_task`) ON DELETE RESTRICT ON UPDATE CASCADE;
