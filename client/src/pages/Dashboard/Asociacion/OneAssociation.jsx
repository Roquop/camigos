import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import "./oneAssociation.scss";
import { ruta } from "../../../helpers/backOrigin/rutaBack";
import { CamigosContext } from "../../../context/CamigosContext";

export const OneAssociation = () => {
  const { user, isLogged } = useContext(CamigosContext);
  const { association_id } = useParams();
  const [association, setAssociation] = useState([]);
  const [allComments, setAllComments] = useState([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(1);
  const [hover, setHover] = useState(0);
  const [reloadComments, setReloadComments] = useState(false)
  const navigate = useNavigate();

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
        setReloadComments(true)
      })
      .catch((error) => console.log(error));
  };

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

  return (
    <Container>
      {association != [] && (
        <>
          <Row id="una_asociacion">
            <Col className="imagen_una_asociacion">
              <img className="img_fondo" src={`/images/asociaciones/${association.image}`}></img>
              <img className="img_grande" src={`/images/asociaciones/${association.image}`}></img>
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
