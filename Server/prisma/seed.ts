import { PrismaClient } from "@prisma/client";
import { estadoasistencia } from "./seeds/estadoasistencia";
import { estadoconfirm } from "./seeds/estadoconfirm";
import { estadousuario } from "./seeds/estadousuario";
import { rol } from "./seeds/rol";

const xlsx = require('xlsx');

const prisma = new PrismaClient();

async function main() {

  //Inserción de asistencia
  await prisma.estadoAsistencia.createMany({
    data: estadoasistencia,
  });

  //Inserción de confirmación
  await prisma.estadoConfirm.createMany({
    data: estadoconfirm,
  });

  //Inserción de estado usuario
  await prisma.estadoUsuario.createMany({
    data: estadousuario,
  });

  //Inserción de rol
  await prisma.rol.createMany({
    data: rol,
  });

  
  const filepath = './prisma/src/patrones_asociados.csv';

  const workbook = xlsx.readFile(filepath);
  const sheetName = workbook.SheetNames[0]; 
  const worksheet = workbook.Sheets[sheetName];

  const usuarios = xlsx.utils.sheet_to_json(worksheet);

  for (const usuario of usuarios) {
    await prisma.usuario.create({
      data: {
        idRol: usuario.idRol, 
        idEstUsuario: usuario.idEstUsuario, 
        cedula: usuario.cedula, 
        nombreCompleto: usuario.nombreCompleto, 
        correo: usuario.correo, 
        contrasena: usuario.contrasena, 
        telefono: usuario.telefono
      },
    });
  }

  //Evento - Prueba
  await prisma.evento.create({
    data: {
      idCreador: 30,
      titulo: "Asamblea General - Prueba",
      descripcion: "Asomameco, les invita a asistir a la primera asamblea del año. Catering:  Información",
      fecha: "2024-06-26",
      hora: "17:30",
      localizacion: "Auditorio General"
    
    }
  });

//Eventos para prueba de reportes -- scr: Documentos datos para asistencia 
await prisma.evento.create({
  data: {
    idCreador: 30,
    titulo: "Prueba 2",
    descripcion: "Asomameco, les invita a asistir a la primera asamblea del año. Catering:  Información",
    fecha: "2024-06-28",
    hora: "17:30",
    localizacion: "Auditorio General"
  
  }
});

await prisma.evento.create({
  data: {
    idCreador: 30,
    titulo: "Prueba 3",
    descripcion: "Asomameco, les invita a asistir a la primera asamblea del año. Catering:  Información",
    fecha: "2024-06-31",
    hora: "17:30",
    localizacion: "Auditorio General"
  
  }
});
await prisma.evento.create({
  data: {
    idCreador: 30,
    titulo: "Prueba 4",
    descripcion: "Asomameco, les invita a asistir a la primera asamblea del año. Catering:  Información",
    fecha: "2024-07-04",
    hora: "17:30",
    localizacion: "Auditorio General"
  
  }
});

await prisma.evento.create({
  data: {
    idCreador: 30,
    titulo: "Prueba 5",
    descripcion: "Asomameco, les invita a asistir a la primera asamblea del año. Catering:  Información",
    fecha: "2024-07-06",
    hora: "17:30",
    localizacion: "Auditorio General"
  
  }
});
  //Asistencia
  const path = './prisma/src/confirmacion_asistencia.csv';

  const wb = xlsx.readFile(path);
  const sN = wb.SheetNames[0];
  const ws = wb.Sheets[sN];

  const asistencias = xlsx.utils.sheet_to_json(ws);

  for (const asistencia of asistencias) {
    await prisma.asistencia.create({
      data: {
        idEvento: asistencia.idEvento, 
        idAsociado: asistencia.idAsociado,
        idEstadoConfir: asistencia.idEstadoConfir,
        idAsistencia: asistencia.idAsistencia
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

