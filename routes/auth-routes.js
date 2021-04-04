/*
   Path: '/api/login'
*/ 

const {Router} = require('express');
const { check } = require('express-validator');
const {login, googleSignIn, renewToken} = require('../controllers/auth-controller');
const {validarCampos} = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router  = Router();

router.post('/', 
[
  check('email', 'El email es obligatorio').isEmail(),
  check('password', 'El pasword es obligatorio').not().isEmpty(),
  validarCampos
],
login
);

// este es el token inial que se resive al hacer login
router.post('/google', 
[
  check('token', 'El token de Google es obligatorio').not().isEmpty(),
  validarCampos
],
googleSignIn
)

// Renovar token, '/' ->  '/api/login'
router.get('/renew', 
validarJWT,
renewToken
)

module.exports = router;