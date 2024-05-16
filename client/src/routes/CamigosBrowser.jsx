import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../pages/Dashboard/Home/Home";
import { Container, Row, Col } from "react-bootstrap";
import { CamigosNavBar } from "../components/NavBar/CamigosNavBar";
import { Juego } from "../pages/Dashboard/Juego/Juego";
import { Login } from "../pages/Auth/Login";
import { CamigosFooter } from "../components/Footer/CamigosFooter";
import { FinalesFelices } from "../pages/Dashboard/Finales_felices/FinalesFelices";
import { Registro } from "../pages/Auth/Registro";
import { CuidadosParaTuPerro } from "../pages/Dashboard/Cuidados_para_tu_perro/CuidadosParaTuPerro";
import "../App.scss";
import { OneAssociation } from "../pages/Dashboard/Asociacion/OneAssociation";

export const CamigosBrowser = () => {
  return (
    <Container>
      <BrowserRouter>
        <Row>
          <Col>
            <CamigosNavBar />
          </Col>
        </Row>
        <Row id="row_principal">
          <Col id="columna_principal">
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/juego" element={<Juego />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route
                path="/finalesFelices"
                element={<FinalesFelices />}
              ></Route>
              <Route path="/registro" element={<Registro />}></Route>
              <Route
                path="/cuidadosParaTuPerro"
                element={<CuidadosParaTuPerro />}
              ></Route>
              <Route
                path="/OneAssociation/:association_id"
                element={<OneAssociation />}
              ></Route>
            </Routes>
          </Col>
        </Row>
        <Row>
          <Col>
            <CamigosFooter />
          </Col>
        </Row>
      </BrowserRouter>
    </Container>
  );
};
