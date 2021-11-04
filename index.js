const express =  require('express');
const dbConection = require('./database/config');
const cors = require('cors');
require('dotenv').config();

//console.log(process.env)

//Crear el servidor de express
const app = express();

//Base de datos Mongo
dbConection();

//Cors
app.use(cors());

//Lectura y parseo del body - Midellware
app.use(express.json());//de esta manera el mismo framework de express nos toma el paseo a la hora de enviar data

//Director publico
app.use(express.static('public'))

//Rutas llamadas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

//escuchar puerto
app.listen(process.env.PORT, ()=>{
    console.log(`Servidor corriedo en el puerto ${process.env.PORT}`)
});

// ReactCalendar
// 0pHl0T7fEDJPjjgm

// mern_user
// GvATbNtcqrRhQKfO