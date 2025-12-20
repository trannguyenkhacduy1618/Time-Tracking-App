import React, { useEffect, useState } from "react";
import "../styles/board.css";

const BoardModal = ({ open, onClose, onSubmit, initialData }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (initialData) {
            setName(initialData.name || "");
            setDescription(initialData.description || "");
        } else {
            setName("");
            setDescription("");
        }
    }, [initialData, open]);

    if (!open) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim()) {
            alert("Board name is required");
            return;
        }
        onSubmit({ name, description });
    };

    return (
        <div className="modal-overlay">
        <div className="modal-card">
        <h3>{initialData ? "Edit Board" : "Create Board"}</h3>

        <form onSubmit={handleSubmit}>
        <input
        type="text"
        placeholder="Board name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        />

        <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        />

        <div className="modal-actions">
        <button type="button" onClick={onClose}>
        Cancel
        </button>
        <button type="submit">
        {initialData ? "Update" : "Create"}
        </button>
        </div>
        </form>
        </div>
        </div>
    );
};

export default BoardModal;
