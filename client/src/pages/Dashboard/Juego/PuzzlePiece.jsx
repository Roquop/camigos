import React from "react";
import "./juego.scss";

export const PuzzlePiece = ({ piece, onDrop, index, cols, rows }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData("pieceId", piece.id);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const pieceId = e.dataTransfer.getData("pieceId");
    const dropX = e.nativeEvent.offsetX;
    const dropY = e.nativeEvent.offsetY;
    const newRow = Math.floor(dropY / (e.target.offsetHeight / rows));
    const newCol = Math.floor(dropX / (e.target.offsetWidth / cols));
    onDrop(pieceId, newRow, newCol);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const pieceStyle = {
    width: `${piece.width}%`,
    height: `${piece.height}%`,
    backgroundImage: `url(${piece.backgroundImage})`,
    backgroundPosition: piece.backgroundPosition,
    position: "absolute",
    top: `${piece.row * piece.height}%`,
    left: `${piece.col * piece.width}%`,
    border: "1px solid #000",
    boxSizing: "border-box",
    cursor: "move",
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      style={pieceStyle}
    ></div>
  );
};

