const fs = require('fs'); // fs: funcion file-system de node, sirve para leer archivos y carpetas y trabajar con ellos

const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');
const { findById } = require('../models/usuario');


const borrarImagen = (path) => {
// Verificar si existe ya una imagen del medico (usuasrio u hospital) para borrar y añadir nueva
// medico.img -> aqui se guardaria el path de la imagen
               if(fs.existsSync(path)){
                   fs.unlinkSync(path); // si existe un archivo lo borramos
               }         
} 

let pathViejo = '';

const actualizarImagen = async (tipo, id, nombreArchivo) => {

    switch (tipo) {
        case 'medicos':
             const medico = await Medico.findById(id);
             if(!medico){
                 console.log('No se encontro un medico por id');
                 return false;
                }

                // Verificar si existe ya una imagen del medico (usuasrio u hospital) para borrar y añadir nueva
               // medico.img -> aqui se guardaria el path de la imagen
                 pathViejo = `./uploads/medicos/${medico.img}`;
                borrarImagen(pathViejo); // borra imagen anterior si existe

                // Guardamos el path en el campo de la imagen
                medico.img = nombreArchivo;

                // Guardmos el medico
                await medico.save();
                return true;
            break;

        case 'hospitales':
            const hospital = await Hospital.findById(id);
            if(!hospital){
                console.log('No se encontro hspital por id');
                return false;
               }

               pathViejo = `./uploads/hospitales/${hospital.img}`;
               borrarImagen(pathViejo);

               hospital.img = nombreArchivo;
               await hospital.save();
               return true;          
            break;

        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if(!usuario){
                console.log('No se encontro usuario por id');
                return false;
               }

               pathViejo = `./uploads/usuarios/${usuario.img}`;
               borrarImagen(pathViejo);

               usuario.img = nombreArchivo;
               await usuario.save();
               return true;  
            break;
        default:
            break;
    }


}

module.exports = {
    actualizarImagen
}