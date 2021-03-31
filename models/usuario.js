const {Schema, model} = require('mongoose');

/*
Otra forma de imoportar:

const mongoose = requiere('mongoose');
mongoose.Schema

*/

// Definimos coleccion o tabla de usuarios de base de datos:
const UsuarioSchema = Schema({
   nombre: {
       type: String,
       require: true
   },
   email: {
        type: String,
        require: true,
        unique: true
   },
    password: {
        type: String,
        require: true
   },
   img: {
        type: String,
    },
    role: {
        type: String,
        require: true,
        default: 'USER_ROLE'
    },
    google: {
        type: Boolean,
        default: false
    },  
});

// Esto es solo pra cambiar el nombre del id que mongo lo pone como "_id" y nosotros
  // lo queremos sin gion bajo, y  llamarlo "'uid'"
  //y extaremos la version (__v) que ya  no se mostrara. esto esta en documentacion de mongoose
UsuarioSchema.method('toJSON', function() {
    // extraemos ls propiedades _v, id y todas las demas
    const {__v, _id, password, ...object}  = this.toObject();
    object.uid = _id;
    return object;
})


/* Implementamos y exportamos el modelo, para que sea usado fuera: el modelo va
    tener instruciones para grabar, hacer querys, CRUD. Sobre la tabla usuarios que moogose lo grabara en plural */ 
module.exports = model('Usuario', UsuarioSchema);