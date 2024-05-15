import React, { useState, useEffect } from "react";
import "./cuidadosParaTuPerro.scss";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";

export const CuidadosParaTuPerro = () => {
  const [consejo, setConsejo] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      let consejoIngles;
      try {
        const response = await axios.get("https://dog-api.kinduff.com/api/facts");
        consejoIngles = response.data.facts[0];
        const traduccionResponse = await axios.post(
          `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=es&dt=t&q=${encodeURIComponent(consejoIngles)}`
        );
        const traduccion = traduccionResponse.data[0][0][0];
        setConsejo(traduccion);
      } catch (error) {
        console.log("Hemos sido víctimas de nuestro propio éxito, la página ha alcanzado su número máximo de traducciones por hoy. El hecho curioso en su idioma original es: ", error);setConsejo("No se pudo traducir el dato al español, el dato original es: " + consejoIngles)
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Container id="cuidados_para_tu_perro">
      <h1>Cuidados Para tu Perro</h1>
      <Row>
        <Col>
          <h2>El dato curioso del día</h2>
          {loading && <p>Cargando dato curioso...</p>}
          {consejo && <p>{consejo}</p>}
        </Col>
      </Row>
    </Container>
  );
};
