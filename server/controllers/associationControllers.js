const connection = require("../config/db");

class associationControllers {
    getAllAssociations = (req, res) => {
        let sql = 'SELECT * from association';
        connection.query(sql, (error, result) => {
            if (error) {
                res.status(400).json({ error });
            } else {
                console.log(result)
                res.status(200).json({ result });
            }
        });
    };

    getOneAssociation = (req, res) => {
        const {association_id} = req.params
      
        let sql = `SELECT * from association WHERE association_id = ${association_id}`;
        connection.query(sql, (error, result) => {
            if (error) {
                res.status(400).json({ error });
            } else {
                console.log(result)
                res.status(200).json({ result });
            }
        });
    }
}

module.exports = new associationControllers();