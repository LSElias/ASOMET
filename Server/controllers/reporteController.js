const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();

//Confirmacion vs  Asistencia 

//Listado de evento --> Confirm, Asisten., No Asisten, Tasa % 
//Información de gráfico de barras 
module.exports.getAsistenciaByEvento = async (request, response, next) => {
  try {
    const result = await prisma.$queryRaw(
      Prisma.sql`SELECT a.idEvento, e.titulo, e.fecha, (SELECT COUNT(*) FROM asistencia WHERE idEstadoConfir = 1 AND idEvento = a.idEvento) AS Confirmacion, (SELECT COUNT(*) FROM asistencia WHERE idAsistencia = 1 AND idEvento = a.idEvento) AS Asistencia, (SELECT COUNT(*) FROM asistencia WHERE idAsistencia = 2 AND idEvento = a.idEvento) AS Ausentes, FORMAT(( (SELECT COUNT(*) FROM asistencia WHERE idAsistencia = 1 AND idEvento = a.idEvento) / (SELECT COUNT(*) FROM asistencia WHERE (idEstadoConfir = 1 AND idEvento = a.idEvento)) * 100), 0) AS Tasa FROM asistencia a JOIN evento e ON a.idEvento = e.idEvento WHERE e.fecha <= CURDATE() GROUP BY a.idEvento, e.fecha ORDER BY e.fecha DESC`
    )
  
    //Modificar tipo Fecha --> Int to String
    const conversion_BigInt_String = result.map(item => {
      const data = { ...item };
      Object.keys(data).forEach(key => {
        if (typeof data[key] === 'bigint') {
          data[key] = data[key].toString();
        }
      });
      return data;
    });
    response.json(conversion_BigInt_String);
  }catch (error) {
    response.status(500).json({ message: "Error" });
  }
};

//Siguiente Evento: Confirmados, Pendientes, Rechazados
module.exports.getAsistenciaSiguienteEvento = async (request, response, next) => {
  try {
    const result = await prisma.$queryRaw(
      Prisma.sql`SELECT e.titulo, e.fecha, (SELECT COUNT(*) FROM asistencia a WHERE a.idEstadoConfir = 1 AND a.idEvento = e.idEvento) AS Confirmacion, (SELECT COUNT(*) FROM asistencia a WHERE a.idEstadoConfir = 2 AND a.idEvento = e.idEvento) AS Rechazado, (SELECT COUNT(*) FROM asistencia a WHERE a.idEstadoConfir = 3 AND a.idEvento = e.idEvento) AS Pendiente FROM evento e WHERE e.fecha >=  CURDATE() ORDER BY e.fecha ASC LIMIT 1`
    )
  
    //Modificar tipo Fecha --> Int to String
    const conversion_BigInt_String = result.map(item => {
      const data = { ...item };
      Object.keys(data).forEach(key => {
        if (typeof data[key] === 'bigint') {
          data[key] = data[key].toString();
        }
      });
      return data;
    });
    response.json(conversion_BigInt_String);
  }catch (error) {
    response.status(500).json({ message: "Error" });
  }
};

//Evento 

//Menor Asistencia
module.exports.getMenorAsistencia = async (request, response, next) => {
  try {
    const result = await prisma.$queryRaw(
      Prisma.sql`SELECT a.idEvento, e.titulo, e.fecha, (SELECT COUNT(*) FROM asistencia WHERE idEstadoConfir = 1 AND idEvento = a.idEvento) AS Confirmacion, (SELECT COUNT(*) FROM asistencia WHERE idAsistencia = 1 AND idEvento = a.idEvento) AS Asistencia, (SELECT COUNT(*) FROM asistencia WHERE idAsistencia = 2 AND idEvento = a.idEvento) AS Ausentes, FORMAT(( (SELECT COUNT(*) FROM asistencia WHERE idAsistencia = 1 AND idEvento = a.idEvento) / (SELECT COUNT(*) FROM asistencia WHERE (idEstadoConfir = 1 AND idEvento = a.idEvento)) * 100), 0) AS Tasa FROM asistencia a JOIN evento e ON a.idEvento = e.idEvento WHERE e.fecha <= CURDATE() GROUP BY a.idEvento, e.fecha ORDER BY Asistencia ASC LIMIT 5`
    )
  
    //Modificar tipo Fecha --> Int to String
    const conversion_BigInt_String = result.map(item => {
      const data = { ...item };
      Object.keys(data).forEach(key => {
        if (typeof data[key] === 'bigint') {
          data[key] = data[key].toString();
        }
      });
      return data;
    });
    response.json(conversion_BigInt_String);
  } catch (error) {
    response.status(500).json({ message: "Error" });
  }
};

//Mayor Asistencia
module.exports.getMayorAsistencia = async (request, response, next) => {
  try {
    const result = await prisma.$queryRaw(
      Prisma.sql`SELECT a.idEvento, e.titulo, e.fecha, (SELECT COUNT(*) FROM asistencia WHERE idEstadoConfir = 1 AND idEvento = a.idEvento) AS Confirmacion, (SELECT COUNT(*) FROM asistencia WHERE idAsistencia = 1 AND idEvento = a.idEvento) AS Asistencia, (SELECT COUNT(*) FROM asistencia WHERE idAsistencia = 2 AND idEvento = a.idEvento) AS Ausentes, FORMAT(( (SELECT COUNT(*) FROM asistencia WHERE idAsistencia = 1 AND idEvento = a.idEvento) / (SELECT COUNT(*) FROM asistencia WHERE (idEstadoConfir = 1 AND idEvento = a.idEvento)) * 100), 0) AS Tasa FROM asistencia a JOIN evento e ON a.idEvento = e.idEvento WHERE e.fecha <= CURDATE() GROUP BY a.idEvento, e.fecha ORDER BY Asistencia DESC LIMIT 5`
    )
  
    //Modificar tipo Fecha --> Int to String
    const conversion_BigInt_String = result.map(item => {
      const data = { ...item };
      Object.keys(data).forEach(key => {
        if (typeof data[key] === 'bigint') {
          data[key] = data[key].toString();
        }
      });
      return data;
    });
    response.json(conversion_BigInt_String);
  } catch (error) {
    response.status(500).json({ message: "Error" });
  }
};

//Listado: Eventos con mayor y menor asistencia
module.exports.getCantidadMayorMenor = async (request, response, next) => {
try {
  const result = await prisma.$queryRaw(
    Prisma.sql`SELECT a.idEvento, e.titulo, e.fecha, (SELECT COUNT(*) FROM asistencia WHERE idEstadoConfir = 1 AND idEvento = a.idEvento) AS Confirmacion, (SELECT COUNT(*) FROM asistencia WHERE idAsistencia = 1 AND idEvento = a.idEvento) AS Asistencia, (SELECT COUNT(*) FROM asistencia WHERE idAsistencia = 2 AND idEvento = a.idEvento) AS Ausentes, FORMAT(( (SELECT COUNT(*) FROM asistencia WHERE idAsistencia = 1 AND idEvento = a.idEvento) / (SELECT COUNT(*) FROM asistencia WHERE (idEstadoConfir = 1 AND idEvento = a.idEvento)) * 100), 0) AS Tasa FROM asistencia a JOIN evento e ON a.idEvento = e.idEvento WHERE e.fecha <= CURDATE() GROUP BY a.idEvento, e.fecha ORDER BY Asistencia DESC`
  )

  //Modificar tipo Fecha --> Int to String
  const conversion_BigInt_String = result.map(item => {
    const data = { ...item };
    Object.keys(data).forEach(key => {
      if (typeof data[key] === 'bigint') {
        data[key] = data[key].toString();
      }
    });
    return data;
  });
  response.json(conversion_BigInt_String);
} catch (error) {
  response.status(500).json({ message: "Error" });
}
};

