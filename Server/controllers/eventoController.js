const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get all
module.exports.getAll = async (request, response, next) => {
  try {
    const eventos = await prisma.evento.findMany({
      orderBy: {
        idEvento: "asc",
      },
      include: {
        administrador: true,
        asistencia: true,
      },
    });

    response.json(eventos);
  } catch (error) {
    next(error);
  }
};

//Get event by ID
module.exports.getById = async (request, response, next) => {
  const { id } = request.params;
  try {
    const evento = await prisma.evento.findUnique({
      where: {
        idEvento: parseInt(id, 10),
      },
      include: {
        administrador: true,
        asistencia: {
          include: {
            asociado: {
              select: {
                nombreCompleto: true,
                idEstUsuario: true,
                cedula: true,
                correo: true,
                idUsuario: true, 
              },
            },
            estadoConfir: {
              select: {
                idEstadoConfir: true,
                nombre: true,
              },
            },
            estadoAsistencia: {
              select: {
                idAsistencia: true,
                nombre: true,
              },
            },
          },
        },
      },
    });

    if (!evento) {
      return response.status(404).json({ error: "Evento no encontrado" });
    }

    const asistenciaActiva = evento.asistencia.filter(
      (asistencia) => asistencia.asociado.idEstUsuario === 1
    );

    const newEventDetail = {
      idEvento: evento.idEvento,
      idCreador: evento.idCreador,
      titulo: evento.titulo,
      descripcion: evento.descripcion,
      fecha: evento.fecha,
      hora: evento.hora,
      localizacion: evento.localizacion,
      administrador: evento.administrador.nombreCompleto,
      asistencia: asistenciaActiva.map((asistencia) => ({
        asociado: {
          nombreCompleto: asistencia.asociado.nombreCompleto,
          cedula: asistencia.asociado.cedula,
          correo: asistencia.asociado.correo,
          idUsuario: asistencia.asociado.idUsuario,
        },
        estadoConfirmacion: {
          idEstadoConfir: asistencia.estadoConfir.idEstadoConfir,
          nombre: asistencia.estadoConfir.nombre,
        },
        estadoAsistencia: {
          idAsistencia: asistencia.estadoAsistencia.idAsistencia,
          nombre: asistencia.estadoAsistencia.nombre,
        },
        contador: asistencia.contEnvios,
      })),
    };

    response.json(newEventDetail);
  } catch (error) {
    next(error);
  }
};

//Método para agregar datos fijos para reportes
//Create a new event
module.exports.create = async (request, response, next) => {
  const { idCreador, titulo, descripcion, fecha, hora, localizacion } =
    request.body;
  try {
    const evento = await prisma.evento.create({
      data: {
        idCreador,
        titulo,
        descripcion,
        fecha,
        hora,
        localizacion,
      },
    });

    response.status(201).json(evento);
  } catch (error) {
    next(error);
  }
};

//Método para crear evento y asistencia(Estado: No enviada)
module.exports.createEvent_Asistencia = async (request, response, next) => {
  try {
    const { idCreador, titulo, descripcion, fecha, hora, localizacion } =
      request.body;

    const newEvento = await prisma.evento.create({
      data: {
        idCreador,
        titulo,
        descripcion,
        fecha,
        hora,
        localizacion,
      },
    });

    const usuarios = await prisma.usuario.findMany({
      where: {
        idEstUsuario: 1,
        idRol: 3,
      },
      select: {
        idUsuario: true,
      },
    });

    const asistenciaData = usuarios.map((usuario) => ({
      idEvento: newEvento.idEvento,
      idAsociado: usuario.idUsuario,
      idEstadoConfir: 4,
      idAsistencia: 3,
      contEnvios: 0,
    }));

    await prisma.asistencia.createMany({
      data: asistenciaData,
    });

    response.status(201).json(newEvento);
  } catch (error) {
    next(error);
  }
};

// // Update event
module.exports.update = async (request, response, next) => {
  const {
    idEvento,
    idCreador,
    titulo,
    descripcion,
    fecha,
    hora,
    localizacion,
  } = request.body;
  try {
    const updatedEvento = await prisma.evento.update({
      where: { idEvento: Number(idEvento) },
      data: {
        idCreador,
        titulo,
        descripcion,
        fecha,
        hora,
        localizacion,
      },
    });

    response.json(updatedEvento);
  } catch (error) {
    next(error);
  }
};

// // Delete an event
module.exports.delete = async (request, response, next) => {
  const { id } = request.params;
  try {
    await prisma.evento.delete({
      where: { idEvento: Number(id) },
    });

    response.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports.searchByTitle = async (request, response, next) => {
  const { titulo } = request.query;
  try {
    const eventos = await prisma.evento.findMany({
      where: {
        titulo: {
          contains: titulo,
        },
      },
    });
    response.json(eventos);
  } catch (error) {
    next(error);
  }
};

// // Update asistencia
module.exports.updateAsistencia = async (request, response, next) => {
  const { eventId, asociadoId, asistenciaId } = request.body;

  try {
    const evento = await prisma.evento.findUnique({
      where: {
        idEvento: parseInt(eventId, 10),
      },
    });

    if (!evento) {
      return response.status(404).json({ error: "Evento no encontrado" });
    }

    const usuario = await prisma.usuario.findUnique({
      where: {
        idUsuario: parseInt(asociadoId, 10),
      }
    });

    const updateAsistencia = await prisma.asistencia.updateMany({
      where: {
        idEvento: parseInt(evento.idEvento, 10),
        idAsociado: usuario.idUsuario,
      },
      data: {
        idAsistencia: asistenciaId,
      },
    });

    response.json(updateAsistencia);
  } catch (error) {
    next(error);
  }
};

module.exports.getActiveEventos = async (request, response, next) => {
  try {
    const currentDate = new Date().toISOString();

    const eventos = await prisma.evento.findMany({
      where: {
        fecha: {
          gt: currentDate
        }
      },
      orderBy: {
        fecha: "asc",
      },
      include: {
        administrador: true,
        asistencia: true,
      },
    });

    response.json(eventos);
  } catch (error) {
    next(error);
  }
};

