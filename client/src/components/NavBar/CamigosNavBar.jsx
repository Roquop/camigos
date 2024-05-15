import React from "react";
import { Button, Container, Nav, Navbar, Row, Col } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
// import "./camigosNavBar.scss";

export const CamigosNavBar = () => {
  return (
    <Navbar id="navbar">
      <Container>
        <Row>
          <Col className="nav_superior">
          <Navbar.Brand
            as={Link}
            to="/"
            className="logo_container"
          >
            <img src="/camigos_logo.svg" />
          </Navbar.Brand>
            <h1 className="titulo_web">
              Familia&nbsp;Canina
            </h1>
          </Col>
          <Col className="nav_inferior">
            <Nav.Link as={Link} to="/registro">
              Registro
            </Nav.Link>
            <Nav.Link as={Link} to="/juego">
              Juego
            </Nav.Link>
            <Nav.Link as={Link} to="/cuidadosParaTuPerro">
              Cuidados Para Tu Perro
            </Nav.Link>
            <Nav.Link as={Link} to="/finalesFelices">
              Finales Felices
            </Nav.Link>
            <Nav.Link as={Link} to="/login">
              Iniciar Sesión
            </Nav.Link>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};
