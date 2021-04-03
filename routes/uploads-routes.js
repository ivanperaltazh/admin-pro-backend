/*
  ruta: api/uploads
*/

const {Router} = require('express');
const { fileUpload, retornaImagen } = require('../controllers/uploads-controller');
const { validarJWT } = require('../middlewares/validar-jwt');
const expressfileUpload = require('express-fileupload'); // en la importacion ponemos ele nombre que queremos



const router = Router();

router.use(expressfileUpload()); // middleware que da acceso a asignar imagens a una varible

//Tipo puedo ser usuario medico u hospital
router.put('/:tipo/:id', validarJWT, fileUpload);
router.get('/:tipo/:foto', retornaImagen);


module.exports = router;