import React, { useEffect, useState } from "react";
import axios from "axios";
import "./juego.scss";
import { PuzzlePiece } from "./PuzzlePiece";

export const Juego = () => {
  const [imageSrc, setImageSrc] = useState("");
  const [pieces, setPieces] = useState([]);
  const rows = 3;
  const cols = 3;

  useEffect(() => {
    axios
      .get("https://dog.ceo/api/breeds/image/random")
      .then((response) => {
        setImageSrc(response.data.message);
        createPuzzlePieces(response.data.message);
      })
      .catch((error) => console.log(error));
  }, []);

  const createPuzzlePieces = (imageSrc) => {
    const piecesArray = [];
    const pieceWidth = 100 / cols; 
    const pieceHeight = 100 / rows;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        piecesArray.push({
          id: `${row}-${col}`,
          row,
          col,
          width: pieceWidth,
          height: pieceHeight,
          backgroundImage: imageSrc,
          backgroundPosition: `${-col * pieceWidth}% ${-row * pieceHeight}%`,
          order: row * cols + col,
        });
      }
    }

    piecesArray.sort(() => Math.random() - 0.5);
    setPieces(piecesArray);
  };

  const handlePieceDrop = (id, newRow, newCol) => {
    const newPieces = pieces.map((piece) => {
      if (piece.id === id) {
        return { ...piece, row: newRow, col: newCol };
      }
      return piece;
    });
    setPieces(newPieces);
    if (checkWinCondition(newPieces)) {
      alert("¡Has ganado!");
    }
  };

  const checkWinCondition = (pieces) => {
    return pieces.every(
      (piece, index) => piece.id === `${Math.floor(index / cols)}-${index % cols}`
    );
  };

  return (
    <div className="puzzle-game">
      <div className="puzzle-board">
        {pieces.map((piece, index) => (
          <PuzzlePiece
            key={piece.id}
            piece={piece}
            onDrop={handlePieceDrop}
            index={index}
            cols={cols}
            rows={rows}
          />
        ))}
      </div>
    </div>
  );
};

