//Importamos la librería axios, que nos permite conectarnos con el back
import axios from "axios";
//Esta librería es para poder descodificar el token
import jwt_decode from "jwt-decode";
//Los hooks que ya hemos importado en las otras páginas, el context para llevar esta información a más sitios, useEffect para usar una función solo una vez por carga o por la condición que marquemos (sino, react renderiza constantemente, y useState que nos sirve para crear las variables)
import React, { createContext, useEffect, useState } from "react";
//vamos al helper que hemos creado que nos permite interactuar con el localstorage
import { getLocalStorageCamigos } from "../helpers/localStorage/localStorageCamigos";
//y ruta es el archivo que hemos creado que nos permite cambiar entre el back local y el subido a producción fácilmente.
import { ruta } from "../helpers/backOrigin/rutaBack";

export const CamigosContext = createContext();

export const CamigosProvider = (props) => {
  //user contiene los datos del usuario
  const [user, setUser] = useState();
  //islogged nos indica si estamos logueados o no (para enseñar unas u otras páginas)
  const [isLogged, setIsLogged] = useState(false);
  //el token que acompaña a la conexión
  const [token, setToken] = useState();

  useEffect(() => {
    // Recoge el token del usuario logeado del LocalStorage y pasa su valor al estado token
    const token = getLocalStorageCamigos();
    setToken(token);
    // Si hay algo dentro del localStorage y por ende un usuario está logueado, desencripta el token para
    // obtener el usuario y su id para hacer una llamada al back y recuperar sus datos de la BD
    if (getLocalStorageCamigos()) {
      //Descodicificamos el token y lo guardamos en user
      let user = jwt_decode(token).user;
      //llamamos a la bbdd y cogemos los datos de ese usuario ahora que tenemos su id descodificado
      axios
        .get(`${ruta}/users/getOneUser/${user.id}`)
        .then((res) => {
          // Seteamos el estado user con esa información
          setUser(res.data.resultUser[0]);
          setIsLogged(true);
        })
        //si hay un error, avisamos
        .catch((error) => console.log(error, "ERROR DEL CONTEXT"));
    }
    // En el array vemos que se vuelve a realizar toda esta operación cuando hay un cambio en el estado
    // isLogged
  }, [isLogged]);

  // Pasamos por props a través del context todos los estados con sus seteos para poder acceder a ellos
  // a través del useContext en cualquier contenedor de la página, para eso es usecontext!

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
