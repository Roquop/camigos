//Multer es la biblioteca que nos permite gestionar las imágenes
const multer = require("multer");
//En la función upLoadImage es donde definimos el destino de nuestras imágenes y su nomenclatura
function uploadImage(a) {
  const storage = multer.diskStorage({
    
    destination: `../client/./public/images/${a}`,
    //destination: `./public/images/${a}`,
//En este caso, para estar seguros de no repetir nombres, el callback, que será donde se defina el nombre, está compuesto de ID + la fecha en que se guardó seguida de un guión y el nombre del archivo
    filename: function (req, file, callback) {
      callback(null, "Id-" + Date.now() + "-" + file.originalname);
    },
  });
//Aquí hacemos que se suban las imágenes según lo que hemos definido y como "file", por eso siempre trabajamos con file en back y en front cuando tenemos que hacer que se comuniquen entre ellos y hay imágenes. En este caso pone .array porque la idea era subir varias imágenes, pero al final nos conformamos con subir una a la vez. 
  const upload = multer({ storage: storage }).array("file");

  return upload;
}

module.exports = uploadImage;
