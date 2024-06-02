-- CreateTable
CREATE TABLE `EstadoUsuario` (
    `idEstUsuario` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`idEstUsuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EstadoConfirm` (
    `idEstadoConfir` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`idEstadoConfir`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EstadoAsistencia` (
    `idAsistencia` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`idAsistencia`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Rol` (
    `idRol` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`idRol`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Evento` (
    `idEvento` INTEGER NOT NULL AUTO_INCREMENT,
    `idCreador` INTEGER NOT NULL,
    `titulo` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(250) NOT NULL,
    `fecha` VARCHAR(191) NOT NULL,
    `hora` VARCHAR(191) NOT NULL,
    `localizacion` VARCHAR(250) NOT NULL,

    PRIMARY KEY (`idEvento`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Usuario` (
    `idUsuario` INTEGER NOT NULL AUTO_INCREMENT,
    `idRol` INTEGER NOT NULL,
    `idEstUsuario` INTEGER NOT NULL,
    `cedula` CHAR(9) NOT NULL,
    `nombre` VARCHAR(50) NOT NULL,
    `apellido1` VARCHAR(50) NOT NULL,
    `apellido2` VARCHAR(50) NOT NULL,
    `correo` VARCHAR(250) NOT NULL,
    `contrasena` VARCHAR(191) NOT NULL,
    `telefono` CHAR(8) NOT NULL,

    UNIQUE INDEX `Usuario_correo_key`(`correo`),
    PRIMARY KEY (`idUsuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Asistencia` (
    `idConfirm` INTEGER NOT NULL AUTO_INCREMENT,
    `idEvento` INTEGER NOT NULL,
    `idAsociado` INTEGER NOT NULL,
    `idEstadoConfir` INTEGER NOT NULL,
    `idAsistencia` INTEGER NOT NULL,

    PRIMARY KEY (`idConfirm`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Evento` ADD CONSTRAINT `Evento_idCreador_fkey` FOREIGN KEY (`idCreador`) REFERENCES `Usuario`(`idUsuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_idRol_fkey` FOREIGN KEY (`idRol`) REFERENCES `Rol`(`idRol`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_idEstUsuario_fkey` FOREIGN KEY (`idEstUsuario`) REFERENCES `EstadoUsuario`(`idEstUsuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Asistencia` ADD CONSTRAINT `Asistencia_idEvento_fkey` FOREIGN KEY (`idEvento`) REFERENCES `Evento`(`idEvento`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Asistencia` ADD CONSTRAINT `Asistencia_idAsociado_fkey` FOREIGN KEY (`idAsociado`) REFERENCES `Usuario`(`idUsuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Asistencia` ADD CONSTRAINT `Asistencia_idEstadoConfir_fkey` FOREIGN KEY (`idEstadoConfir`) REFERENCES `EstadoConfirm`(`idEstadoConfir`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Asistencia` ADD CONSTRAINT `Asistencia_idAsistencia_fkey` FOREIGN KEY (`idAsistencia`) REFERENCES `EstadoAsistencia`(`idAsistencia`) ON DELETE RESTRICT ON UPDATE CASCADE;
