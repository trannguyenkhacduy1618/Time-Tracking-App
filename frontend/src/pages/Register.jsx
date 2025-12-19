import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

export default function Register() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await authService.register(username, password);
            alert("Register thành công! Vui lòng login.");
            navigate("/login");
        } catch (err) {
            setError(
                err.response?.data?.detail || "Register thất bại"
            );
        }
    };

    return (
        <div style={{ marginTop: 100, textAlign: "center" }}>
        <h2>Register</h2>

        <form onSubmit={handleSubmit}>
        <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        />
        <br /><br />

        <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        />
        <br /><br />

        <button type="submit">Register</button>
        </form>

        {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}
