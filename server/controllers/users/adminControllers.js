const connection = require("../../config/db");

class adminControllers {
    prueba = (req, res) => {
        let sql = 'SELECT * from user';
        connection.query(sql, (error, result) => {
            if (error) {
                res.status(400).json({ error });
            } else {
                console.log(result)
                res.status(200).json({ result });
            }
        });
    };
}

module.exports = new adminControllers();