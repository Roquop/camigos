const connection = require("../config/db");

class associationControllers {
    getAllAssociations = (req, res) => {
        let sql = 'SELECT * from association WHERE deleted = 0';
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
        const { association_id } = req.params

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
    getAllComments = (req, res) => {
        const { association_id } = req.params
        let sql = `SELECT name, comment_text, rating FROM user, comment WHERE association_id = ${association_id} AND user.user_id = comment.user_id;`;
        connection.query(sql, (error, result) => {
            if (error) {
                res.status(400).json({ error });
            } else {
                console.log(result)
                res.status(200).json({ result });
            }
        });
    }

    // Crea un producto y trae la información de todos los productos 
    //localhost:4000/products/createProduct/user_id
    createAssociation = (req, res) => {
        const {
            name_association,
            country,
            province,
            description,
            url
        } = JSON.parse(req.body.newAssociation);

        let image = [""];
        if (req.files != undefined) {
            image = req.files[0].filename;
        }

        let sql = `INSERT INTO association (name_association, country, province, description, url, image) VALUES ('${name_association}', '${country}', '${province}', '${description}', '${url}', '${image}');`;

        let sqlAssociation = `SELECT * FROM association WHERE deleted = 0`;

        connection.query(sql, (error, result) => {
            if (error) res.status(400).json(error)
            else {
                res.status(200).json({ result })
            }
        });
    };

    // Guarda las imágenes de una asociación
    // saveAssociationImage = (images, association_id, next) => {
    //     let img = images;
    //     let sql = `UPDATE association set image = ${img.filename} where association_id = ${association_id}) `;

    //     connection.query(sql, (error, result) => {
    //         if (error) throw error;
    //     });
    // };

}

module.exports = new associationControllers();