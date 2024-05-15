import React, { useEffect, useState } from "react";
import "./home.scss";
import axios from "axios";
import { Container } from "react-bootstrap";

export const Home = () => {
  const [prueba, setPrueba] = useState("nada");
  useEffect(() => {
    axios
      // .get('http://localhost:4000/users/admin/prueba')
      .get('https://camigos-production.up.railway.app/users/admin/prueba')
      .then((res) => {
        setPrueba(res.data.result[0].name); 
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Container className="main_container">
      <h1>Home</h1>
      conexion con la base de datos: {prueba}
    </Container>
  );
};
