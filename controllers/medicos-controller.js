const Medico = require('../models/medico');


const  {response} = require('express');

const getMedicos = async (req, res=response) =>{
    const medicos = await Medico.find()
                    .populate('usuario', 'nombre img')
                    .populate('hospital', 'nombre img');
    res.json({
    ok:true,
    medicos
    });
}

const crearMedico = async (req, res=response) =>{

    const uid = req.uid; // es el uid que viene en el token.

    // Desestrucutramos los campos para enviar el uid del usuario
    const medico = new Medico({
        usuario : uid,
        ...req.body
    });

    try {
        const medicoDB = await medico.save();

        res.json({
            ok:true,
            medico: medicoDB
        });
    } catch (error) {
        console.log(error);
        
        res.status(500).json({
            ok:false,
            msg:'hable con el administrador'
        })
    }

}


const actualizaMedico = (req, res=response) =>{
    res.json({
        ok:true,
        msg:'actualizaMedico'
    });
}

const borrarMedico = (req, res=response) =>{
    res.json({
        ok:true,
        msg:'borrarMedico'
    });
}

module.exports = {
    getMedicos,
    crearMedico,
    actualizaMedico,
    borrarMedico
}