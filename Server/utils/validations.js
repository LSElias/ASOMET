const errors = {
    msj1: {
      code: '001',
      msj: 'No cuenta con la estructura de la petición',
      time: new Date(),
    },
    msj2: {
      code: '002',
      msj: 'El parametro es requerido: ',
      time: new Date(),
    },
    msj3: {
      code: '003',
      msj: 'El correo no es valido ',
      time: new Date(),
    },
    msj4: {
      code: '004',
      msj: 'La estructura no cuenta con valores',
      time: new Date(),
    },
    msj5: {
      code: '005',
      msj: 'No tiene autorización para utilizar el servicio',
      time: new Date(),
    },
    msj6: {
      code: '006',
      msj: 'Usuario/ Password no son correctos',
      time: new Date(),
    },
    msj7: {
      code: '007',
      msj: 'Usuario no se encuentra activo. Por favor, contactar Administrador',
      time: new Date(),
    },
    msj8: {
      code: '008',
      msj: 'Ocurrio un error. Por favor contactar al Administrador',
      time: new Date(),
    },
    msj9: {
      code: '009',
      msj: 'La fecha debe ser superior a la actual',
      time: new Date(),
    },
    msj10: {
      code: '010',
      msj: 'La fecha debe ser superior a la actual y cumplir con el formato correspondiente',
      time: new Date(),
    },
  };
  
  module.exports = {
    errors,
  };
  