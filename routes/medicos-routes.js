/*
    Medicos:
    ruta: /api/medicos
*/

const {Router} = require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');
const {
            getMedicos,
            crearMedico,
            actualizaMedico,
            borrarMedico,
            getMedicoById
     } = require('../controllers/medicos-controller')


const router = Router();

// Rutas, -> llama al controlador, que se ha separdo de aqui para hacerlo mas entendible
  //check() : validar campos
  //validarJWT -> todas las rutas que tenga este middleware estan protegidas por validacion de usuario
router.get('/',   validarJWT, getMedicos ); 

router.post('/',
[
  validarJWT,
  check('nombre','El nombre del medico es necesario').not().isEmpty(),
  check('hospital','El id del hospital debe ser valido').isMongoId(),
  validarCampos
],
crearMedico
);

// actualizar medico
router.put('/:id',
[
  validarJWT,
  check('nombre','El nombre del hospital es necesario').not().isEmpty(),
  check('hospital','El id del hospital debe ser valido').isMongoId(),
  validarCampos 
],
actualizaMedico);
  

router.delete('/:id',
 validarJWT,
 borrarMedico
 );

 router.get('/:id',
 validarJWT,
 getMedicoById
 );

module.exports = router;