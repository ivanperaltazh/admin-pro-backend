const { Schema, model } = require("mongoose");

const MedicoSchema = Schema({
    nombre: {
        type: String,
        require: true
    },
    img: {
         type: String,
     },
     usuario: { /* Para saber quien creo un registro de medico lo relacionamos con un Usuario */
         required:true,
         type: Schema.Types.ObjectId,
         ref: 'Usuario'
     },
     hospital: { /* Para saber a que hospital pertenece un registro de Medico lo relacionamos con un Hospital */
        required:true,
        type: Schema.Types.ObjectId,
        ref: 'Hospital'
    }
 });
 
 // Esto es solo pra cambiar el nombre del id que mongo lo pone como "_id" y nosotros
   // lo queremos sin gion bajo, y  llamarlo "'uid'"
   //y extaremos la version (__v) que ya  no se mostrara. esto esta en documentacion de mongoose
 MedicoSchema.method('toJSON', function() {
     // extraemos ls propiedades _v, id y todas las demas
     const {__v, ...object}  = this.toObject();
     return object;
 })
 
 
 /* Implementamos y exportamos el modelo, para que sea usado fuera: el modelo va
     tener instruciones para grabar, hacer querys, CRUD. Sobre la tabla usuarios que moogose lo grabara en plural */ 
 module.exports = model('Medico', MedicoSchema);