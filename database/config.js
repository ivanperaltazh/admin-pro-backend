const mongoose = require('mongoose');
/* Mongoose : biblioteca de JavaScript que le permite definir esquemas con datos  tipados.
   Un esquema en Mongoose es una estructura JSON que contiene información acerca de las
   propiedades de un documento. En otras palabras, los esquemas sirven como guias de la 
   estructura de los documentos.
   Estos esquemas permiten crear un Modelo y asignarlo  a un documento MongoDB que equivale 
    a una tabla de una bases de datos relacional.
    Mongoose ignora todas las propiedades que no sean definidas dentro del modelo de un esquema.
     */

// AQUI ALMACENAMOS LA CONEXION A AL BASE DE DATOS

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