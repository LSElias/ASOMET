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
        asistencia: true,
      },
    });
    if (evento) {
      response.json(evento);
    } else {
      response.status(404).json({ error: "Evento no encontrado" });
    }
  } catch (error) {
    next(error);
  }
};

// Create a new event
// module.exports.create = async (request, response, next) => {
//   const { idCreador, titulo, descripcion, fecha, hora, localizacion } = request.body;
//   try {
//     const newEvento = await prisma.evento.create({
//       data: {
//         idCreador,
//         titulo,
//         descripcion,
//         fecha,
//         hora,
//         localizacion
//       },
//     });

//     response.status(201).json(newEvento);
//   } catch (error) {
//     next(error);
//   }
// };


module.exports.create = async (request, response, next) => {
  const { idCreador, titulo, descripcion, fecha, hora, localizacion } = request.body;
  try {
 
    const usuariosActivos = await prisma.usuario.findMany({
      orderBy: {
        idUsuario: "asc",
      },
      include: {
        rol: true,
        estadoUsuario: true,
      },
    });

    const estadoAntes = await prisma.estadoAsistencia.findFirst({
      where: {
        nombre: 'Pendiente'
      }
    });

    const estadoDespues = await prisma.estadoAsistencia.findFirst({
      where: {
        nombre: 'Pendiente' 
      }
    });

    // Crear el evento
    const newEvento = await prisma.evento.create({
      data: {
        idCreador,
        titulo,
        descripcion,
        fecha,
        hora,
        localizacion,
        asistencia: {
          create: usuariosActivos.map(usuario => ({
            idAsociado: usuario.idUsuario,
            idEstadoConfir: estadoAntes.idAsistencia,
            idAsistencia: estadoDespues.idAsistencia
          }))
        }
      },
      include: {
        asistencia: {
          include: {
            asociado: {
              select: {
                idUsuario: true,
                nombreCompleto: true,
                correo: true,
                telefono: true
              }
            },
            estadoConfir: {
              select: {
                idEstadoConfir: true,
                nombre: true
              }
            },
            estadoAsistencia: {
              select: {
                idAsistencia: true,
                nombre: true
              }
            }
          }
        }
      }
    });

    const newEventDetail = {
      idEvento: newEvento.idEvento,
      idCreador: newEvento.idCreador,
      titulo: newEvento.titulo,
      descripcion: newEvento.descripcion,
      fecha: newEvento.fecha,
      hora: newEvento.hora,
      localizacion: newEvento.localizacion,
      asistencia: newEvento.asistencia.map(asistencia => ({
        idConfirm: asistencia.idConfirm,
        asociado: {
          idUsuario: asistencia.asociado.idUsuario,
          nombreCompleto: asistencia.asociado.nombreCompleto,
          correo: asistencia.asociado.correo,
          telefono: asistencia.asociado.telefono
        },
        estadoConfirmacion: {
          idEstadoConfir: asistencia.estadoConfir.idEstadoConfir,
          nombre: asistencia.estadoConfir.nombre
        },
        estadoAsistencia: {
          idAsistencia: asistencia.estadoAsistencia.idAsistencia,
          nombre: asistencia.estadoAsistencia.nombre
        }
      }))
    };    
    

    response.status(201).json(newEventDetail);
  } catch (error) {
    next(error);
  }
};



// Update event
module.exports.update = async (request, response, next) => {
  const { id } = request.params;
  const { idCreador, titulo, descripcion, fecha, hora, localizacion } = request.body;
  try {
    const updatedEvento = await prisma.evento.update({
      where: { idEvento: Number(id) },
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

// Delete an event
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

// module.exports.searchByStatus = async (req, res) => {
//   const { activo } = req.query;
//   const isActive = activo === 'true'; 

//   try {
//     const eventos = await prisma.evento.findMany({
//       where: {
//         activo: isActive
//       }
//     });
//     res.json(eventos);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Error al buscar eventos por estado' });
//   }
// };



