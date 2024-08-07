const { PrismaClient } = require('@prisma/client');
const { generarJWT } = require('../utils/generate-jwt');
const { errors } = require('../utils/validations');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar si el email existe
    const user = await prisma.usuario.findUnique({
      where: { correo: email },
      include: {
        rol: true, 
      }
    });

    if (!user || user.idRol === 3) {
      return res.status(401).json({
        Code: errors.msj6.code,
        Message: errors.msj6.msj,
        Time: errors.msj6.time,
      });
    }

    // Verificar si el usuario está activo
    if (user.idEstUsuario !== 1) {
      return res.status(401).json({
        Code: errors.msj7.code,
        Message: errors.msj7.msj,
        Time: errors.msj7.time,
      });
    }

    const checkPass = await bcrypt.compare(
      password,
      user.contrasena,
    );

    // Verificar la contraseña en texto plano
    if (!checkPass) {
      return res.status(401).json({
        Code: errors.msj6.code,
        Message: errors.msj6.msj,
        Time: errors.msj6.time,
      });
    }else {
      const payload = {
        idUsuario: user.idUsuario,
        correo: user.correo,
        rol: user.idRol,
      }; 
    }

    // Generar el JWT
    const token = await generarJWT(user.idUsuario, user.correo, user.nombreCompleto, user.rol);

    if (token) {
      return res.status(200).json({
        user: { id: user.idUsuario, email: user.correo, nombreCompleto: user.nombreCompleto,  rol: user.rol },
        token: token,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      Code: errors.msj8.code,
      Message: errors.msj8.msj,
      Time: errors.msj8.time,
    });
  }
};