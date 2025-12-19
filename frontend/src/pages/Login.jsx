import { useState } from "react";
import "../styles/login.css";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await authService.login(username, password);
            navigate("/");
        } catch (err) {
            alert("Login failed");
        }
    };

    return (
        <div className="login-container">
        <div className="login-card">
        <h1 className="login-title">Time Tracker</h1>

        <form className="login-form" onSubmit={handleSubmit}>
        <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        />

        <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        />

        <button type="submit">Login</button>
        </form>
        </div>
        </div>
    );
}
