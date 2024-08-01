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
          idUsuario: true,
        },
      });
    } else {
      // Obtener todos los usuarios
      usuarios = await prisma.usuario.findMany({
        select: {
          correo: true,
          idEstUsuario:true,
          nombreCompleto: true, 
        },
      });
    }

    // Enviar correos electrónicos a los usuarios
    const promises = usuarios.map(async usuario => {
      const mailHtml = `
        <p>Estimado/a asociado,</p>
        <p>Nos complace informarle que se ha creado un nuevo evento, nos encantaría contar con su asistencia. Para confirmar o rechazar su asistencia puede ingresar al siguiente enlace.</p>
        <a href="http://localhost:4200/asamblea" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px;">Ver Eventos</a>
        <p>Información sobre el evento a realizar:</p>
        <p>${evento.titulo}<br>
        Descripción: ${evento.descripcion}<br>
        Fecha: ${evento.fecha}, ${evento.hora}<br>
        Localización: ${evento.localizacion}</p>
        <p>Esperamos contar con su participación.</p>
        <p>Saludos cordiales,<br>Asomameco.</p>
      `;

      await sendMail(usuario.correo, 'Nuevo Evento Creado', mailHtml);

      await prisma.asistencia.updateMany({
        where: {
          idEvento: parseInt(evento.idEvento, 10),
          idAsociado: usuario.idUsuario,
        },
        data: {
          idEstadoConfir: 3,
          idAsistencia: 3,
          contEnvios:{
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


module.exports.sendUserCodePassword = async (request, response, next) => {
  const { code, selectedEmails } = request.body;

  if (!code || !selectedEmails || selectedEmails.length === 0) {
    return response.status(400).json({ message: 'Código y correos electrónicos son requeridos.' });
  }

  try {

      const usuarios = await prisma.usuario.findMany({
        where: {
          correo: { in: selectedEmails },
        },
        select: {
          correo: true,
          idUsuario: true,
          nombreCompleto: true,
        },
      });

      if (usuarios.length === 0) {
        return response.status(404).json({ message: 'No se encontraron usuarios con los correos electrónicos proporcionados.' });
      }

    // Enviar correos electrónicos a los usuarios
    const promises = usuarios.map(async usuario => {
      const mailHtml = `
        <p>Estimado/a <b> ${usuario.nombreCompleto} </b></p>
        <p>Esperamos que este mensaje lo encuentre bien.</p>
        <p>Para completar este proceso, por favor utilice el siguiente código de verificación: </p>
        <p><b>Código de verificación:</b> ${code}<br></p>
        <p>Saludos cordiales,<br>Asomameco.</p>
      `;

      await sendMail(usuario.correo, 'Código de Verificación - Cambio de Contraseña', mailHtml);
    });

    await Promise.all(promises);

    response.status(200).json({ message: 'Correos electrónicos enviados exitosamente' });
  } catch (error) {
    next(error);
  }
};

