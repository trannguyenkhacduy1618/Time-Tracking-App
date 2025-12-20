import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/authService";
import "../styles/register.css";

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await authService.register({
                username,
                email,
                full_name: fullName,
                password,
            });

            alert("Đăng ký thành công, mời đăng nhập");
            navigate("/login");
        } catch (err) {
            console.error(err.response?.data || err);
            alert("Register thất bại");
        }
    };

    return (
        <div className="register-container">
        <div className="register-card">
        <h1>Create account</h1>

        <form onSubmit={handleSubmit}>
        <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        />

        <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        />

        <input
        type="text"
        placeholder="Full name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        required
        />

        <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        />

        <button type="submit">Register</button>
        </form>

        <p>
        Đã có tài khoản? <Link to="/login">Login</Link>
        </p>
        </div>
        </div>
    );
}
