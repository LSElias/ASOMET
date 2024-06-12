const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const CryptoJS = require('crypto-js');
const { generarJWT } = require('../../utils/generar-jwt');
const { errors } = require('../../utils/validations');

const prisma = new PrismaClient();

const login = async (ctx) => {
  const { email, password } = ctx.request.body;

  try {
    // Verificar si el email existe
    const user = await prisma.usuario.findUnique({
      where: { email },
    });

    if (!user) {
      return (
        ctx.error({
          Code: errors.msj6.code,
          Message: errors.msj6.msj,
          Time: errors.msj6.time,
        }),
        (ctx.status = 401)
      );
    }

    // Verificar si el usuario está activo
    if (!user.status) {
      return (
        ctx.error({
          Code: errors.msj7.code,
          Message: errors.msj7.msj,
          Time: errors.msj7.time,
        }),
        (ctx.status = 401)
      );
    }

    // Verificar la contraseña
    const hashedPassword = CryptoJS.MD5(password).toString();
    if (hashedPassword !== user.password) {
      return (
        ctx.error({
          Code: errors.msj6.code,
          Message: errors.msj6.msj,
          Time: errors.msj6.time,
        }),
        (ctx.status = 401)
      );
    }

    // Generar el JWT
    const token = await generarJWT(user.idUsuario);

    if (token) {
      ctx.reply({
        user: { _id: user.idUsuario, email: user.email, status: user.status },
        token: token,
      });
    }
  } catch (error) {
    console.error(error);
    ctx.error({
      Code: errors.msj8.code,
      Message: errors.msj8.msj,
      Time: errors.msj8.time,
    }),
      (ctx.status = 500);
  }
};

module.exports = {
  login,
};
