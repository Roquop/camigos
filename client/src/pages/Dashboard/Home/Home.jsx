import React, { useEffect, useState } from "react";
import "./home.scss";
import axios from "axios";

export const Home = () => {
  const [prueba, setPrueba] = useState("nada");
  useEffect(() => {
    axios
      .get('https://camigos-production.up.railway.app/users/admin/prueba')
      .then((res) => {setPrueba(res.data.result[0].nombre)})
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <h1>Home</h1>
      conexion con la base de datos: {prueba}
    </>
  );
};
