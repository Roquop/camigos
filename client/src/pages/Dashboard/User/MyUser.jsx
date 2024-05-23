import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import "./myUser.scss";
import { CamigosContext } from "../../../context/CamigosContext";
import { ruta } from "../../../helpers/backOrigin/rutaBack";
//En esta página la mayoría ya lo hemos visto todo lo que se hace en ella en las páginas precedentes
let initialAssociation = {
  name_association: "",
  country: "",
  province: "",
  description: "",
  url: "",
};
export const MyUser = () => {
  const [comments, setComments] = useState([]);
  const { user } = useContext(CamigosContext);
  const [association, setAssociation] = useState(initialAssociation);
  const [associationFile, setAssociationFile] = useState();
  const [message, setMessage] = useState("");
  const [puzzlesArray, setPuzzlesArray] = useState([]);

  //window.open permite permite abrir la dirección indicada y el _blank nos sirve para página nueva. en imagen está guardada la dirección url de la imagen a la que clicamos.
  const openImage = (imagen) => {
    window.open(imagen, "_blank");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAssociation({ ...association, [name]: value });
  };

  //handle file guardará la imagen para poder crear la asociación
  const handleFile = (e) => {
    console.log(e);
    setAssociationFile(e.target.files);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const inputs = Array.from(document.querySelectorAll("input"));
      const index = inputs.indexOf(e.target);
      inputs[index + 1].focus();
    }
  };

  //preventDefault evita que se actualice la página, lo cual sería un problema trabajando con React en una página subida a producción, y newFormData nos permite adjuntar la imagen que hayamos guardado, en nuestro caso en la variable associationFile, en el objeto FormData(), que crea el objeto que se adjuntará al form y luego pondremos con .append
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (
      association.name_association === "" ||
      association.country === "" ||
      association.province === "" ||
      association.description === "" ||
      association.url === ""
    ) {
      setMessage("Debes rellenar todos los campos");
    } else {
      const newFormData = new FormData();
      if (associationFile) {
        for (let file of associationFile) {
          newFormData.append("file", file);
        }
      }
//Aquí hacemos que a la data del formulario se adjunte también la información de la asociación
      newFormData.append("newAssociation", JSON.stringify(association));

      e.preventDefault();
      axios
        .post(
          `${ruta}/association/createAssociation/${user.user_id}`,
          newFormData
        )
        .then((res) => {
          setMessage(`¡Se creó la asociación ${association.name_association}!`);
          setAssociation(initialAssociation);
          e.preventDefault();
        })
        .catch((err) => console.log(err));
    }
    e.preventDefault();
  };

  //hacemos un get con los comentarios y los puzzles del usuario para pintarlos luego.
  useEffect(() => {
    axios
      .get(`${ruta}/users/getAllComments/${user.user_id}`)
      .then((res) => {
        setComments(res.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${ruta}/users/getAllPuzzles/${user.user_id}`)
      .then((res) => {
        setPuzzlesArray(res.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //Y en el html, de nuevo, nada nuevo! tan solo hacemos un mapeo de los puzzles, y de los comentarios para pintarlos en la página, y hacemos los inputs para poder crear una nueva asociación de manera sencilla.
  return (
    <Container>
      <Row className="division_perfil">
        <Col className="userProfile">
          {/* <h1>Bienvenido {user.name}</h1> */}
          <div>
            <p>Nombre</p>
          </div>
          <div>
            <p className="tipo_caja">{user.name}</p>
          </div>
          <div>
            <p>E-mail</p>
            <p className="tipo_caja">{user.email}</p>
          </div>
          <div>
            <p>Apellidos</p>
            <p className="tipo_caja">{user.lastname}</p>
          </div>
        </Col>
        <Col className="columna_comentarios">
          <p>Últimos Comentarios</p>
          <div className="comentarios">
            {comments == "" && <p>Aún no has hecho ningún comentario</p>}
            {comments &&
              comments.map((elem) => {
                return (
                  <div>
                    <p>
                      En {elem.name_association} comentaste: {elem.comment_text}
                    </p>
                    <p>
                      Tu puntuación para {elem.name_association}:{" "}
                      {[...Array(elem.rating)].map((star) => {
                        return (
                          <span key={elem.association_id} className="star on">
                            &#9733;
                          </span>
                        );
                      })}
                    </p>
                  </div>
                );
              })}
          </div>
        </Col>
      </Row>
      {user.type == 2 && (
        <Row>
          <Col id="crear_asociacion">
            <h3>Crear asociación</h3>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Nombre *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nombre"
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  name="name_association"
                  value={association.name_association}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicExtension">
                <Form.Label>País *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="país"
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  name="country"
                  value={association.country}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicExtension">
                <Form.Label>Província *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="província"
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  name="province"
                  value={association.province}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicExtension">
                <Form.Label>Descripción *</Form.Label>
                <Form.Control
                  type="textarea"
                  placeholder="Descripción"
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  name="description"
                  value={association.description}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicExtension">
                <Form.Label>URL *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="www.url.com"
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  name="url"
                  value={association.url}
                />
              </Form.Group>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Imagen</Form.Label>
                <Form.Control type="file" onChange={handleFile} />
              </Form.Group>
            </Form>
            <Button
              variant="primary"
              type="submit"
              className="bio-btn-primary"
              onClick={handleFormSubmit}
            >
              Añadir
            </Button>
            <h3>{message}</h3>
          </Col>
        </Row>
      )}
      {puzzlesArray.length != 0 && (
        <div>
          <Row className="puzzles_resueltos">
            <Col>
              <h3>Puzzles Resueltos</h3>
            </Col>
          </Row>
          <div className="carousel-container">
            {puzzlesArray.map((puzzle, index) => (
              <div className="carousel-item" key={index}>
                <img
                  src={puzzle.puzzle_img}
                  alt={`Puzzle ${index}`}
                  onClick={() => {
                    openImage(puzzle.puzzle_img);
                  }}
                  className="carousel-image"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </Container>
  );
};
