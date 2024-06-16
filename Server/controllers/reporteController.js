const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();

//Reportes

//Asistencia
module.exports.getAsistencia = async (request, response, next) => {
  const result = await prisma.$queryRaw(
    Prisma.sql`SELECT u.cedula, u.nombreCompleto, u.correo, u.telefono FROM usuario u, asistencia a WHERE (u.idEstUsuario = 1 AND u.idUsuario = a.idAsociado) AND (idEstadoConfir = 1 AND idAsistencia = 1) GROUP BY u.cedula`
  )
  response.json(result);
};

//Ausencia
module.exports.getAusencia = async (request, response, next) => {
  const result = await prisma.$queryRaw(
    Prisma.sql`SELECT u.cedula, u.nombreCompleto, u.correo, u.telefono FROM usuario u, asistencia a WHERE (u.idEstUsuario = 1 AND u.idUsuario = a.idAsociado) AND (idEstadoConfir = 2 AND idAsistencia = 2) GROUP BY u.cedula`
  );

  response.json(result);
};

//Aceptaron ir pero no llegaron
module.exports.getNollegaron = async (request, response, next) => {
  const result = await prisma.$queryRaw(
    Prisma.sql`SELECT u.cedula, u.nombreCompleto, u.correo, u.telefono FROM usuario u, asistencia a WHERE (u.idEstUsuario = 1 AND u.idUsuario = a.idAsociado) AND (idEstadoConfir = 1 AND idAsistencia = 2) GROUP BY u.cedula`
  );

  response.json(result);
};

//No han asistido 0 veces
module.exports.getNoAsistencia = async (request, response, next) => {
  const result = await prisma.$queryRaw(
    Prisma.sql`SELECT u.cedula, u.nombreCompleto, u.correo, u.telefono, count(idAsociado) AS totalAusencias FROM usuario u, asistencia a WHERE (u.idEstUsuario = 1 AND u.idUsuario = a.idAsociado) AND ((idEstadoConfir = 1 OR idEstadoConfir = 2) AND idAsistencia = 2) GROUP BY u.cedula HAVING totalAusencias >= 3`
  );

  response.json(result);
};
