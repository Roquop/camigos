import React, { useEffect, useState } from "react";
import "./home.scss";
import axios from "axios";
import { Card, Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

export const Home = () => {
  const [associationList, setAssociationList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      // .get("http://localhost:4000/association/getAllAssociations")
      .get(
        "https://camigos-production.up.railway.app/association/getAllAssociations"
      )
      .then((res) => {
        setAssociationList(res.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(associationList);
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
