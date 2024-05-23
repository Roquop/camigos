import React, { useContext, useState } from "react";
//Por alguna razon no funciona si esta dentro de la carpeta, así que lo hemos puesto fuera.
import { Container, Nav, Navbar, Row, Col } from "react-bootstrap";
//Importamos elementos del react-router-dom para crear la navegación,
import { Link, useNavigate } from "react-router-dom";
//Importamos el context de camigos, que nos traerá la información del usuario y se conservará durante la navegación cuando sea necesario
import { CamigosContext } from "../../context/CamigosContext";
//Con esta llamada a js podremos hacer el logout
import { deleteLocalStorageCamigos } from "../../helpers/localStorage/localStorageCamigos";
import "./style/camigosNavBar.scss";

export const CamigosNavBar = () => {
  //la variable que enseñará o no la barra de navegación
  const [showNavBar, setShowNavBar] = useState(false);
  //Creamos la constante que nos permite usar la navegación
  const navigate = useNavigate();
  //Nos traemos los datos que nos interesan del context
  const { user, setUser, isLogged, setIsLogged } = useContext(CamigosContext);

  //Al hacer logout, eliminaremos el usuario, cambiaremos la variable que controla el estado de logueado a falso, borraremos el localStorage y volveremos a la página de inicio
  const handleLogout = () => {
    setUser("");
    setIsLogged(false);
    deleteLocalStorageCamigos();
    navigate("/");
  };
//Con los elementos navBar podemos navegar como si estuviéramos usando el Hook de navigate.
  return (
    <Navbar id="navbar">
      <Container>
        <Row>
          <Col className="nav_superior">
            <Navbar.Brand
              as={Link}
              to="/"
              className="logo_container"
              onClick={() => setShowNavBar(!showNavBar)}
            >
              <img src="/camigos_logo.svg" />
            </Navbar.Brand>
            <h1 className="titulo_web">Camigos</h1>
          </Col>
          <a className="menu_movil" onClick={() => setShowNavBar(!showNavBar)}>
            Menu
          </a>
          {/* Esto lo haremos varias veces en varias páginas, haremos que el nombre de clase sea dependiente de una variable, lo cual hará que se apliquen unos efectos u otros, en este caso que permitirán que se vea el menú de móvil o no */}
          <Nav className={`nav_inferior ${showNavBar && "show_navbar"}`}>
            {/* Aquí hacemos que según si estamos logueados o no, se renderice uno u otro element */}
            {isLogged == true ? (
              <Nav.Link
                as={Link}
                to={`/MyUser/${user.user_id}`}
                onClick={() => setShowNavBar(!showNavBar)}
              >
                Mi perfil
              </Nav.Link>
            ) : (
              <Nav.Link
                as={Link}
                to="/registro"
                onClick={() => setShowNavBar(!showNavBar)}
              >
                Registro
              </Nav.Link>
            )}
            <Nav.Link
              as={Link}
              to="/juego"
              onClick={() => setShowNavBar(!showNavBar)}
            >
              Juego
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/cuidadosParaTuPerro"
              onClick={() => setShowNavBar(!showNavBar)}
            >
              Cuidados Para Tu Perro
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/finalesFelices"
              onClick={() => setShowNavBar(!showNavBar)}
            >
              Finales Felices
            </Nav.Link>
            {isLogged == true ? (
              <Nav.Link
                as={Link}
                to="/"
                onClick={() => {
                  setShowNavBar(!showNavBar);
                  handleLogout();
                }}
              >
                Cerrar Sesión
              </Nav.Link>
            ) : (
              <Nav.Link
                as={Link}
                to="/login"
                onClick={() => setShowNavBar(!showNavBar)}
              >
                Iniciar Sesión
              </Nav.Link>
            )}
          </Nav>
        </Row>
      </Container>
    </Navbar>
  );
};
