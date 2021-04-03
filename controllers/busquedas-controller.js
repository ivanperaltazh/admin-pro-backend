
const  {response} = require('express');

const Usuario =require('../models/usuario');
const Medico =require('../models/medico');
const Hospital =require('../models/hospital');


const getBusquedas = async (req, res=response) =>{
    try {
        const busqueda = req.params.busqueda;
        const findRegex = new RegExp(busqueda, 'i'); 
        // exprecion regular para que busqueda sea por cualquier letra de palabra
        
        [usuarios, medicos, hospitales] = await Promise.all([
            Usuario.find({ nombre: findRegex}), 
            Medico.find({ nombre: findRegex}),
            Hospital.find({ nombre: findRegex})
        ])

        res.json({
                ok:true,
                usuarios,
                medicos,
                hospitales 
            });
    } catch (error) {
        console.log(error);
        res.json({
            ok:false,
            msg: 'Error inesperado'
            });
    }
}


const getDocumentosColeccion = async (req, res=response) =>{

        const tabla     = req.params.tabla;
        const busqueda  = req.params.busqueda;
        const findRegex = new RegExp(busqueda, 'i'); 

        let data = [];
       
        switch (tabla) {
            case 'medicos':
                   data = await Medico.find({ nombre: findRegex})
                   .populate('usuario', 'nombre img')
                   .populate('hospital', 'nombre img');
                break;

                case 'usuarios':
                    data = await Usuario.find({ nombre: findRegex});
                break;

                case 'hospitales':
                     data = await Hospital.find({ nombre: findRegex})
                            .populate('usuario', 'nombre img');
                break;
        
            default:
               return res.status(400).json({
                    ok:false,
                    msg: 'La tabla tiene que ser usuarios, medicos u hopitales'
                    }); 
        }

        res.json({
                ok:true,
                resultados: data
            });
    
}


module.exports = {
    getBusquedas,
    getDocumentosColeccion
}