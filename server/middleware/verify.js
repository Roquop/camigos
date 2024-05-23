const jwt = require("jsonwebtoken");
//La configuración para el jsonwebtoken, tan solo he tenido que introducir el process.env.SECRET (que necesita para considerarse un uso seguro, si no da problemas, aunque yo haya puesto un secret "flojo"), también hice el console.log de los headers para entender bien que estaba pasando y 
const verify = (req, res, next) => {
  const header = req.headers.authorization;
  console.log(req.headers)
  if (!header) {
    return res.status(401).json("Token no encontrado");
  }

  //   Bearer token, el "famoso" token que lleva toda la información, declarado con la información que conseguimos de los headers cuando lo llamamos en un controlador. Hay que recordar que esta función no funciona sola, sino que luego hay que llamarla en el controlador y usar las funciones predefinidas de la librería.
  const token = header.split(" ")[1];

  if (!token) {
    return res.status(401).json("Token no valido");
  }
  //Esto nos permite ver si tenemos el token o no para pasar la información en la función en la que llamemos y si es correcto.
  //Podemos saltarnos la carpeta de node_modules e ir directamente a ../routes/users.admin.js
  jwt.verify(token, process.env.SECRET, (error, decoded) => {
    console.log(token)
    console.log(process.env.SECRET)

    if (error) {
      console.log(error);
      return res.status(400).json(error);
    }
    next();
  });
};

module.exports = verify;