const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();

//EstadoAsistencia

//Get
module.exports.getEstAsistencia = async (request, response, next) => {
  const asistencia = await prisma.estadoAsistencia.findMany({
    orderBy: {
      idAsistencia: "asc",
    },
  });
  response.json(asistencia);
};

//GetByIdAsistencia
module.exports.getByIdAsistencia = async (request, response, next) => {
  let idAsistencia = parseInt(request.params.idAsistencia);
  const asistencia = await prisma.estadoAsistencia.findUnique({
    where: { idAsistencia: idAsistencia },
  });
  response.json(asistencia);
};

//EstadoConfirm

//Get
module.exports.getEstConfirm = async (request, response, next) => {
  const confirmacion = await prisma.estadoConfirm.findMany({
    orderBy: {
      idEstadoConfir: "asc",
    },
  });
  response.json(confirmacion);
};

//GetByIdConfirm
module.exports.getByIdConfirm = async (request, response, next) => {
  let idEstadoConfir = parseInt(request.params.idEstadoConfir);
  const confirmacion = await prisma.estadoConfirm.findUnique({
    where: { idEstadoConfir: idEstadoConfir },
  });
  response.json(confirmacion);
};

//EstadoUsuario

//Get
module.exports.getEstUsuario = async (request, response, next) => {
  const usuario = await prisma.estadoUsuario.findMany({
    orderBy: {
      idEstUsuario: "asc",
    },
  });
  response.json(usuario);
};

//GetByIdUsuario
module.exports.getByIdUsuario= async (request, response, next) => {
  let idUsuario = parseInt(request.params.idUsuario);
  const usuario = await prisma.estadoUsuario.findUnique({
    where: { idEstUsuario: idUsuario },
  });
  response.json(usuario);
};

//Rol
//Get
module.exports.getRol = async (request, response, next) => {
  const rol = await prisma.rol.findMany({
    orderBy: {
      idRol: "asc",
    },
  });
  response.json(rol);
};
//GetById
module.exports.getByIdRol = async (request, response, next) => {
  let idRol = parseInt(request.params.idRol);
  const rol = await prisma.rol.findUnique({
    where: { idRol: idRol },
  });
  response.json(rol);
};
