import React, { useEffect, useState } from "react";
import "../styles/task.css";

const TaskForm = ({ onSubmit, initialData }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title || "");
            setDescription(initialData.description || "");
        } else {
            setTitle("");
            setDescription("");
        }
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) {
            alert("Task title is required");
            return;
        }
        onSubmit({ title, description });
    };

    return (
        <form className="task-form" onSubmit={handleSubmit}>
        <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
        placeholder="Task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Save Task</button>
        </form>
    );
};

export default TaskForm;
