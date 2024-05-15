import React from "react";
import { Button, Container, Nav, Navbar, Row, Col } from "react-bootstrap";
import "./camigosFooter.scss";

export const CamigosFooter = () => {
  return (
    <Container id="footer">
      <Row>
        <Col className="logos_container">
          <div className="footer_logo">
            <img src="/images/logos_rrss/facebook.svg" />
          </div>
          <div className="footer_logo">
            <img src="/images/logos_rrss/instagram.svg" />
          </div>
          <div className="footer_logo">
            <img src="/images/logos_rrss/youTube.svg" />
          </div>
          <div className="footer_logo">
            <img src="/images/logos_rrss/twitter.svg" />
          </div>
        </Col>
        <Col className="disclaimer">
          <p>
            Creado por: Gabriel Roque Pérez Torres
          </p>
          <p>
            Familia Canina ©️ UOC-2024
          </p>
        </Col>
      </Row>
    </Container>
  );
};
