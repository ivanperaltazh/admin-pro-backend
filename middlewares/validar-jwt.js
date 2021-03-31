// Los middleware son como cualquier controlador con la diferencia que tienen 
// el next(), es la funcion que se llama si todo sale corectamente

const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {

  // Leer el token 
     const token = req.header('x-token');
    // console.log(token);

    // Vemos si hay token
     if(!token){
         return res.status(401).json({
              ok:false,
              msg:'No hay token en la peticion'
         })
     }

     // Verificamos si token es correcto, verify()le pasamos token enviado y nuestro nuemro secreto
        // que se usa para encriptar el token. Y ontenemos el uid del cliente que hace la peticion get de usuarios
     try {

        const {uid} = jwt.verify(token, process.env.JWT_SECRET);
        // console.log('el uid es :', uid);

        req.uid = uid; // establecemos un nuevo elemento en la request que se sera el uid 
        // del usuario que hace la peticion getUsuarios, con el valor con el obtenido del token con verify()

        next();
     } catch (error) {
         console.log(error);
         return res.status(401).json({
            ok:false,
            msg:'Token no valido'
       })
     }

 
}

//lo exportamos para poder usarlo en cualquier otro archivo
module.exports =  {
    validarJWT
}