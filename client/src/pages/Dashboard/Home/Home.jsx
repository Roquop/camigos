import React, { useEffect, useState } from "react";
import "./home.scss";
import axios from "axios";
import { Button, Card, Container, Form, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ruta } from "../../../helpers/backOrigin/rutaBack";

export const Home = () => {
  const [associationList, setAssociationList] = useState([]);
  const [filteredAssociations, setFilteredAssociations] = useState([]);
  const [associationsLimit, setAssociationsLimit] = useState(4);
  const [provinceFilter, setProvinceFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${ruta}/association/getAllAssociations`)
      .then((res) => {
        setAssociationList(res.data.result);
        setFilteredAssociations(res.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const filterByProvince = (province) => {
    setProvinceFilter(province);
    if (province === "") {
      setFilteredAssociations(associationList);
    } else {
      setFilteredAssociations(
        associationList.filter((assoc) => assoc.province === province)
      );
    }
    setAssociationsLimit(4);
  };

  const searchAssociations = (term) => {
    setSearchTerm(term);
    setFilteredAssociations(
      associationList.filter((assoc) =>
        assoc.name_association.toLowerCase().includes(term.toLowerCase())
      )
    );
    setAssociationsLimit(4);
  };

  const sortByName = () => {
    setFilteredAssociations((prevAssociations) =>
      [...prevAssociations].sort((a, b) =>
        a.name_association.localeCompare(b.name_association)
      )
    );
  };

  return (
    <Container className="main_container">
      <Row className="bienvenida">
        <h1>Bienvenidos a Camigos</h1>
        <h3>Canes y Amigos</h3>
        <Col className="fondo_perro">
          <p>
            Descubre en nuestra web la asociación que podría presentarte al
            nuevo miembro de tu familia. Siéntete libre para navegar por todas
            las secciones de la página y conoce nuestros finales felices y los
            cuidados que necesita tu perro, o entretente matando el tiempo con
            uno de nuestros puzzles perrunos. Si aún no has creado una cuenta,
            aprovecha ahora ¡y disfruta de sus ventajas!
          </p>
        </Col>
      </Row>
      <Row>
        <h1>Nuestras Asociaciones</h1>
        <Col className="filtros filtro">
          <Form.Control
            as="select"
            value={provinceFilter}
            onChange={(e) => filterByProvince(e.target.value)}
          >
            <option value="">Filtrar por Provincia</option>
            <option value="Ibiza">Ibiza</option>
            <option value="Mallorca">Mallorca</option>
          </Form.Control>

          <Button
            className="filtro boton_filtro"
            onClick={() => filterByProvince("")}
          >
            Mostrar Todas
          </Button>
          <Button className="filtro boton_filtro" onClick={sortByName}>
            Ordenar por Nombre
          </Button>

          <Form.Control
            type="text"
            placeholder="Buscar asociaciones..."
            value={searchTerm}
            onChange={(e) => searchAssociations(e.target.value)}
            className="filtro buscar"
          />
        </Col>
        <Col>
          <div className="associations_container">
            {filteredAssociations &&
              filteredAssociations.slice(0, associationsLimit).map((elem) => {
                return (
                  <Card
                    className="asociacion"
                    key={elem.association_id}
                    onClick={() =>
                      navigate(`/OneAssociation/${elem.association_id}`)
                    }
                  >
                    <img
                      src={`./images/asociaciones/${elem.image}`}
                      alt={elem.name_association}
                    />
                    <div className="datos_asociacion">
                      <h3>{elem.name_association}</h3>
                      <p>{elem.description}</p>
                    </div>
                  </Card>
                );
              })}
          </div>
        </Col>
        {filteredAssociations.length > associationsLimit && (
          <Col className="boton_mas_col">
            <Button
              className="boton_mas"
              onClick={() => setAssociationsLimit(associationsLimit + 4)}
            >
              +
            </Button>
          </Col>
        )}
      </Row>
    </Container>
  );
};
