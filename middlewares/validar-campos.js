const {response} = require('express');
const {validationResult} = require('express-validator');


// next() se llama si pasa validacion y no hay errores
const validarCampos = (req, res=response, next ) => {

      // Validaciones instalamos "npm i express-validator"
      const errores = validationResult(req);
      if(!errores.isEmpty()){
          return res.status(400).json({
              ok:false,
              errors: errores.mapped(),
          });
      }

      next();

}

module.exports = { validarCampos};