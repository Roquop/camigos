import React from 'react'
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./CamigosNavBar.scss";

export const CamigosNavBar = () => {
  return (
<Navbar id="navbar">
<Container>
<Nav.Link as={Link} to="/">
    Home
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
<Nav.Link as={Link} to="/registro">
    Registro
</Nav.Link>
<Nav.Link as={Link} to="/login">
    Iniciar Sesión
</Nav.Link>
</Container>
</Navbar>  )
}
