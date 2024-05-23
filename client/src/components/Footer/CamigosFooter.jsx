import React from "react";
import { Container, Row, Col } from "react-bootstrap";
//UseNavigate forma parte del react-router-dom, que usaremos para navegar entre nuestras pestañas.
import { useNavigate } from "react-router-dom";
import "./camigosFooter.scss";

//El componente para el footer, donde usamos columnas y filas  de Bootstraop para darle estructura, y las imágenes van directamente en el html.
export const CamigosFooter = () => {
  const navigate = useNavigate();
  return (
    <Container id="footer">
      <Row>
        <Col className="logos_container">
          <div className="footer_logo">
            <img
              onClick={() => navigate("/")}
              src="/images/logos_rrss/facebook.svg"
            />
          </div>
          <div className="footer_logo">
            <img
              onClick={() => navigate("/")}
              src="/images/logos_rrss/instagram.svg"
            />
          </div>
          <div className="footer_logo">
            <img
              onClick={() => navigate("/")}
              src="/images/logos_rrss/youTube.svg"
            />
          </div>
          <div className="footer_logo">
            <img
              onClick={() => navigate("/")}
              src="/images/logos_rrss/twitter.svg"
            />
          </div>
        </Col>
        <Col className="disclaimer">
          <p>Creado por: Gabriel Roque Pérez Torres</p>
          <p>Familia Canina ©️ UOC-2024</p>
        </Col>
      </Row>
    </Container>
  );
};
