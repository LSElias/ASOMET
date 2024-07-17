const { PrismaClient, Prisma } = require("@prisma/client");
const { response } = require("express");
const { request } = require("http");
const { parse } = require("path");
const prisma = new PrismaClient();

//Crear asistencia.

//Multiple registros
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

//Registro simple
module.exports.createSimple = async (request, response, next) => {
  try {
    const info = request.body;

    const newAsis = await prisma.asistencia.create({
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
