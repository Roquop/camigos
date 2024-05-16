import React, { useEffect, useState } from "react";
import "./home.scss";
import axios from "axios";
import { Card, Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { ruta } from "../../../helpers/backOrigin/rutaBack";
import { CamigosContext } from "../../../context/CamigosContext";

export const Home = () => {
  const [associationList, setAssociationList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${ruta}/association/getAllAssociations`)
      .then((res) => {
        setAssociationList(res.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Container className="main_container">
      <h1>Nuestras Asociaciones</h1>
      <div className="associations_container">
        {associationList &&
          associationList.map((elem) => {
            return (
              <Card
                className="asociacion"
                key={elem.association_id}
                onClick={() =>
                  navigate(`/OneAssociation/${elem.association_id}`)
                }
              >
                <h3>{elem.name_association}</h3>
                <img src={`./images/asociaciones/${elem.image}`}></img>
                <p>{elem.description}</p>
              </Card>
            );
          })}
      </div>
    </Container>
  );
};
