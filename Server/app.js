const dotEnv = require("dotenv");
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const { request, response } = require("express");
const cors = require("cors");
const logger = require("morgan");
const app = express();
const prism = new PrismaClient();

//---Archivos de rutas---
const usuarioRoutes = require('./routes/usuarioRoutes'); 
const eventoRoutes = require('./routes/eventoRoutes');
const reporteRoutes = require('./routes/reporteRoutes'); 
const datosRoutes = require('./routes/datosRoutes'); 
const asistenciaRoutes = require('./routes/asistenciaRoutes'); 
const mailRoutes = require('./routes/mailRoutes'); 


// Acceder a la configuracion del archivo .env
dotEnv.config();

// Puero que escucha por defecto 300 o definido .env
const port = process.env.PORT || 3000;

// Middleware CORS para aceptar llamadas en el servidor
app.use(cors());
// Middleware para loggear las llamadas al servidor
app.use(logger("dev"));

// Middleware para gestionar Requests y Response json
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//---- Definir rutas ---- 
 app.use("/usuario/", usuarioRoutes);
 app.use("/eventos/", eventoRoutes);
 app.use("/reporte/", reporteRoutes);
 app.use("/datos/", datosRoutes);
 app.use("/asistencia/", asistenciaRoutes);
 app.use('/mail/', mailRoutes);

// Servidor
app.listen(port, () => { 
  console.log(`http://localhost:${port}`);
  console.log("Presione CTRL-C para deternerlo\n");
});
