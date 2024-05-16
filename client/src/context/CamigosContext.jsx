import axios from "axios";
import jwt_decode from "jwt-decode";
import React, { createContext, useEffect, useState } from "react";
import { getLocalStorageCamigos } from "../helpers/localStorage/localStorageCamigos";
import { ruta } from "../helpers/backOrigin/rutaBack";

export const CamigosContext = createContext();

export const CamigosProvider = (props) => {
  const [user, setUser] = useState();
  const [isLogged, setIsLogged] = useState(false);
  const [token, setToken] = useState();

  useEffect(() => {
    // Recoge el token del usuario logeado del LocalStorage y pasa su valor al estado token
    const token = getLocalStorageCamigos();
    setToken(token);
    // Si hay algo dentro del localStorage y por ende un usuario está logeado desencripta el token para
    // obtener el usuario y su id para hacer una llamada al back y recuperar sus datos de la BD
    if (getLocalStorageCamigos()) {
      let user = jwt_decode(token).user;
      axios
        .get(`${ruta}/users/getOneUser/${user.id}`)
        .then((res) => {
          // Setea el estado user con esa información
          setUser(res.data.resultUser[0]);
          setIsLogged(true);
        })
        .catch((error) => console.log(error, "ERROR DEL CONTEXT"));
    }
    // En el array vemos que se vuelve a realizar toda esta operación cuando hay un cambio en el estado
    // isLogged
  }, [isLogged]);

  // Pasamos por props a través del context todos los estados con sus seteos para poder acceder a ellos
  // a través del useContext en cualquier contenedor de la página.

  return (
    <CamigosContext.Provider
      value={{
        user,
        setUser,
        isLogged,
        setIsLogged,
        token,
        setToken,
      }}
    >
      {props.children}
    </CamigosContext.Provider>
  );
};
