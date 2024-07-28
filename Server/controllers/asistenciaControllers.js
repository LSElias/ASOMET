const { PrismaClient, Prisma } = require("@prisma/client");
const { response } = require("express");
const { request } = require("http");
const { parse } = require("path");
const prisma = new PrismaClient();



module.exports.confirmarAsistencia = async (request, response, next) => {
    const { eventoId } = request.params;
    const { usuarioId } = request.body;
  
    try {
      await prisma.asistencia.updateMany({
        where: {
          idEvento: parseInt(eventoId, 10),
          idUsuario: usuarioId,
        },
        data: {
          idEstadoConfir: 1,
        },
      });
  
      response.json({ message: 'Asistencia confirmada' });
    } catch (error) {
      response.status(500).json({ error: 'Error al confirmar asistencia' });
    }
  };

  module.exports.rechazarAsistencia = async (request, response, next) => {
    const { eventoId } = request.params;
    const { usuarioId } = request.body;
  
    try {
      await prisma.asistencia.updateMany({
        where: {
          idEvento: parseInt(eventoId, 10),
          idUsuario: usuarioId,
        },
        data: {
          idEstadoConfir: 2, // Estado rechazado
        },
      });
  
      response.json({ message: 'Asistencia rechazada' });
    } catch (error) {
      response.status(500).json({ error: 'Error al rechazar asistencia' });
    }
  };