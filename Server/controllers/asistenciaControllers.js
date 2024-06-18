const { PrismaClient, Prisma } = require("@prisma/client");
const { response } = require("express");
const { request } = require("http");
const { parse } = require("path");
const prisma = new PrismaClient();

//GetCorreos + Evento
module.exports.enviarCorreos_General = async (request, response, next) => {
  try {
    let idEvento = parseInt(request.params.idEvento);

    //Eventos Info.
    const evento = await prisma.evento.findUnique({
      where: {
        idEvento: idEvento,
      },
    });

    if (evento.length === 0) {
      return response.status(404).json({
        message: "El evento ingresado no existe",
      });
    }

    //Correo de usuarios - Activos + Asociados
    const usuarios = await prisma.usuario.findMany({
      where: {
        idEstUsuario: 1,
        idRol: 3,
      },
    });

    const info = usuarios.map((u) => ({
      correo: u.correo,
    }));

    //Proceso email

    response.json(info);
  } catch (error) {
    response.status(500).json({ message: "Error en la solictud" });
  }
};

module.exports.enviarCorreo_Individual = async (request, response, next) => {
  try {
    let datos = request.body;

    //Eventos Info.
    const evento = await prisma.evento.findUnique({
      where: {
        idEvento: parseInt(datos.idEvento),
      },
    });

    if (evento.length === 0) {
      return response.status(404).json({
        message: "El evento ingresado no existe",
      });
    }

    //Correo de usuario
    const usuariosId = datos.usuariosId; 
    const info = []; 

    for (let i = 0; i < usuariosId.length; i++) {
      
      const usuarios = await prisma.usuario.findUnique({
        where: {
          idUsuario: parseInt(usuariosId[i]),
        },
      });

      if(usuarios.length === null){
        return response.status(404).json({
          message: "Usuario no seleccionado",
        });
      }
      
      if(usuarios){
        info.push({ correo: usuarios.correo, }); 
      }

    }
    //Proceso email

    response.json(info);
  } catch (error) {
    response.status(500).json({ message: "Error en la solictud" });
  }
};

///En proceso 

//Modificar asistencia --> Evento presencial
module.exports.updateAsistenciaByIdEvento = async (request, response, next) => {
  try {
    let info = request.body;
    let idEvento = parseInt(request.params.idEvento);
    let idAsociado = parseInt(info.idAsociado); 

    const newInfo = await prisma.asistencia.update({
      where: {
          idEvento: idEvento,
          idAsociado: idAsociado
      },
      data: {
        idAsistencia: info.idAsistencia
      },
    });

    response.json(newInfo);
  } catch (error) {
    response.status(500).json({ message: "Error en la solictud" });
  }
};

//Modificar confirmacion --> Invitacion por email
module.exports.updateConfirmacionByIdEvento = async (request, response, next) => {
  try {
    let info = request.body;
    let idEvento = parseInt(request.params.idEvento);
    let idAsociado = parseInt(info.idAsociado); 

    const newInfo = await prisma.asistencia.update({
      where: {
       idEvento: idEvento,
       idAsociado: idAsociado
      },
      data: {
        idConfirm: info.idConfirm,
      },
    });

    response.json(newInfo);
  } catch (error) {
    response.status(500).json({ message: "Error en la solictud" });
  }
};