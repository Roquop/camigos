import axios from "axios";
import React, { useState } from "react";
import { Button, Col, Form, Row, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./registro.scss";
import { ruta } from "../../helpers/backOrigin/rutaBack";

let initialValue = {
  name: "",
  lastname: "",
  email: "",
  password: "",
  type: "",
};
//hecho por Roque
export const Registro = () => {
  const [user, setUser] = useState(initialValue);
  const navigate = useNavigate();
  const [messageError, setMessageError] = useState("");
  const [confirmation, setConfirmation] = useState();
  //Aplicamos los valores de los input al objeto temporal
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = () => {
    //Comprobamos que el email es algo@algo.algo y sino lanzamos el mensaje de error
    const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    if (!user.name || !user.email || !user.password) {
      setMessageError("Debes rellenar todos los campos");
    } else if (!isValidEmail.test(user.email)) {
      setMessageError(
        "Introduce el e-mail en un formato nombre@nombre.dominio"
      );
    } else {
      //Llamamos al controlador y registramos al usuario
      axios
        .post(`${ruta}/users/register`, user)
        .then((res) => {
          setMessageError("");
          setConfirmation(
            `Tu cuenta se ha registrado correctamente. ¡Inicia sesión para acceder a las ventajas de usuario! En breves momentos se te redirigirá a la página de inicio de sesión`
          );
          setTimeout(() => {
            navigate("/login");
          }, 10000);
        })
        .catch((err) => {
          console.log(err);
          if (err) {
            console.log(err);
            setMessageError(
              "El correo electrónico ya ha sido registrado previamente"
            );
          } else {
            setMessageError(err.response.data.error);
          }
        });
    }
  };

  /*
   * Hace que pases de un input a otro pulsando intro
   */
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const inputs = Array.from(document.querySelectorAll("input"));
      const index = inputs.indexOf(e.target);
      inputs[index + 1].focus();
    }
  };

  return (
    <Container fluid className={`register-user ${confirmation && "oscuro"}`}>
      <Row>
        <Col className={confirmation && "blurTodo"}>
          <div className="primeraCol">
            <div className="cpal">
              <Form className="formulario">
                <Form.Group className="mb-3">
                  <Form.Label className="input">Nombre *</Form.Label>
                  <Form.Control
                    className="label"
                    type="text"
                    value={user.name}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Nombre"
                    name="name"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Apellidos *</Form.Label>
                  <Form.Control
                    className="label"
                    type="text"
                    value={user.lastname}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Apellidos"
                    name="lastname"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>E-mail *</Form.Label>
                  <Form.Control
                    className="label"
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    placeholder="correo@correo.com"
                  />
                  <Form.Text className="text-muted">
                    Nunca compartiremos tu correo con nadie más.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Contraseña *</Form.Label>
                  <Form.Control
                    className="label"
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    placeholder="contraseña123!"
                  />
                </Form.Group>

                <p className="mensajeError">{messageError}</p>
                <Button
                  className="boton bio-btn-primary btn-fix mx-auto"
                  variant="primary"
                  onClick={handleSubmit}
                >
                  Crear Usuario
                </Button>
              </Form>
            </div>
          </div>
        </Col>
        {confirmation && (
          <Col xs={12} className="confirmacionCol">
            <h2 className="confirmacion">{confirmation}</h2>
          </Col>
        )}
      </Row>
    </Container>
  );
};
