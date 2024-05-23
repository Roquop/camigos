const connection = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//para los controladores de usuario requerimos tanto bcrypt para hashear la contraseña como jwt para el token de sesión
class userControllers {
    //para hacer login
    login = (req, res) => {
        let { email, password, keepLogged } = req.body;
        //Seleccionamos al usuario que coincide con el email
        let sql = `SELECT * FROM user WHERE email = '${email}' AND deleted = 0`;
        //si se selecciona la opción de seguir conectado, seguiremos conectados durante un dia
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
                //guardamos la información de la contraseña introducida
                const hash = user.password;

                //capturo el user_id
                const user_id = user.user_id;

                //comparamos la contraseña introducida con la comparación de bcrypt, que la hasheará y verá si coincide con lo que "ella hubiera hecho" (las contraseñas se guardan hasheadas, yo no puedo saber las contraseñas de los usuarios)
                bcrypt.compare(password, hash, (error, response) => {
                    if (error) res.status(400).JSON(error);
                    //si las contraseñas coinciden, se genera un token de sesión con los datos, de manera que si algún usuario algo más espabilado se mete en el localStorage lo tendrá un poco más difícil para conseguir la información (es una protección débil, pero es un gran paso para mi y me ha costado!)
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
                        //si las contraseñas coinciden
                        res.status(200).json({ token, user: result[0] });
                    } else {
                        //si no
                        res.status(401).json("El usuario o la contraseña son incorrectos");
                    }
                });
            }
        });
    };

    //Para crear una cuenta
    register = (req, res) => {
        const { name, lastname, email, password } = req.body;
        //Hasheamos la contraseña, definimos el número de saltos, que es una variable que necesita bcrypt, es como el numero de pasadas que hará para codificar, con este número es más fácil descodificarlas.
        let saltRounds = 8;
        let mensaje = "Cuenta creada con éxito"
        bcrypt.genSalt(saltRounds, function (err, saltRounds) {
            //la función genSalt con .hash nos generará la contraseña que podremos introducir en los datos del usuario y hacer la secuencia insert para guardarlo.
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

    //Esta función es para traernos los datos de un solo usuario
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

    //Con esta función traemos todos los comentarios pero que pertenecen a un usuario concreto, para enseñarlos en la página de perfil.
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
    postComment = (req, res) => {
        const user_id = req.params.user_id;
        const association_id = req.params.association_id;
        const { comment_text, rating } = req.body;

        //por eso hay dos sentencias, una para el post, y otra para traer los comentarios actualizados, aunque al final se ha usado una segunda función!
        let sql = `INSERT INTO comment (user_id, association_id, comment_text, rating) VALUES (${user_id}, ${association_id}, '${comment_text}', '${rating}')`;
        let sql2 = `SELECT comment_text, name_association, rating FROM comment, association, user WHERE comment.user_id = ${user_id} and  comment.association_id = association.association_id and comment.user_id = user.user_id `;;

        connection.query(sql, (error, result) => {
            error && res.status(400).json({ error });
            // Envía la información de la lista de comentarios nueva para actualizar la lista
            connection.query(sql2, (error, result2) => {
                res.status(200).json(result2);
            });
        });
    };

    //Hace la secuencia insert para guardar definitivamente la dirección de la imagen del perrito con el usuario asociado. Si se hiciese una página oficial, con presupuesto, seguramente no guardaríamos la referencia con la url sino que haríamos que se descargase y se guardara en el back, pero este método es suficiente para el alcance de nuestra web (y no hay presupuesto para un back con esas funciones)
    savePuzzle = (req, res) => {
        const user_id = req.params.user_id;
        const { puzzle } = req.body;

        let sql = `INSERT INTO puzzle (user_id, puzzle_img) VALUES (${user_id}, '${puzzle}')`;
        connection.query(sql, (error, result) => {
            error && res.status(400).json({ error });
        })
    }

    //con esta función, nos traemos los puzzles resueltos a la página de usuario.
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
