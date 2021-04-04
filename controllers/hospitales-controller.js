const Hospital = require('../models/hospital');


const  {response} = require('express');
const hospital = require('../models/hospital');


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
            hospital: hospitalDB
        });
    } catch (error) {
        console.log(error);
        
        res.status(500).json({
            ok:false,
            msg:'hable con el administrador'
        })
    }

}


const actualizaHospital = async (req, res=response) =>{

    const id = req.params.id; // id hospital
    const uid = req.uid; // dispondo del uid del usuario por la autenticacion de JWT


    try {

        const hospital = await Hospital.findById(id);

        if(!hospital){
            return res.status(404).json({
                ok:true,
               msg:'Hospital no encontrado por id'
            });
        }

          // Actualiza asi cuando hay solo un campo:
        //hospital.nombre = req.body.nombre;

        // Mejor actualizar asi que es mejor cuando hay varios campos
        const cambiosHospital = {
            ...req.body,
            usuario:uid
        }

      //  {new:true} -> Instruccion para que retorne ultimo cambio actualizado
    const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambiosHospital, {new:true});


        res.json({
            ok:true,
            hospital : hospitalActualizado
        });
        
    } catch (error) {
        console.log(error);

        res.json({
            ok:false,
            msg:'hable con el admistrador'
        })
        
    }
    
}

const borrarHospital = async (req, res=response) =>{

    const id = req.params.id;

    try {

        const hospital = await Hospital.findById(id);

        if(!hospital){
            return res.status(404).json({
                ok:true,
               msg:'Hospital no encontrado por id'
            });
        }
     
        //Borramos hospital:
        await Hospital.findByIdAndDelete(id);

        res.json({
            ok:true,
            msg:'Hospital eliminado'
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
    getHospitales,
    crearHospital,
    actualizaHospital,
    borrarHospital
}