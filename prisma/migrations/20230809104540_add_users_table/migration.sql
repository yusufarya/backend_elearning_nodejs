-- CreateTable
CREATE TABLE `users` (
    `identity_number` VARCHAR(20) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `gender` ENUM('MALE', 'FEMALE') NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `image` VARCHAR(191) NULL,
    `role` ENUM('ADMINISTRATOR', 'TEACHER', 'STUDENT') NOT NULL DEFAULT 'ADMINISTRATOR',
    `token` VARCHAR(100) NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`identity_number`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
