const jwt = require('jsonwebtoken');

const generarJWT = async (_id, _correo, _nombre, _rol) => {
  const payload = { _id,  _correo, _nombre, _rol };

  
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.SECRETORPRIVATEKEY,
      {
        expiresIn: '1h',
      },
      (err, token) => {
        if (err) {
          console.error(err);
          reject('No se pudo generar el token');
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = {
  generarJWT
};
