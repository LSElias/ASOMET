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

// Get event by ID
module.exports.getById = async (request, response, next) => {
  const { id } = request.params;
  try {
    const evento = await prisma.evento.findUnique({
      where: { idEvento: Number(id) },
      include: {
        administrador: true,
        asistencia: true,
      },
    });

    if (!evento) {
      return response.status(404).json({ message: "Event not found" });
    }

    response.json(evento);
  } catch (error) {
    next(error);
  }
};


// Create a new event
module.exports.create = async (request, response, next) => {
  const { idCreador, titulo, descripcion, fecha, hora, localizacion } = request.body;
  try {
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

    response.status(201).json(newEvento);
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


