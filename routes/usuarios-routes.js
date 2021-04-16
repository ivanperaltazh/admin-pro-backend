/*
    Ruta: /api/usuarios
*/

const {Router} = require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');
const {getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario} = require('../controllers/usuarios-controller');
const { validarJWT, validarADMIN_ROLE, validarADMIN_ROLE_o_MismoUsuario} = require('../middlewares/validar-jwt');
const router = Router();

// Rutas, -> llama al controlador, que se ha separdo de aqui para hacerlo mas entendible
  //check() : validar campos
  //validarJWT -> todas las rutas que tenga este middleware estam protegidas por validacion de usuario
router.get('/', validarJWT, getUsuarios); 

router.post('/',
[
 check('nombre', 'El nombre es obligatorio').not().isEmpty(),
 check('password', 'El password es obligatorio').not().isEmpty(),
 check('email', 'El email es obligatorio').isEmail(),
 validarCampos, // Tiene que ser el ultimo en llamarse despues de los checks
],
crearUsuario
);


router.put('/:id',
[  validarJWT,
   validarADMIN_ROLE_o_MismoUsuario, // validamos si es ADMIN_ROL  o el mismo usuario para que pueda editar su perfil
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(), 
    check('role', 'El rol es obligatorio').not().isEmpty(),
    validarCampos, // Tiene que ser el ultimo en llamarse despues de los checks
],
actualizarUsuario);
  

router.delete('/:id', [validarJWT, validarADMIN_ROLE], borrarUsuario);


module.exports = router;