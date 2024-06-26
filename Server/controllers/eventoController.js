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
        asistencia: {
          include: {
            asociado: {
              select: {
                nombreCompleto: true,
                idEstUsuario: true 
              }
            },
            estadoConfir: {
              select: {
                nombre: true
              }
            },
            estadoAsistencia: {
              select: {
                nombre: true
              }
            }
          }
        }
      }
    });

    if (!evento) {
      return response.status(404).json({ error: "Evento no encontrado" });
    }

    const asistenciaActiva = evento.asistencia.filter(asistencia => asistencia.asociado.idEstUsuario === 1);

    const newEventDetail = {
      idEvento: evento.idEvento,
      idCreador: evento.idCreador,
      titulo: evento.titulo,
      descripcion: evento.descripcion,
      fecha: evento.fecha,
      hora: evento.hora,
      localizacion: evento.localizacion,
      asistencia: asistenciaActiva.map(asistencia => ({
        asociado: {
          nombreCompleto: asistencia.asociado.nombreCompleto,
        },
        estadoConfirmacion: {
          nombre: asistencia.estadoConfir.nombre
        },
        estadoAsistencia: {
          nombre: asistencia.estadoAsistencia.nombre
        }
      }))
    };

    response.json(newEventDetail);
  } catch (error) {
    next(error);
  }
};


// Create a new event
module.exports.create = async (request, response, next) => {
  const { idCreador, titulo, descripcion, fecha, hora, localizacion } = request.body;
  try {
    const evento = await prisma.evento.create({
      data: {
        idCreador,
        titulo,
        descripcion,
        fecha,
        hora,
        localizacion
      },
    });

    response.status(201).json(evento);
  } catch (error) {
    next(error);
  }
};

// // Update event
module.exports.update = async (request, response, next) => {
  const { idEvento, idCreador, titulo, descripcion, fecha, hora, localizacion } =
    request.body;
  try {
    const updatedEvento = await prisma.evento.update({
      where: { idEvento: Number(idEvento) },
      data: {
        idCreador,
        titulo,
        descripcion,
        fecha,
        hora,
        localizacion
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
          contains: titulo
        },
      }
    });
    response.json(eventos);
  } catch (error) {
    next(error);
  }
};
