import React, { useEffect, useState } from "react";
import "./home.scss";
import axios from "axios";
import { Button, Card, Container, Form, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ruta } from "../../../helpers/backOrigin/rutaBack";

//la Home, a la que se llega con el icono.
export const Home = () => {
  const [associationList, setAssociationList] = useState([]);
  const [filteredAssociations, setFilteredAssociations] = useState([]);
  const [associationsLimit, setAssociationsLimit] = useState(4);
  const [provinceFilter, setProvinceFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  //Llamamos a todas las asociaciones y las seteamos en la lista y la lista para filtrar
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

  //El filtro según provincia, que hará que según lo que seleccionamos en province se setee en filteredAssociation si coincide con la provincia puesta en el nombre de la asociación. También seteamos el límite de asociaciones a 4 para reiniciar el número que se ve en pantalla.
  const filterByProvince = (province) => {
    //como antes, también seteamos el valor que irá dentro del {value} del input, para que corrresponda lo que hacemos en pantalla  con lo que se ve.
    setProvinceFilter(province);
    if (province === "") {
      setFilteredAssociations(associationList);
    } else {
      setFilteredAssociations(
        associationList.filter((assoc) => assoc.province == province)
      );
    }
    setAssociationsLimit(4);
  };
  //la función para la búsqueda de asociaciones. Guardamos el término, lo pasamos todo a mayúsculas y vemos si coincide parte de lo introducido en el input, y volvemos a setear a 4.
  const searchAssociations = (term) => {
    setSearchTerm(term);
    setFilteredAssociations(
      associationList.filter((assoc) =>
        assoc.name_association.toLowerCase().includes(term.toLowerCase())
      )
    );
    setAssociationsLimit(4);
  };

  //Simplemente para ordenarlas por nombre, utilizando el famoso sort de .js que aprendimos a usar en programación web, haciendo que compare los dos nombres y coja el primero y lo mande al principio del array.
  const sortByName = () => {
    setFilteredAssociations((prevAssociations) =>
      [...prevAssociations].sort((a, b) =>
        a.name_association.localeCompare(b.name_association)
      )
    );
  };
  console.log(filteredAssociations.length, "este");
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
            //En este caso, pasamos directamente el e.target.value, que recibiremos como term en la función, ya que no necesitamos nada más del evento.
            onChange={(e) => searchAssociations(e.target.value)}
            className="filtro buscar"
          />
        </Col>

        {filteredAssociations.length == 0 && (
          //Si no hay asociaciones aún, aparece la animación de cargando
          <Col className="loader_container">
            <p>Cargando las asociaciones...</p>
            <div className="loader"></div>
          </Col>
        )}

        <Col>
          <div className="associations_container">
            {filteredAssociations &&
              filteredAssociations.slice(0, associationsLimit).map((elem) => {
                return (
                  //mapeamos las asociaciones según el límite definido arriba, usando slice que cogerá solamente lo que haya entre el primer y el segundo número definido, el primero siendo 0 y el segundo siendo 4, el cual aumentará si pulsamos el botón "+"
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
                      <h4>{elem.province}</h4>
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
              //Hacemos que directamente setee a +4 sin necesidad de llamar a una función externa.
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
