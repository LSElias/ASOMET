const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mailController = require("./mailController");

//Get
module.exports.get = async (request, response, next) => {
  try {
    const usuarios = await prisma.usuario.findMany({
      orderBy: {
        idUsuario: "asc",
      },
      include: {
        rol: true,
        estadoUsuario: true,
      },
    });

    const datos = usuarios.map((u) => ({
      id: u.idUsuario,
      idRol: u.idRol,
      rol: u.rol.nombre,
      idEstUsuario: u.idEstUsuario,
      estUsuario: u.estadoUsuario.nombre,
      cedula: u.cedula,
      nombreCompleto: u.nombreCompleto,
      correo: u.correo,
      contrasena: u.contrasena,
      telefono: u.telefono,
    }));

    response.json(datos);
  } catch (error) {
    response.status(500).json({ message: "Error en la solicitud", error });
  }
};

//GetById
module.exports.getByIdUser = async (request, response, next) => {
  try {
    let idUsuario = parseInt(request.params.idUsuario);
    const usuario = await prisma.usuario.findUnique({
      where: { idUsuario: idUsuario },
      include: {
        rol: true,
        estadoUsuario: true,
      },
    });
    const datos = {
      id: usuario.idUsuario,
      idRol: usuario.idRol,
      rol: usuario.rol.nombre,
      idEstUsuario: usuario.idEstUsuario,
      estUsuario: usuario.estadoUsuario.nombre,
      cedula: usuario.cedula,
      nombreCompleto: usuario.nombreCompleto,
      correo: usuario.correo,
      contrasena: usuario.contrasena,
      telefono: usuario.telefono,
    };
    response.json(datos);
  } catch (error) {
    response.status(500).json({ message: "Error en la solicitud", error });
  }
};

//GetByIdRol
module.exports.getByIdRol = async (request, response, next) => {
  try {
    let idRol = parseInt(request.params.idRol);
    const usuario = await prisma.usuario.findMany({
      where: { idRol: idRol },
      include: {
        rol: true,
        estadoUsuario: true,
      },
    });

    if (usuario.length === 0) {
      return response.status(404).json({
        message: "No se encontraron usuarios con el rol proporcionado",
      });
    }

    const datos = usuario.map((u) => ({
      id: u.idUsuario,
      idRol: u.idRol,
      rol: u.rol.nombre,
      idEstUsuario: u.idEstUsuario,
      estUsuario: u.estadoUsuario.nombre,
      cedula: u.cedula,
      nombreCompleto: u.nombreCompleto,
      correo: u.correo,
      contrasena: u.contrasena,
      telefono: u.telefono,
    }));
    response.json(datos);
  } catch (error) {
    response.status(500).json({ message: "Error en la solicitud", error });
  }
};

//GetByIdEstUsuario
module.exports.getByIdEstUsuario = async (request, response, next) => {
  try {
    let idEstUsuario = parseInt(request.params.idEstUsuario);
    const usuario = await prisma.usuario.findMany({
      where: { idEstUsuario: idEstUsuario },
      include: {
        rol: true,
        estadoUsuario: true,
      },
    });

    if (usuario.length === 0) {
      return response.status(404).json({
        message:
          "No se encontraron usuarios con el tipo de estado proporcionado",
      });
    }

    const datos = usuario.map((u) => ({
      id: u.idUsuario,
      idRol: u.idRol,
      rol: u.rol.nombre,
      idEstUsuario: u.idEstUsuario,
      estUsuario: u.estadoUsuario.nombre,
      cedula: u.cedula,
      nombreCompleto: u.nombreCompleto,
      correo: u.correo,
      contrasena: u.contrasena,
      telefono: u.telefono,
    }));
    response.json(datos);
  } catch (error) {
    response.status(500).json({ message: "Error en la solicitud", error });
  }
};

//GetByCedula
module.exports.getByCedula = async (request, response, next) => {
  let cedula = parseInt(request.params.cedula);

  try {
    const usuario = await prisma.usuario.findMany({
      where: { cedula: cedula },
      include: {
        rol: true,
        estadoUsuario: true,
      },
    });

    if (usuario.length === 0) {
      return response.status(404).json({
        message: "El número de cédula ingresado es incorrecto",
      });
    }

    const datos = usuario.map((u) => ({
      id: u.idUsuario,
      idRol: u.idRol,
      rol: u.rol.nombre,
      idEstUsuario: u.idEstUsuario,
      estUsuario: u.estadoUsuario.nombre,
      cedula: u.cedula,
      nombreCompleto: u.nombreCompleto,
      correo: u.correo,
      contrasena: u.contrasena,
      telefono: u.telefono,
    }));
    response.json(datos);
  } catch (error) {
    response.status(500).json({ message: "Error en la solicitud", error });
  }
};

//GetInfoAsociados
module.exports.getInfoAsociados = async (request, response, next) => {
  try {
    const usuarios = await prisma.usuario.findMany({
      orderBy: {
        idUsuario: "asc",
      },
      where: {
        idEstUsuario: 1,
        idRol: 3,
      },
      include: {
        rol: true,
        estadoUsuario: true,
      },
    });

    const datos = usuarios.map((u) => ({
      id: u.idUsuario,
      idRol: u.idRol,
      rol: u.rol.nombre,
      idEstUsuario: u.idEstUsuario,
      estUsuario: u.estadoUsuario.nombre,
      cedula: u.cedula,
      nombreCompleto: u.nombreCompleto,
      correo: u.correo,
      contrasena: u.contrasena,
      telefono: u.telefono,
    }));

    response.json(datos);
  } catch (error) {
    response.status(500).json({ message: "Error en la solicitud", error });
  }
};

//Create Normal - Usuario-Create.Component
module.exports.create = async (request, response, next) => {
  try {
    const infoUsuario = request.body;

/*     let salt = bcrypt.genSaltSync(10);

    let hash = bcrypt.hashSync(infoUsuario.contrasena, salt);
 */
    const newUsuario = await prisma.usuario.create({
      data: {
        idRol: infoUsuario.idRol,
        idEstUsuario: infoUsuario.idEstUsuario,
        cedula: infoUsuario.cedula,
        nombreCompleto: infoUsuario.nombreCompleto,
        correo: infoUsuario.correo,
        contrasena: infoUsuario.contrasena,
        telefono: infoUsuario.telefono,
      },
    });

    if (infoUsuario.enviarInv === "true") {
      const fechaActual = new Date().toISOString().split("T")[0];

      const eventosVigentes = await prisma.evento.findMany({
        where: {
          fecha: {
            gt: fechaActual,
          },
        },
        orderBy: {
          fecha: "asc",
        },
        take: 1,
      });

      if (eventosVigentes[0]) {
        await prisma.asistencia.create({
          data: {
            idEvento: eventosVigentes[0].idEvento,
            idAsociado: newUsuario.idUsuario,
            idEstadoConfir: 3,
            idAsistencia: 3,
            contEnvios: 0,
          },
        });

        const mailInfo = {
          body: {
            eventId: eventosVigentes[0].idEvento,
            selectedEmails: [newUsuario.correo],
          },
        };
        const mailResponse = {
          status: (code) => ({
            json: (message) =>
              console.log(`Mail Response Status: ${code}, Message: ${message}`),
          }),
        };

        await mailController.sendEventNotification(
          mailInfo,
          mailResponse,
          next
        );
      }
    } else {
      const fechaActual = new Date().toISOString().split("T")[0];

      const eventosVigentes = await prisma.evento.findMany({
        where: {
          fecha: {
            gt: fechaActual,
          },
        },
        orderBy: {
          fecha: "asc",
        },
      });

      if (eventosVigentes[0]) {
        const asistencias = eventosVigentes.map((e) => ({
          idEvento: e.idEvento,
          idAsociado: newUsuario.idUsuario,
          idEstadoConfir: 4,
          idAsistencia: 3,
          contEnvios: 0,
        }));

        await prisma.asistencia.createMany({
          data: asistencias,
        }); 
      }
    }

    response.status(201).json({
      status: true,
      message: "Creado exitosamente",
      data: newUsuario,
    });
  } catch (error) {
    response.status(500).json({ message: "Error en la creación del usuario" });
  }
};

//Create - Evento-Asociado.component
module.exports.createEnAsistencia = async (request, response, next) => {
  try {
    const infoUsuario = request.body;

/*     let salt = bcrypt.genSaltSync(10);

    let hash = bcrypt.hashSync(infoUsuario.contrasena, salt);
 */
    const newUsuario = await prisma.usuario.create({
      data: {
        idRol: infoUsuario.idRol,
        idEstUsuario: infoUsuario.idEstUsuario,
        cedula: infoUsuario.cedula,
        nombreCompleto: infoUsuario.nombreCompleto,
        correo: infoUsuario.correo,
        contrasena:infoUsuario.contrasena,
        telefono: infoUsuario.telefono,
      },
    });

    const eventosVigentes = await prisma.evento.findUnique({
      where: {
        idEvento: infoUsuario.idEvento,
      },
    });

    if (eventosVigentes) {
      await prisma.asistencia.create({
        data: {
          idEvento: eventosVigentes.idEvento,
          idAsociado: newUsuario.idUsuario,
          idEstadoConfir: 3,
          idAsistencia: 3,
          contEnvios: 0,
        },
      });

      const fechaActual = new Date().toISOString().split("T")[0];

      const vigentes = await prisma.evento.findMany({
        where: {
          fecha: {
            gt: fechaActual,
          },
        },
        orderBy: {
          fecha: "asc",
        },
      });

      if (vigentes[0]) {
        const asistencias = vigentes.map((e) => ({
          idEvento: e.idEvento,
          idAsociado: newUsuario.idUsuario,
          idEstadoConfir: 4,
          idAsistencia: 3,
          contEnvios: 0,
        }));

        await prisma.asistencia.createMany({
          data: asistencias,
        }); 
      }

      const mailInfo = {
        body: {
          eventId: eventosVigentes.idEvento,
          selectedEmails: [newUsuario.correo],
        },
      };
      const mailResponse = {
        status: (code) => ({
          json: (message) =>
            console.log(`Mail Response Status: ${code}, Message: ${message}`),
        }),
      };

      await mailController.sendEventNotification(mailInfo, mailResponse, next);
    }

    response.status(201).json({
      status: true,
      message: "Creado exitosamente",
      data: newUsuario,
    });
  } catch (error) {
    response.status(500).json({ message: "Error en la creación del usuario" });
  }
};

//Update
module.exports.update = async (request, response, next) => {
  try {
    let infoUsuario = request.body;
    let idUsuario = parseInt(request.params.idUsuario);

    const oldUser = await prisma.usuario.findUnique({
      where: { idUsuario: idUsuario },
      include: {
        estadoUsuario: true,
        rol: true,
      },
    });

    /* const isMatchPass = await bcrypt.compare(
      infoUsuario.contrasena,
      oldUser.contrasena
    ); */
  
      const newUser = await prisma.usuario.update({
        where: {
          idUsuario: idUsuario,
        },
        data: {
          idRol: infoUsuario.idRol,
          idEstUsuario: infoUsuario.idEstUsuario,
          cedula: infoUsuario.cedula,
          nombreCompleto: infoUsuario.nombreCompleto,
          correo: infoUsuario.correo,
          contrasena: infoUsuario.contrasena,
          telefono: infoUsuario.telefono,
        },
      });
      
    response.json(newUser);
  } catch (error) {
    response
      .status(500)
      .json({ message: "Error en la actualización del usuario" });
  }
};

module.exports.updateEstadoUsuario = async (request, response, next) => {
  try {
    let infoUsuario = request.body;
    let idUsuario = parseInt(request.params.idUsuario);

    const oldUser = await prisma.usuario.findUnique({
      where: { idUsuario: idUsuario },
      include: {
        estadoUsuario: true,
        rol: true,
      },
    });

    const newUser = await prisma.usuario.update({
      where: {
        idUsuario: idUsuario,
      },
      data: {
        idEstUsuario: infoUsuario.idEstUsuario,
      },
    });

    response.json(newUser);
  } catch (error) {
    response
      .status(500)
      .json({ message: "Error en la actualización del estado" });
  }
};

//Cambiar contraseña
module.exports.updatePassword = async (request, response, next) => {
  try {
    //const correo = request.params.correo;
    const {correo,contrasena} = request.body; 

    //let salt = bcrypt.genSaltSync(10);
    // let hash = bcrypt.hashSync(contrasena, salt);

    const oldUser = await prisma.usuario.findUnique({
      where: { correo: correo },
    });

    if (!oldUser) {
      return response.status(400).json({ message: "Usuario No Encontrado" });
    }

    const newUser = await prisma.usuario.update({
      where: {
        correo: correo,
      },
      data: {
        contrasena: contrasena,
      },
    });

    response.json(newUser);
  } catch (error) {
    response
      .status(500)
      .json({ message: "Error en la actualización de la contraseña" });
  }
};