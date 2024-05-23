import React from "react";
import "./finalesFelices.scss";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
//Una página sencilla también. Si la aplicación se siguiese desarrollando, podría hacerse que los animales se trajeran con una base de datos por ejemplo, y que tuvieran un estado de "adoptado" o "en adopción" de manera que pasaran directamente a esta sección, por ejemplo. Hacemos que la parte de la asociación sea interactiva para poder ir a ver esa maravillosa asociación que consiguió que el perro fuera adoptado.
export const FinalesFelices = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Row>
        <h3>
          Conoce a algunos de los amigos que acabaron siendo adoptados gracias a
          una de las asociaciones listadas en la página:
        </h3>
      </Row>
      <Row>
        <Col className="col_card_perro">
          <div className="card_perro">
            <div className="img_container">
              <img src="./images/adopciones/adopt_1.jpg"></img>
            </div>
            <div className="informacion_perro">
              <p>Panchito</p>
              <a onClick={() => navigate("/OneAssociation/14")}>
                Refugio Can Patas
              </a>
              <p>Ibiza</p>
            </div>
          </div>
          <div className="card_perro">
            <div className="img_container">
              <img src="./images/adopciones/adopt_2.jpg"></img>
            </div>
            <div className="informacion_perro">
              <p>Cati</p>
              <a onClick={()=>navigate("/OneAssociation/1")}>Fundacion Pai</a>
              <p>Ibiza</p>
            </div>
          </div>
          <div className="card_perro">
            <div className="img_container">
              <img src="./images/adopciones/adopt_3.jpg"></img>
            </div>
            <div className="informacion_perro">
              <p>Grogui</p>
              <a onClick={()=>navigate("/OneAssociation/18")}>PPP Mallorca</a>
              <p>Mallorca</p>
            </div>
          </div>
          <div className="card_perro">
            <div className="img_container">
              <img src="./images/adopciones/adopt_4.jpg"></img>
            </div>
            <div className="informacion_perro">
              <p>Barriguito</p>
              <a onClick={()=>navigate("/OneAssociation/19")}>Adoptanos</a>
              <p>Mallorca</p>
            </div>
          </div>
          <div className="card_perro">
            <div className="img_container">
              <img src="./images/adopciones/adopt_5.jpg"></img>
            </div>
            <div className="informacion_perro">
              <p>Lara</p>
              <a onClick={()=>navigate("/OneAssociation/19")}>Adoptanos</a>
              <p>Mallorca</p>
            </div>
          </div>
          <div className="card_perro">
            <div className="img_container">
              <img src="./images/adopciones/adopt_6.jpg"></img>
            </div>
            <div className="informacion_perro">
              <p>Firulili</p>
              <a onClick={()=>navigate("/OneAssociation/18")}>PPP Mallorca</a>
              <p>Mallorca</p>
            </div>
          </div>
          <div className="card_perro">
            <div className="img_container">
              <img src="./images/adopciones/adopt_7.jpg"></img>
            </div>
            <div className="informacion_perro">
              <p>Lucky</p>
              <a onClick={()=>navigate("/OneAssociation/1")}>Fundacion Pai</a>
              <p>Ibiza</p>
            </div>
          </div>
          <div className="card_perro">
            <div className="img_container">
              <img src="./images/adopciones/adopt_8.jpg"></img>
            </div>
            <div className="informacion_perro">
              <p>Mochi</p>
              <a onClick={() => navigate("/OneAssociation/14")}>
                Refugio Can Patas
              </a>
              <p>Ibiza</p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
