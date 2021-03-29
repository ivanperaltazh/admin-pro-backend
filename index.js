
const express = require("express");  // esto equivale a un import
const cors = require('cors')

// para poder leer archicos tipo .env instalamos dotenv  con:  npm i dotenv
require('dotenv').config(); // con esto leemos variable de entorno
const {dbConnection} = require('./database/config');



// Crear el servidor express
const app = express() // Esto inicializa la aplicacion de express

// Configurar cors
// use() es un midelwods, es decir un funcion que se ejecuta cada vez que se haga una peticion.
// Al estar aqui se ejecutara desde aqui hacia bajao para todas la peticones
app.use(cors()); 

// Base de datos
dbConnection();
// user: mean_user
// pass: 123

//Instalado dotenv, podemos imprimir variables de entorno de Node
// console.log(process.env); 

// Rutas, req -> solicitud; res -> respuesta del servidor
app.get('/', (req, res) => {

  res.json({
      ok:true,
      msg:'Hola mundo'
  })

});


//Levantar la app process.env.PORT -> pasamos el puerto definido en ".env"
app.listen(process.env.PORT,() => {
     console.log('servidor corriendo en puerto ' + process.env.PORT);
} );