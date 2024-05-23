const connection = require("../config/db");
//Volvemos a requerir la conexión con la base de datos
class associationControllers {
    //En este controlador nos traemos todas las asociaciones que no estén borradas, para la página principal.
    getAllAssociations = (req, res) => {
        let sql = 'SELECT * from association WHERE deleted = 0';
        connection.query(sql, (error, result) => {
            if (error) {
                res.status(400).json({ error });
            } else {
                res.status(200).json({ result });
            }
        });
    };
    //En este, la query selecccionará una asociación concreta, gracias al req.params podremos conseguir el id que estará escrito en la barra de direcciones y que nos servirá para filtrar en la query
    getOneAssociation = (req, res) => {
        const { association_id } = req.params

        let sql = `SELECT * from association WHERE association_id = ${association_id}`;
        connection.query(sql, (error, result) => {
            if (error) {
                res.status(400).json({ error });
            } else {
                res.status(200).json({ result });
            }
        });
    }
    //Aquí nos traemos todos los comentarios que pertenecen a una asociación de la misma forma
    getAllComments = (req, res) => {
        const { association_id } = req.params
        let sql = `SELECT name, comment_text, rating FROM user, comment WHERE association_id = ${association_id} AND user.user_id = comment.user_id;`;
        connection.query(sql, (error, result) => {
            if (error) {
                res.status(400).json({ error });
            } else {
                res.status(200).json({ result });
            }
        });
    }

    //Aquí creamos una asociación. En este caso, destructuramos con la información pasada como objeto en la función de submit, que hará que se guarden las propiedades que coinciden con el nombre que se define aqui (country, province...) y lo parseamos para guardarlo como datos trabajables en texto.
    createAssociation = (req, res) => {
        const {
            name_association,
            country,
            province,
            description,
            url
        } = JSON.parse(req.body.newAssociation);

        let image = [""];
        //La imagen viene del req.files, porque se creó con la función que hemos visto antes de newFormData y hay que recuperarla de esta manera.
        if (req.files != undefined) {
            //en este caso, solo nos interesa quedarnos con el nombre, porque la imagen ya se habrá guardado en la carpeta correspondiente, en la base de datos no guardamos realmente la imagen sino la referencia a la misma.
            image = req.files[0].filename;
        }
        //En este caso, usamos una secuencia insert, que requiere que le pasemos todos los datos que pongamos entre paréntesis en primer lugar.
        let sql = `INSERT INTO association (name_association, country, province, description, url, image) VALUES ('${name_association}', '${country}', '${province}', '${description}', '${url}', '${image}');`;
        //Había creado una segunda conexión con la base de datos para traerme las asociaciones resultantes, pero al final no lo vi necesario al crearse desde la página de admin en vez de desde la lista principal (me pareció más lógico)
        let sqlAssociation = `SELECT * FROM association WHERE deleted = 0`;

        connection.query(sql, (error, result) => {
            if (error) res.status(400).json(error)
            else {
                res.status(200).json({ result })
            }
        });
    };

    // Guarda las imágenes de una asociación. Al principio iba a hacer que cada asociación pudiese tener más de una imagen, pero igual, al final no lo utilicé, pero si lo uso en un futuro, ya tengo preparada la lógica a medias (me faltaría un mapeo para incluir todas las imágenes)
    // saveAssociationImage = (images, association_id, next) => {
    //     let img = images;
    //     let sql = `UPDATE association set image = ${img.filename} where association_id = ${association_id}) `;

    //     connection.query(sql, (error, result) => {
    //         if (error) throw error;
    //     });
    // };

}

module.exports = new associationControllers();