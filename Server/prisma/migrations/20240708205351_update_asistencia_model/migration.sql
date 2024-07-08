/*
  Warnings:

  - Added the required column `contEnvios` to the `Asistencia` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `asistencia` ADD COLUMN `contEnvios` INTEGER NOT NULL;
