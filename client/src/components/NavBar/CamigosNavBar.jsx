import React, { useState } from "react";
//Por alguna razon no funciona si esta dentro de la carpeta
import "./style/camigosNavBar.scss";
import { Button, Container, Nav, Navbar, Row, Col } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";

export const CamigosNavBar = () => {
  const [showNavBar, setShowNavBar] = useState(false)
  return (
    <Navbar id="navbar">
      <Container>
        <Row>
          <Col className="nav_superior">
            <Navbar.Brand as={Link} to="/" className="logo_container" onClick={()=>setShowNavBar(!showNavBar)}>
              <img src="/camigos_logo.svg" />
            </Navbar.Brand>
            <h1 className="titulo_web">Familia Canina</h1>
          </Col>
          <a className="menu_movil" onClick={()=>setShowNavBar(!showNavBar)}>Menu</a>
          <Nav className={`nav_inferior ${showNavBar && "show_navbar"}`}>
            <Nav.Link as={Link} to="/registro" onClick={()=>setShowNavBar(!showNavBar)}>
              Registro
            </Nav.Link>
            <Nav.Link as={Link} to="/juego" onClick={()=>setShowNavBar(!showNavBar)}>
              Juego
            </Nav.Link>
            <Nav.Link as={Link} to="/cuidadosParaTuPerro" onClick={()=>setShowNavBar(!showNavBar)}>
              Cuidados Para Tu Perro
            </Nav.Link>
            <Nav.Link as={Link} to="/finalesFelices" onClick={()=>setShowNavBar(!showNavBar)}>
              Finales Felices
            </Nav.Link>
            <Nav.Link as={Link} to="/login" onClick={()=>setShowNavBar(!showNavBar)}>
              Iniciar Sesión
            </Nav.Link>
          </Nav>
        </Row>
      </Container>
    </Navbar>
  );
};