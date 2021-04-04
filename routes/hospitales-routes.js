/*
    Hospitales:
    ruta: /api/hospitales
*/

const {Router} = require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');
const {
        getHospitales,
        crearHospital,
        actualizaHospital,
        borrarHospital
     } = require('../controllers/hospitales-controller')


const router = Router();

// Rutas, -> llama al controlador, que se ha separdo de aqui para hacerlo mas entendible
  //check() : validar campos
  //validarJWT -> todas las rutas que tenga este middleware estan protegidas por validacion de usuario
router.get('/', getHospitales); 

router.post('/',
[
  validarJWT,
  check('nombre','El nombre del hospital es necesario').not().isEmpty(),
  validarCampos
],
crearHospital
);

// actualizar hospital
router.put('/:id',
[
  validarJWT,
  check('nombre','El nombre del hospital es necesario').not().isEmpty(),
  validarCampos
],
actualizaHospital);
  

router.delete('/:id',
 validarJWT,
 borrarHospital
 );


module.exports = router;