import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "./oneAssociation.scss";

export const OneAssociation = () => {
  const { association_id } = useParams();
  const [association, setAssociation] = useState([]);
  useEffect(() => {
    axios
      .get
      // `http://localhost:4000/association/getOneAssociation/${association_id}`
      ()
      .get(
        `https://camigos-production.up.railway.app/association/getOneAssociation/${association_id}`
      )
      .then((res) => {
        setAssociation(res.data.result[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Container>
      {association && (
        <Row id="una_asociacion">
          <Col className="imagen_una_asociacion">
            <img src={`/images/asociaciones/${association.image}`}></img>
          </Col>
          <Col>
            <h2>{association.name_association}</h2>
            <h4>
              {association.country}, {association.province}
            </h4>
            <p>{association.url}</p>
            <p>{association.description}</p>
          </Col>
        </Row>
      )}
    </Container>
  );
};
