const mongoose = require('mongoose');

// async :  retorna una promesa
// awaite: ayuda a trabajar como si fuera sincrono, auquqe sea promesa
const dbConnection = async () => {

    // hospitaldb: esta base de datos de la cadena de coneccion no la cree aun, 
    // pero se creara cuando se inserten datos

    try{
        await  mongoose.connect(process.env.DB_CNN, {
              useNewUrlParser: true,
              useUnifiedTopology: true,
              useCreateIndex:true
             });

             console.log('Db Online, Ok');

    } catch(error){
          console.log(error);
    // lanzar el error ademas de mostrar mensaje detenie toda  la ejecucion, ya no se puede grabar nada en BD
          throw new Error ('Error a la hora de iniciar BD ver logs'); 
    }

}


 // Exportamos conexion  dbConnection, para poder usarla en otros sitios como en index.js
 module.exports = {
    dbConnection
}