const { PrismaClient, Prisma } = require("@prisma/client");
const { response } = require("express");
const { request } = require("http");
const { parse } = require("path");
const prisma = new PrismaClient();

//Crear asistencia - Prueba para reportes
module.exports.create = async (request, response, next) => {
  try {
    const info = request.body;

    const newAsis = await prisma.asistencia.createMany({
      data: info,
    });

    response.status(200).json({
      status: true,
      message: "Creado exitosamente",
      data: newAsis,
    });
  } catch (error) {
    response.status(500).json({ message: "Error en la creación" });
  }
};
