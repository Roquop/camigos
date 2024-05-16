const connection = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


class userControllers {
    //Para crear una cuenta
    //localhost:4000/users/register

    register = (req, res) => {
        const { name, lastname, email, password, type } = req.body;
        //Hasheamos la contraseña
        let saltRounds = 8;
        let mensaje = "Cuenta creada con éxito"
        bcrypt.genSalt(saltRounds, function (err, saltRounds) {
            bcrypt.hash(password, saltRounds, function (err, hash) {
                let sql = `INSERT INTO user (name, lastname, email, password) VALUES ('${name}', '${lastname}', '${email}', '${hash}')`;
                connection.query(sql, (error, result) => {
                    if (error) {
                        res.status(400).json({ error });
                    }
                    else {
                        res.status(200).json({ mensaje });
                    }
                });
            })
        });
        
    }
}

module.exports = new userControllers();
