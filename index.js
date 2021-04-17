
const express = require("express");  // esto equivale a un import
const cors = require('cors')

// para poder leer archicos tipo .env instalamos dotenv  con:  npm i dotenv
require('dotenv').config(); // con esto leemos variable de entorno

// Esto se usa cuando se despliega en el en servidor, no se importa de ningun sitio biene ya en Node:
const path = require('path');

const { dbConnection } = require('./database/config');



// Crear el servidor express
const app = express() // Esto inicializa la aplicacion de express

// Configurar cors
// use() es un midelwods, es decir un funcion que se ejecuta cada vez que se haga una peticion.
// Al estar aqui se ejecutara desde aqui hacia bajao para todas la peticones
app.use(cors());

// Lectura y parseo del body
app.use(express.json()); // Este codigo siempre va antes de las Rutas

// Base de datos
dbConnection();
// user: mean_user
// pass: 123

//Instalado dotenv, podemos imprimir variables de entorno de Node
// console.log(process.env); 

// Directorio Publico
app.use(express.static('public'));


// Rutas
app.use('/api/usuarios', require('./routes/usuarios-routes')); // use(): Funcion intermedia o Middleware
app.use('/api/hospitales', require('./routes/hospitales-routes'));
app.use('/api/medicos', require('./routes/medicos-routes'));
app.use('/api/login', require('./routes/auth-routes'));
app.use('/api/todo', require('./routes/busquedas-routes'));
app.use('/api/upload', require('./routes/uploads-routes'));


// Esta ruta se usa cuando se despliega en el servidor sobre todo (aunque tambien localmente)
// he indica que si no es ninguna de las ruatas anteriores se responde con el path de index de Angular
// que luego de hacer build --prod se abra colocado en carpeta public del este back,
// de este modo el codigo de angular tendra el control de las rutas:
  app.get('*', (req, res) =>{
     res.sendFile(path.resolve(__dirname,'public/index.html'));
  })


//Levantar la app process.env.PORT -> pasamos el puerto definido en ".env"
app.listen(process.env.PORT, () => {
  console.log('servidor corriendo en puerto ' + process.env.PORT);
});