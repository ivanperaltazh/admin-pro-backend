const Hospital = require('../models/hospital');


const  {response} = require('express');


const getHospitales = async (req, res=response) =>{

    const hospitales = await Hospital.find()
                    .populate('usuario', 'nombre img');

    res.json({
        ok:true,
        hospitales
    });
}


const crearHospital = async (req, res=response) =>{

    const uid = req.uid; // es el uid que viene en el token.
    
    // Desestrucutramos los campos para enviar el uid del usuario
    const hospital = new Hospital({
        usuario : uid,
        ...req.body
    });

    try {
        const hospitalDB = await hospital.save();

        res.json({
            ok:true,
            hospita: hospitalDB
        });
    } catch (error) {
        console.log(error);
        
        res.status(500).json({
            ok:false,
            msg:'hable con el administrador'
        })
    }

}


const actualizaHospital = (req, res=response) =>{
    res.json({
        ok:true,
        msg:'actualizaHospital'
    });
}

const borrarHospital = (req, res=response) =>{
    res.json({
        ok:true,
        msg:'borrarHospital'
    });
}

module.exports = {
    getHospitales,
    crearHospital,
    actualizaHospital,
    borrarHospital
}