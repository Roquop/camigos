//Las importaciones que ya conocemos
import axios from "axios";
import React, { useContext, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CamigosContext } from "../../context/CamigosContext";
import { saveLocalStorageCamigos } from "../../helpers/localStorage/localStorageCamigos";
import "./login.scss";
import { ruta } from "../../helpers/backOrigin/rutaBack";

//Creamos una variable externa que nos servirá para darle un primer valor a los campos de email, contraseña y estado de login
const initialValue = {
  email: "",
  password: "",
  keepLogged: false,
};

export const Login = () => {
  //Variables que recuperamos del context
  const { setIsLogged, setUser } = useContext(CamigosContext);
  //En un primer momento, no está logueado
  const [loginUser, setLoginUser] = useState(initialValue);
  const navigate = useNavigate();
  //Creamos una variable que nos enseñará un mensaje cuando consigamos loguearnos con éxito
  const [mensaje, setMensaje] = useState();

  //Con esta función seteamos los valores de los input en el objeto temporal. la "e" recoge el evento (objeto) que se crea al introducir valores en el input, y dentro tiene propiedades a las que podemos acceder (con un console.log(e) podemos ver los campos disponibles) y destructuraremos lo que hay dentro de e.target en name y value, campos con el mismo nombre, y haremos que la propiedad con ese nombre (De ahi el [name] recoja el valor que hemos puesto.)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginUser({ ...loginUser, [name]: value });
  };

  //Comprobamos si ha seleccionado el input o no, con la propiedad propia dentro del e.target que se llama checked
  const handleChecked = (e) => {
    const { name, checked } = e.target;
    setLoginUser({ ...loginUser, [name]: checked });
  };

  //Esta es la función que gestionará lo que pase al hacer submit, así que la llamaremos en el click de ese botón
  const handleSubmit = () => {
    /*
     * Si falta algún dato nos quedamos donde estamos con mensaje de error,
     * si no, creamos el perfil y vamos a su página.
     */
    if (!loginUser.email || !loginUser.password) {
      setMensaje("Falta email o contraseña");
    } else {
      axios
        //Hacemos un post que enviará el objeto al back y se insertará en la bbdd (veremos como en el back)
        .post(`${ruta}/users/login`, loginUser)
        .then((res) => {
          //Si ha salido bien, guardamos el token en el localstorage, seteamos el user y el estado de login, y hacemos que navegue hacia la página de usuario con el id que hemos adquirido.
          saveLocalStorageCamigos(res.data.token);
          setUser(res.data.user);
          setIsLogged(true);
         // const type = res.data.user.type; Esta línea al principio iba a estar para que pasaran cosas según el tipo de usuario, pero al final como la página que se renderiza será la misma y cambiará solo según lo que pongamos en esa págnia (que no cambia mucho, no nos ha hecho falta.)
          const user_id = res.data.user.user_id;
          navigate(`/MyUser/${user_id}`);
        })
        .catch((err) => {
          //Si hay un error, nos lo traemos al mensaje y veremos también cosas en la consola para nosotros como devs.
          setMensaje(err.response.data);
          console.log(err, "error sql");
          console.log("ERROR DEL LOGIN");
        });
    }
  };

  /*
   * Hace que pases de un input a otro pulsando intro, para darle accesibilidad, haciendo que al hacer enter pase al siguiente.
   */
  const handleKeyDown = (e) => {
    //se crean inputs en un array con un selector de query, y se recupera su índice con la función propia, y focus es lo que hace que vaya aumentando cada vez el índice haciendo que pase al siguiente.
    if (e.key === "Enter") {
      const inputs = Array.from(document.querySelectorAll("input"));
      const index = inputs.indexOf(e.target);
      inputs[index + 1].focus();
    }
  };

  return (
    //el HTML que se renderizará, donde le daremos, igual que en el HTML vanilla, el tipo, nombre, valor y placeholder, y en este caso hacemos que al cambio se llame a la función handleChange que ya hemos explicado, y handleKeyDown identificará si es enter la tecla pulsada para pasar al siguiente input. En los value tenemos que poner lo que se recoge en el objeto que se escribe en la función (loginUser.x), ya que si no, no se reflejaría lo escrito con lo que guardamos.
    <Row className="formlogin">
      <Col className="disclaimer">
        <p>Introduce tus datos a continuación para iniciar sesión</p>
      </Col>
      <Col className="col_formulario">
        <Form className="formulario">
          <Form.Group className="mb-3">
            <h2 className={mensaje ? "alert alert-danger" : "none"}>
              {mensaje}
            </h2>
            <Form.Label>E-mail</Form.Label>
            <Form.Control
              className="input"
              type="email"
              name="email"
              value={loginUser.email}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="correo@correo.com"
            />
            <Form.Text className="text-muted">
              Nunca compartiremos tu correo con nadie más.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="mt-3">Contraseña</Form.Label>
            <Form.Control
              className="input"
              type="password"
              name="password"
              value={loginUser.password}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="contraseña123!"
            />
          </Form.Group>
          <Form.Group className="d-flex gap-2 mt-3 mb-3 mantener">
            <Form.Label className="text-muted">
              Mantener la sesión activa
            </Form.Label>
            {["checkbox"].map((type) => (
              <div key={`default-${type}`} className="d-flex">
                <Form.Check
                  type={type}
                  onChange={handleChecked}
                  name="keepLogged"
                  id={`default-${type}`}
                />
              </div>
            ))}
          </Form.Group>
          <div className="boton_iniciar_sesion">
            <Button
              className="bio-btn-primary mt-4"
              variant="primary"
              onClick={handleSubmit}
            >
              Iniciar Sesión
            </Button>
          </div>
        </Form>
      </Col>
    </Row>
  );
};
