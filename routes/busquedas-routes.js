/*
  ruta: api/todo/:busqueda
*/

const {Router} = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getBusquedas, getDocumentosColeccion } = require('../controllers/busquedas-controller');


const router = Router();

// Rutas, -> llama al controlador, que se ha separdo de aqui para hacerlo mas entendible
  //check() : validar campos
  //validarJWT -> todas las rutas que tenga este middleware estan protegidas por validacion de usuario
router.get('/:busqueda', validarJWT, getBusquedas);
// "tabla" puede ser medico ususario u hospital
// "busqueda" la palabra o caracter a buscar
router.get('/coleccion/:tabla/:busqueda', validarJWT, getDocumentosColeccion);

module.exports = router;