import React, { useState, useEffect } from "react";
import "./cuidadosParaTuPerro.scss";
import { Button, Container, Nav, Navbar, Row, Col } from "react-bootstrap";
import axios from "axios";

export const CuidadosParaTuPerro = () => {
  const [consejo, setConsejo] = useState("");

  useEffect(() => {
    // Llamar a la API externa para obtener la frase aleatoria
    axios
      .get("https://dog-api.kinduff.com/api/facts")
      .then((response) => {
        const consejoIngles = response.data.facts[0];
        // Traducir la frase obtenida utilizando Google Translate en línea
        axios
          .post(
            "https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=es&dt=t&q=" +
              encodeURIComponent(consejoIngles)
          )
          .then((traduccion) => {
            setConsejo(traduccion.data[0][0][0]);
          })
          .catch((error) => {
            console.error("Error al traducir:", error); setConsejo("Ha habido un error y no se ha podido traducir del inglés el siguiente dato curioso: " + consejoIngles);
          });
      })
      .catch((error) => {
        console.error("Error al obtener la frase aleatoria:", error);
      });
  }, []);

  return (
    <Container id="cuidados_para_tu_perro">
      <h1>Cuidados Para Tu Perro</h1>
      <Row>
        <Col>
          <h2>El dato curioso del día</h2>
         {consejo != "" && (
           <p>{consejo}</p>
        )} 
        {consejo == "" && (
          <p>Cargando dato curioso...</p>
        )}
        
        </Col>
      </Row>
    </Container>
  );
};
