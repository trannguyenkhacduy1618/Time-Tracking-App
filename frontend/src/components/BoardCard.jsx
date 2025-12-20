import React from "react";
import "../styles/board.css";

const BoardCard = ({ board, onSelect }) => {
    return (
        <div className="board-card" onClick={onSelect}>
        <h3>{board.name}</h3>
        <p>{board.description}</p>
        </div>
    );
};

export default BoardCard;
