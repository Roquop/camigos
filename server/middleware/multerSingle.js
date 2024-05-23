//el mismo multer pero que solo nos permite subir una imagen, al final hemos utilizado el de array seleccionando [0] como se puede ver en el front en un primer tiempo, pero también podríamos haber usado este (y de nuevo, dejo el archivo por si se sigue desarrollando, habrá momentos en que sea más interesante usar un multer u otro, pero en este caso he aprendido a usar el múltiple mejor)
const multer = require("multer");
function uploadImage(a) {
  const storage = multer.diskStorage({
    
    destination: `../client/./public/images/${a}`,
    //destination: `./public/images/${a}`,

    filename: function (req, file, callback) {
      callback(null, "Id-" + Date.now() + "-" + file.originalname);
    },
  });

  const upload = multer({ storage: storage }).single("file");

  return upload;
}

module.exports = uploadImage;
