import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
//una librería externa para el juego y su css
import { JigsawPuzzle } from "react-jigsaw-puzzle";
import "react-jigsaw-puzzle/lib/jigsaw-puzzle.css";
import { Button, Container, Col } from "react-bootstrap";
import axios from "axios";
import { CamigosContext } from "../../../context/CamigosContext";
import { ruta } from "../../../helpers/backOrigin/rutaBack";
import "./juego.scss";

//Por fin, el juego!
export const Juego = () => {
  const { user, isLogged } = useContext(CamigosContext);
  const [puzzle, setPuzzle] = useState("");
  const [puzzleRows, setPuzzleRows] = useState(3);
  const [puzzleColumns, setPuzzleColumns] = useState(3);
  const [nuevoPuzzle, setNuevoPuzzle] = useState(false);
  const [verImagen, setVerImagen] = useState(false);
  const navigate = useNavigate();
  const [solved, setSolved] = useState(false);

  //Una función que cambiará la dificultad del juego y lo creará al llamarlo. dificultad será un valor numérico que nos permitirá establecer el número de filas y columnas según lo que seleccionemos.
  const handleDificultad = (dificultad) => {
    //Lo primero que hacemos es llamar a una API externa que nos traerá una imagen aleatoria que tiene que ver con perros, y la setearemos dentro de puzzle, y en puzzlerows y columns pondremos el número introducido en dificultad
    puzzle == "" &&
      axios
        .get("https://dog.ceo/api/breeds/image/random")
        .then((response) => {
          setPuzzle(response.data.message);
        })
        .catch((error) => console.log(error));

    setNuevoPuzzle(true);
    setPuzzleRows(dificultad);
    setPuzzleColumns(dificultad);
  };

  //Si se resuelve el puzzle, lanzamos una alerta y guardamos el puzzle
  useEffect(() => {
    solved &&
      alert(
        "¡Puzzle resuelto! ¡Enhorabuena! Baja para iniciar un puzzle nuevo."
      );
    isLogged && solved && savePuzzle();
  }, [solved]);

  //La función para guardar el puzzle, coge los datos dentro del mismo, del que extraeremos la URL, y lo envía al back para hacer una request a la base de datos.
  const savePuzzle = () => {
    const data = { puzzle };
    axios
      .post(`${ruta}/users/savePuzzle/${user.user_id}`, data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Container className="contenedor_puzzle">
      {!isLogged && (
        <Col>
          <p className="p_instrucciones">
            Si te creas un usuario, ¡podrás guardar los puzzles que resuelvas!
            ve ya a{" "}
            <a
              className="registro_enlace"
              onClick={() => navigate("/registro")}
            >
              Registro
            </a>
          </p>
        </Col>
      )}
      <Col className="cabecera_puzzle">
        <div className="instrucciones">
          <p>
            Arrastra las piezas del puzzle hasta que se encajen en la parte
            correcta del marco. Sabrás que está en la posición correcta porque
            ya no puedes arrastrar esa pieza. Lo más sencillo, como suele pasar,
            es empezar por las esquinas. ¡Diviértete!
          </p>
        </div>
        <div className="nuevo_puzzle">
          <h3>Elige la dificultad del Puzzle</h3>
          <div className="opciones">
            <Button onClick={() => handleDificultad(3)}>Fácil</Button>
            {/* Al hacer click, se envía el valor que hemos puesto dentro de los paréntesis. igual que enviamos el evento, podemos enviar un valor concreto. */}
            <Button className="medio" onClick={() => handleDificultad(6)}>
              Medio
            </Button>
            <Button className="dificil" onClick={() => handleDificultad(9)}>
              Difícil
            </Button>
            <Button className="legendario" onClick={() => handleDificultad(15)}>
              Legendario
            </Button>
          </div>
        </div>
      </Col>
      {nuevoPuzzle && (
        // Esto lo hemos hecho para ayudar al usuario, si pulsamos en ver imagen de referencia, se verá una imagen al lado o encima (según si es desktop o móvil), y sobretodo una imagen superpuesta que nos permitirá ver donde van las piezas de nuestro puzzle.
        <Col className="imagen_referencia">
          <button onClick={() => setVerImagen(!verImagen)}>
            Ver imagen de referencia
          </button>
          {verImagen && <img className="superpuesta" src={puzzle}></img>}
          {verImagen && <img className="cuadradito" src={puzzle}></img>}
        </Col>
      )}
      {/* El elemento propio de la libreria, donde yo he puesto className para poder darle más estilo, pero hay que especificar la imagen, columnas, filas, y tenemos una propiedad "onSolved" que nos deja decir que pasará al resolver el puzzle. En mi caso he seteado solved a true y he hecho que la función de guardar el puzzle necesite el cambio de estado de la misma */}
      {nuevoPuzzle && (
        <JigsawPuzzle
          className="puzzle_perros"
          imageSrc={`${puzzle}`}
          rows={puzzleRows}
          columns={puzzleColumns}
          onSolved={() => {
            setSolved(true);
          }}
        />
      )}
      {/* Como a lo mejor juega alguien que no está logueado, hacemos un poco de marketing avisándole de que si estuviera logueado podría haber guardado el puzzle */}
      {solved && (
        <Col className="puzzle_resuelto">
          {!isLogged ? (
            <Col>
              <p className="p_instrucciones">
                Si te creas un usuario, ¡podrás guardar los puzzles que
                resuelvas! ve ya a{" "}
                <a
                  className="registro_enlace"
                  onClick={() => navigate("/registro")}
                >
                  Registro
                </a>
              </p>
            </Col>
          ) : (
            <Col>
              <h4>¡El puzzle resuelto ha sido guardado en tu perfil!</h4>
            </Col>
          )}
          <Button onClick={() => window.location.reload()}>Nuevo Puzzle</Button>
        </Col>
      )}
    </Container>
  );
};
