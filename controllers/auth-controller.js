const { response } = require("express");
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google-verify");


const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {


        // Verifica email
        const usuarioDB = await Usuario.findOne({ email });

        if (!usuarioDB) {
            return res.status(404).json({
                ok: true,
                msg: 'Email no encontrado'
            });
        }

        // Verificar contraseña
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            return res.status(400).json({
                oka: false,
                msg: 'Contraseña no encontrada'
            })
        }

        // Generar el token - JWT
        const token = await generarJWT(usuarioDB.id);

    

        // Retornamos token generado
        res.json({
            ok: true,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admisnistrador'
        });
    }
}


const googleSignIn = async (req, res=response) => {

    const googleToken = req.body.token;

    try {

       const {name, email, picture } = await googleVerify(googleToken);

       // Verificamos si el usuario ya existe
       const usuarioDB = await Usuario.findOne({email});
       let usuario;

  
       if(!usuarioDB){      
        // Si el usuario no existe creamos una nuevo:
           usuario = new Usuario({
               nombre: name,
               email,
               pasword:'@@@',
               img:picture,
               google:true,
        });
       } else {
           // Si existe el usuario
           usuario = usuarioDB;
           usuario.google = true;

           // Borramos su pasword si queremos que solo se autentique por google
           // si no la borramos tendra dos modos de autenticarse
           // usuario.password = '@@@'; // barramos su password poniendo cualquier cosa
       }

       // Guardamos moficicaciones en base de datos:
        await  usuario.save();

        //Generamos JWT (Json web token) con el id del usuario que lo genera mongoose:
         // asi dicho id de usuario lo podremos leer en token gnerado.
        const token = await generarJWT(usuario.id);

         // Enviamos la informacion que deseemos:
        res.json({
            ok: true,
            msg: 'Google SingIn',
            name, email, picture,
            token
        });
        
    } catch (error) {
        
        res.json({
            ok: false,
            msg: 'Token no es correcto',
        });
    }


}

module.exports = {
    login,
    googleSignIn
}