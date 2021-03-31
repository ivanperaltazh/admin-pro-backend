const Usuario = require('../models/usuario');

// Solo Para tener ayudas al escribir y definir tipos, importo y lo igualo abajoa res=response
const { response } = require('express');

// Para encriptar contraseña instalamos libreria  "npm i bcryptjs"
const bcrypt = require('bcryptjs');
const { findByIdAndUpdate } = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

//CONTROLADOR- Aqui estara la logica de las Rutas
//req -> solicitud; res -> respuesta del servidor
const getUsuarios = async (req, res) => {

    // Usuario.find() -> trae todos los datos de usurio pero dentro se pueden poner filtros de datos q queremos:
    const usuarios = await Usuario.find({}, 'nombre email role google');

    // uid: req.uid -> es la uid del usuario que hace la peticion
    res.json({
        ok: true,
        usuarios,
        uid: req.uid 
    });
}

const crearUsuario = async (req, res = response) => {
    // Leemos body que nos envian
    //console.log(req.body);
    const { email, password } = req.body;

    try {
        //Validacion, dentro de la busqueda .findOne({}) especificamos campo q nos interesa
        const existeEmail = await Usuario.findOne({ email });
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El coreo ya esta resgistrado'
            });
        }

        const usuario = new Usuario(req.body);

        //Encriptamos contraseña
        const salt = bcrypt.genSaltSync(); //Genera una data de manera aleatoria
        usuario.password = bcrypt.hashSync(password, salt);

        //Grabamos en la base de datos con save(), que es una promesa por
        // lo que necesitamos el await mientras llega respuesta, 
        // sino se ejecutaria codigo siguiente dando error, pero para usar el await necesitamos estar 
        //  necesita estar dentro de una funcion con async(req, res)....
        await usuario.save();

        // Generar el token - JWT
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            usuario,   // o tambien usuario : usuario
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...revisar logs'
        });
    }
}



const actualizarUsuario = async (req, res = response) => {

    // ToDo: Validar token y comprovar si es el usurio correcto

    const uid = req.params.id;

    try {

        // Obtengo la instncia del usuario
        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            });
        }

        // Actualizaciones
        // const campos = req.body // Puede hacerse asi y abria que borrar campo 
        // que no se usan asi:  delete campos.email;
        // o desestructurando para quitar password, email y google
        const { password, google, email, ...campos } = req.body

        if (usuarioDB.email !== email) {
            // En caso de ser diferente email verifico que no exista ese email
            const existeEmail = await Usuario.findOne({ email: email });
            //Si existe no voy a poder actualizar:
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya exsite un usuario con ese email'
                });
            }
        }
        //Añadimos el email
        campos.email = email;

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });
        // buscar por id y actualizar,  {new:true}-> indica que retorne respueta verificacion con nueva actulizacion

        res.json({
            ok: true,
            usuario: usuarioActualizado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error inesperado'
        })
    }
}


const borrarUsuario = async (req, res = response) => {

    const uid = req.params.id;

    try {
        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            });
        } 
            // await usuarioDB.delete();
            await Usuario.findByIdAndDelete(uid);

            res.json({
                ok: true,
                usuario: 'Usuario eliminado'
            })
       
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error inesperado'
        })
    }
}



module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}