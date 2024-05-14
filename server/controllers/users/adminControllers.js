const connection = require("../../config/db");

class adminControllers {
    prueba = (req, res) => {
        console.log("bien")
        // let sql = 'SELECT * from prueba';
        // connection.query(sql, (error, result) => {
        //     if (error) {
        //         res.status(400).json({ error });
        //     } else {
        //         res.status(200).json({ result })
        //     }
        // });
    };
}

module.exports = new adminControllers();