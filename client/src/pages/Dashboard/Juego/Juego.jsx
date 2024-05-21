import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { JigsawPuzzle } from "react-jigsaw-puzzle";
import "react-jigsaw-puzzle/lib/jigsaw-puzzle.css";
import { Button, Container, Col } from "react-bootstrap";
import axios from "axios";
import { CamigosContext } from "../../../context/CamigosContext";

import "./juego.scss";
export const Juego = () => {
  const { user, isLogged } = useContext(CamigosContext);
  const [puzzle, setPuzzle] = useState("");
  const [puzzleRows, setPuzzleRows] = useState(3);
  const [puzzleColumns, setPuzzleColumns] = useState(3);
  const [nuevoPuzzle, setNuevoPuzzle] = useState(false);
  const [verImagen, setVerImagen] = useState(false);
  const navigate = useNavigate();

  const handleDificultad = (dificultad) => {
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

  useEffect(() => {}, []);

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
            Arrastra las piezas del puzzle hasta que se encaje en la parte
            correcta del marco. Sabrás que está en la posición correcta porque
            ya no puedes arrastrar esa pieza. Lo más sencillo, como suele pasar,
            es empezar por las esquinas. ¡Diviértete!
          </p>
        </div>
        <div className="nuevo_puzzle">
          <h3>Nuevo Puzzle</h3>
          <div className="opciones">
            <Button onClick={() => handleDificultad(3)}>Fácil</Button>
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
        <Col className="imagen_referencia">
          <button onClick={() => setVerImagen(!verImagen)}>
            Ver imagen de referencia
          </button>
          {verImagen && <img className="superpuesta" src={puzzle}></img>}
          {verImagen && <img className="cuadradito" src={puzzle}></img>}
        </Col>
      )}
      {nuevoPuzzle && (
        <JigsawPuzzle
          className="puzzle_perros"
          imageSrc={`${puzzle}`}
          rows={puzzleRows}
          columns={puzzleColumns}
          onSolved={() => alert("Solved!")}
        />
      )}
    </Container>
  );
};
