const connection = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


class userControllers {
    login = (req, res) => {
        let { email, password, keepLogged } = req.body;
        //Seleccionamos al usuario que coincide con el email
        let sql = `SELECT * FROM user WHERE email = '${email}' AND deleted = 0`;
        keepLogged === true ? (keepLogged = null) : (keepLogged = "1d");
        // console.log("funciona")
        connection.query(sql, (error, result) => {
            // console.log(result);
            //en caso de error en la consulta
            if (error) return res.status(400).json(error);
            //en caso de no encontrar un user con dicho o mail.
            if (!result || !result.length || result[0].is_deleted == 1) {
                res.status(401).json("Usuario no registrado");
            } else {
                //en caso de que el email sea CORRECTO
                const [user] = result;
                const hash = user.password;

                //capturo el user_id
                const user_id = user.user_id;

                //compramos contraseñas
                bcrypt.compare(password, hash, (error, response) => {
                    if (error) res.status(400).JSON(error);
                    //si las contraseñas coinciden
                    if (response === true) {
                        const token = jwt.sign(
                            {
                                user: {
                                    email: user.email,
                                    name: user.name,
                                    lastname: user.lastname,
                                    id: user_id,
                                    type: user.type,
                                    img: user.user_img,
                                },
                            },
                            process.env.SECRET,
                            keepLogged === false && { expiresIn: keepLogged }
                        );
                        // console.log("este es el token");
                        res.status(200).json({ token, user: result[0] });
                        //si las contraseñas coinciden
                    } else {
                        res.status(401).json("El usuario o la contraseña son incorrectos");
                    }
                });
            }
        });
    };

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

    getOneUser = (req, res) => {
        const user_id = req.params.user_id;
        let sqlUser = `SELECT * FROM user WHERE user_id = ${user_id} and deleted = 0`;
        connection.query(sqlUser, (error, resultUser) => {
            if (error) {
                console.log(error)
                res.status(400).json({ error });
            }
            res.status(200).json({ resultUser });
        });
    };

    getAllComments = (req, res) => {
        const user_id = req.params.user_id;
        let sql = `SELECT comment_text, name_association, rating FROM comment, association, user WHERE comment.user_id = ${user_id} and  comment.association_id = association.association_id and comment.user_id = user.user_id `;
        connection.query(sql, (error, result) => {
            if (error) {
                console.log(error)
                res.status(400).json({ error });
            }
            res.status(200).json({ result });
        });
    };

    // Añade un comentario y selecciona la información de los comentarios para actualizar la lista
    //localhost:4000/users/farmer/postComment/:user_id/:association_id
    postComment = (req, res) => {
        const user_id = req.params.user_id;
        const association_id = req.params.association_id;
        const { comment_text, rating } = req.body;

        let sql = `INSERT INTO comment (user_id, association_id, comment_text, rating) VALUES (${user_id}, ${association_id}, '${comment_text}', '${rating}')`;
        let sql2 = `SELECT comment_text, name_association, rating FROM comment, association, user WHERE comment.user_id = ${user_id} and  comment.association_id = association.association_id and comment.user_id = user.user_id `;;

        connection.query(sql, (error, result) => {
            error && res.status(400).json({ error });
            // Envía la información de la lista de comentarios nueva
            connection.query(sql2, (error, result2) => {
                res.status(200).json(result2);
            });
        });
    };

    savePuzzle = (req, res) => {
        const user_id = req.params.user_id;
        const { puzzle } = req.body;

        let sql = `INSERT INTO puzzle (user_id, puzzle_img) VALUES (${user_id}, '${puzzle}')`;
        connection.query(sql, (error, result) => {
            error && res.status(400).json({ error });
        })

    }
    getAllPuzzles = (req, res) => {
        const user_id = req.params.user_id;

        let sql = `SELECT * from puzzle WHERE user_id = ${user_id} AND deleted = 0`;
        connection.query(sql, (error, result) => {
            if (error) {
                console.log(error)
                res.status(400).json({ error });
            }
            res.status(200).json({ result });
        });
    }

}

module.exports = new userControllers();
