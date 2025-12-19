import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import authService from "../services/authService";
import "../styles/register.css";

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
            setError(err.response?.data?.detail || "Register thất bại");
        }
    };

    return (
        <div className="register-container">
        <div className="register-card">
        <h2>Register</h2>

        <form onSubmit={handleSubmit}>
        <input
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

        <button type="submit">Create account</button>
        </form>

        {error && <div className="register-error">{error}</div>}

        <div className="register-footer">
        Đã có tài khoản? <Link to="/login">Login</Link>
        </div>
        </div>
        </div>
    );
}
