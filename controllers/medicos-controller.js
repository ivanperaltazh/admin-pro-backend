const Medico = require('../models/medico');
const Hospital = require('../models/hospital');


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


const getMedicoById = async (req, res=response) =>{
    const id = req.params.id; // id medico

    try {  
        const medico = await Medico.findById(id)
                        .populate('usuario', 'nombre img')
                        .populate('hospital', 'nombre img');
        res.json({
        ok:true,
        medico
        });

    } catch (error) {
        console.log(error);
        res.json({
            ok:true,
            msg: 'Hable con el administrador'
            });
    }
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


const actualizaMedico = async (req, res=response) => {

    const id = req.params.id; // id medico
    const uid = req.uid; // dispondo del uid del usuario por la autenticacion de JWT
    const idHospital = req.body.hospital;

    try {
        const medico = await Medico.findById(id);
        if(!medico){
            return res.status(404).json({
                ok:true,
               msg:'Medico no encontrado por id'
            });
        }

        const hospitalDB = await Hospital.findById(idHospital);
        if(!hospitalDB){
            return res.status(404).json({
                ok:true,
               msg:'Hospital no encontrado por id'
            });
        }

        // Mejor actualizar asi que es mejor cuando hay varios campos
        const cambiosMedico = {
            ...req.body,
            usuario:uid,
            hospital:idHospital
        }
      //  {new:true} -> Instruccion para que retorne ultimo cambio actualizado
    const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedico, {new:true});

        res.json({
            ok:true,
            medico : medicoActualizado
        });
        
    } catch (error) {
        console.log(error);

        res.json({
            ok:false,
            msg:'hable con el admistrador'
        });       
    }
}

const borrarMedico = async (req, res=response) =>{
    const id = req.params.id;

    try {
        const medico = await Medico.findById(id);
        if(!medico){
            return res.status(404).json({
                ok:true,
               msg:'Medico no encontrado por id'
            });
        }
     
        //Borramos hospital:
        await Medico.findByIdAndDelete(id);

        res.json({
            ok:true,
            msg:'Medico eliminado'
        });
        
    } catch (error) {
        console.log(error);

        res.json({
            ok:false,
            msg:'hable con el admistrador'
        })  
    }
}

module.exports = {
    getMedicos,
    crearMedico,
    actualizaMedico,
    borrarMedico,
    getMedicoById
}