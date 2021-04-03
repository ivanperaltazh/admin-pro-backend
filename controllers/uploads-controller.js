const path = require('path'); // funcion de node, sirve para construir paths
const fs = require('fs'); // fs: funcion file-system de node, sirve para leer archivos y carpetas y trabajar con ellos

const { response } = require("express");
const { v4: uuidv4 } = require('uuid'); // genera identificadores unicos para archivos subidos
const { actualizarImagen } = require("../helpers/actualizar-imagen");


const fileUpload = (req, res=response) => {

    const tipo = req.params.tipo;
    const id = req.params.id;

 // Validar tipos
    const tiposValidos = [ 'hospitales', 'medicos', 'usuarios'];

    if(!tiposValidos.includes(tipo)){
        return res.status(400).json({
          ok: false,
          msg: 'No es un medico, usuario u hospital'
        });
    }

    // Validamos si existe fichero a subir
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg:'No hay ningun archivo'
        });
      }


      // Procesar la imagen
      const file = req.files.imagen;
      // console.log(file);

      const nombreCortado = file.name.split('.'); // costasmos nombre de la imagen por el punto, para obtenr la extencion

      const extensionArchivo = nombreCortado[nombreCortado.length -1]; // obtenemos ultima posion corresponde a extension

     // Validamos extension 
     const extensionesValidas = ['png', 'jpg', 'JPG', 'jpeg', 'gif'];
     if(!extensionesValidas.includes(extensionArchivo)){
        return res.status(400).json({
          ok: false,
          msg: 'No es una extension permitida'
        });
    }

    // Generamos nombre del archivo
  const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;


  // Path guardar la imagen
  const path = `./uploads/${tipo}/${nombreArchivo}`;

    // Mover la imagen  ( usa mv())
    file.mv(path, (err) => {
    if (err){
        console.log(err);
        return res.status(500).json({
            ok:false,
            msg: 'Error al mover la imagen'
        })
    }

    // Actualizar base de datos
     actualizarImagen( tipo, id, nombreArchivo);

    res.json({
        ok: true,
        msg:'Archivo subido',
        nombreArchivo
    });
  });
}

const retornaImagen = (req, res= response ) =>{

  const tipo = req.params.tipo;
  const foto = req.params.foto;

  //__dirname: directorio del proyrcto 
  const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);

  //Imagen por defecto
if(fs.existsSync(pathImg)){
   res.sendFile(pathImg);
} else {
  const pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
  res.sendFile(pathImg);
}

}

module.exports = {
    fileUpload,
    retornaImagen
}