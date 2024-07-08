const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const sendMail = require('../utils/sendMailer');

module.exports.sendEventNotification = async (request, response, next) => {
  const { eventId, selectedEmails } = request.body;

  try {
    // Obtener el evento
    const evento = await prisma.evento.findUnique({
      where: {
        idEvento: parseInt(eventId, 10),
      },
    });

    if (!evento) {
      return response.status(404).json({ error: 'Evento no encontrado' });
    }

    // Obtener los usuarios para enviar el correo
    let usuarios;
    if (selectedEmails && selectedEmails.length > 0) {
      // Obtener solo los usuarios seleccionados
      usuarios = await prisma.usuario.findMany({
        where: {
          correo: { in: selectedEmails },
        },
        select: {
          correo: true,
        },
      });
    } else {
      // Obtener todos los usuarios
      usuarios = await prisma.usuario.findMany({
        select: {
          correo: true,
          idEstUsuario:1
        },
      });
    }

    // Enviar correos electrónicos a los usuarios
    const promises = usuarios.map(async usuario => {
      const mailText = `Hola, se ha creado un nuevo evento: ${evento.titulo}\nDescripción: ${evento.descripcion}\nFecha: ${evento.fecha}\nHora: ${evento.hora}\nLocalización: ${evento.localizacion}`;
      await sendMail(usuario.correo, 'Nuevo Evento Creado', mailText);

      await prisma.asistencia.updateMany({
        where: {
          idEvento: parseInt(evento.idEvento, 10),
          idAsociado: usuarios.idUsuario,
        },
        data: {
          idEstadoConfir: 3,
          idAsistencia: 3,
          contador: {
            increment: 1,
          },
        },
      });
    });

    await Promise.all(promises);

    response.status(200).json({ message: 'Correos electrónicos enviados exitosamente' });
  } catch (error) {
    next(error);
  }
};
