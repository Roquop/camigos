import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "./oneAssociation.scss";
import { ruta } from "../../../helpers/backOrigin/rutaBack";

export const OneAssociation = () => {
  const { association_id } = useParams();
  const [association, setAssociation] = useState([]);
  const [allComments, setAllComments] = useState([]);

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
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(allComments == "");
  return (
    <Container>
      {association != [] && (
        <>
          <Row id="una_asociacion">
            <Col className="imagen_una_asociacion">
              <img src={`/images/asociaciones/${association.image}`}></img>
            </Col>
            <Col className="informacion_asociacion">
              <h2>{association.name_association}</h2>
              <h4>
                {association.country}, {association.province}
              </h4>
              <p>{association.url}</p>
              <p>{association.description}</p>
            </Col>
          </Row>
          <Row>
            <h3>Reseñas sobre la asociación {association.name_association}</h3>
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
                    <p>{elem.name} comentó: {elem.comment_text}</p>
                    </div>
                  );
                })}
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};
