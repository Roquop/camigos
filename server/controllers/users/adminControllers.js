const connection = require("../../config/db");

//Los controladores de admin, guardados en una clase, donde requeriremos la conexión con la base de datos
class adminControllers {
    //El controlador prueba, que solo hemos creado en un primer tiempo para ver si la conexión con la base de datos era correcta, pero que dejamos ahora para explicar la arquitectura de los controladores y porque quizá desarrolle otros controladores más adelante y esto me permite tener la parte más tediosa hecha.
    prueba = (req, res) => {
        //guardamos la query que usaremos
        let sql = 'SELECT * from user';
        connection.query(sql, (error, result) => {
            if (error) {
                //Con el res.status y el .json, podemos enviar destructurado un objeto al front, tanto el error como el result, así podremos pintarlo o hacer un log
                res.status(400).json({ error });
            } else {
                console.log(result)
                res.status(200).json({ result });
            }
        });
    };
}
// Exportamos la clase para trabajar con ella en el archivo routes
module.exports = new adminControllers();