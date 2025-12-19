import React from "react";
import "../styles/board.css";

const BoardCard = ({ board, onSelect }) => {
  return (
    <div className="board-card" onClick={() => onSelect(board.id)}>
      <div className="board-card-header">
        <h3 className="board-card-title">{board.name}</h3>
      </div>
      <p className="board-card-description">
        {board.description || "Không có mô tả"}
      </p>
      <div className="board-card-footer">
        <span>{board.tasks_count || 0} tasks</span>
      </div>
    </div>
  );
};

export default BoardCard;
