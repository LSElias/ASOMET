const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//Get
module.exports.get = async (request, response, next) => {
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
};

//GetById
module.exports.getByIdUser = async (request, response, next) => {
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
};

//GetByIdRol
module.exports.getByIdRol = async (request, response, next) => {
  let idRol = parseInt(request.params.idRol);
  const usuario = await prisma.usuario.findMany({
    where: { idRol: idRol },
    include: {
      rol: true,
      estadoUsuario: true,
    },
  });
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
};

//GetByIdEstUsuario
module.exports.getByIdEstUsuario = async (request, response, next) => {
  let idEstUsuario = parseInt(request.params.idEstUsuario);
  const usuario = await prisma.usuario.findMany({
    where: { idEstUsuario: idEstUsuario },
    include: {
      rol: true,
      estadoUsuario: true,
    },
  });
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
};

//GetByCedula
module.exports.getByCedula = async (request, response, next) => {
  let cedula = parseInt(request.params.cedula);
  const usuario = await prisma.usuario.findMany({
    where: { cedula: cedula },
    include: {
      rol: true,
      estadoUsuario: true,
    },
  });
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
};

//Create
module.exports.create = async (request, response, next) => {
  const infoUsuario = request.body;

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
  response.status(200).json({
    status: true,
    message: "Creado exitosamente",
    data: newUsuario,
  });
};

//Update
module.exports.update = async (request, response, next) => {
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
};

/*
//Login
module.exports.login = async (request, response, next) => {
    let userData = request.body;
  
    const usuario = await prisma.usuario.findUnique({
      where: {
        correo: userData.correo,
      },
    });
  
    if (!usuario) {
      response.status(401).send({
        success: false,
        message: "Datos erróneos",
      });
    }
  
    const checkPassword = await bcrypt.compare(
      userData.contrasena,
      usuario.contrasena
    );
    if (checkPassword === false) {
      response.status(401).send({
        success: false,
        message: "Credenciales no validas",
      });
    } else {
      const payload = {
        idUsuario: usuario.idUsuario,
        correo: usuario.correo,
        rol: usuario.idRol,
      };
  
      const token = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE,
      });
      response.json({
        success: true,
        message: "Bienvenido a Asomameco",
        token,
      });
    }
};
*/