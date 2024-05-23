import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
//Lo nuevo en esta sección es useParams, que nos permite coger la información escrita en la barra de direcciones en el sitio que indiquemos después de "/", lo que nos permite ahorrar una llamada a la base de datos guardando el valor de la id, que es el que nos interesa.
import { useParams } from "react-router-dom";
import "./oneAssociation.scss";
import { ruta } from "../../../helpers/backOrigin/rutaBack";
import { CamigosContext } from "../../../context/CamigosContext";

export const OneAssociation = () => {
  const { user, isLogged } = useContext(CamigosContext);
  //De esta manera cogemos la información del parámetro de la barra de direcciones.
  const { association_id } = useParams();
  const [association, setAssociation] = useState([]);
  const [allComments, setAllComments] = useState([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(1);
  const [hover, setHover] = useState(0);
  const [reloadComments, setReloadComments] = useState(false);

  //La función para publicar un comentario. Que lo enviará al back y re-seteará la parte de insertar comentarios a 0 así como el valor con las estrellas.
  const publishComment = () => {
    const comment_text = comment;
    axios
      .post(`${ruta}/users/postComment/${user.user_id}/${association_id}`, {
        rating,
        comment_text,
      })
      .then((res) => {
        setRating(1);
        setHover(1);
        setComment("");
        setReloadComments(true);
      })
      .catch((error) => console.log(error));
  };

  //nos traemos la información de una asociación
  useEffect(() => {
    axios
      .get(`${ruta}/association/getOneAssociation/${association_id}`)
      .then((res) => {
        setAssociation(res.data.result[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //Nos traemos los comentarios de esa asociación, que se actualizarán si insertamos un comentario nuevo (por eso está puesto reloadComments entre los corchetes, para que se vuelva a lanzar la función si su estado cambia, y haremos que cambie al insertar un nuevo comentario.)
  useEffect(() => {
    axios
      .get(`${ruta}/association/getAllComments/${association_id}`)
      .then((res) => {
        setAllComments(res.data.result);
        setReloadComments(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [reloadComments]);

  //A menudo veremos que hay un condicional, como este {association != []}, porque si no, aunque en principio es algo que debería estar siempre, si por lo que fuese fallase podría tirarnos toda la página, y no queremos que pase.
  return (
    <Container>
      {association != [] && (
        <>
          <Row id="una_asociacion">
            <Col className="imagen_una_asociacion">
              <img
                className="img_fondo"
                src={`/images/asociaciones/${association.image}`}
              ></img>
              <img
                className="img_grande"
                src={`/images/asociaciones/${association.image}`}
              ></img>
            </Col>
            <Col className="informacion_asociacion">
              <h2>{association.name_association}</h2>
              <h4>
                {association.country}, {association.province}
              </h4>
              <a
                href={association.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {association.url}
              </a>
              <p>{association.description}</p>
            </Col>
          </Row>
          <Row>
            <h3 id="titulos_resenas">
              Reseñas sobre la asociación {association.name_association}
            </h3>
            <Col className="comentarios_asociacion">
              {allComments == "" && (
                <p>Aún no hay comentarios sobre esta asociación</p>
              )}

              {allComments &&
                //Mapeamos todos los comentarios, y a cada pasada también hacemos lo propio con las estrellas, lo que nos permite que se dibujen todos los comentarios de la asociación y su puntuación.
                allComments.map((elem) => {
                  return (
                    <div>
                      {[...Array(elem.rating)].map((star) => {
                        return (
                          <span key={elem.association_id} className="star on">
                            &#9733;
                          </span>
                        );
                      })}
                      <p>
                        {elem.name} comentó: {elem.comment_text}
                      </p>
                    </div>
                  );
                })}
            </Col>
            <Col className="deja_comentario">
              {/* Si estamos con un usuario, vemos la opción de dejar comentario */}
              {isLogged && (
                <>
                  <div className="comment mb-5">
                    <h3 className="text-center">¡Deja tu comentario!</h3>
                    <Form.Control
                      className="mb-3 textarea-product"
                      as="textarea"
                      rows="5"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                    <div className="d-flex justify-content-center gap-5">
                      <div className="star-rating">
                        {[...Array(5)].map((star, index) => {
                          index += 1;
                          return (
                            <button
                              type="button"
                              key={index}
                              className={`rating ${
                                index <= (hover || rating) ? "on" : "off"
                              }`}
                              // Al hacer hover en las estrellas con mouseenter y leave, hacemos que las estrellas se destaquen o no, pero solo se fijarán al hacer click.
                              onClick={() => setRating(index)}
                              onMouseEnter={() => setHover(index)}
                              onMouseLeave={() => setHover(rating)}
                            >
                              <span className="star">&#9733;</span>
                            </button>
                          );
                        })}
                      </div>
                      <Button
                        className="bio-btn-primary"
                        onClick={publishComment}
                      >
                        Publicar Comentario
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};
