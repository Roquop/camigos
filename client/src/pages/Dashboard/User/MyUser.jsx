import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./myUser.scss";
import { CamigosContext } from "../../../context/CamigosContext";
import { ruta } from "../../../helpers/backOrigin/rutaBack";

export const MyUser = () => {
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(CamigosContext);

  useEffect(() => {
    axios
      .get(`${ruta}/users/getAllComments/${user.user_id}`)
      .then((res) => {
        // Setea el estado user con esa información
        setComments(res.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(comments);
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
      <Row></Row>
    </Container>
  );
};
