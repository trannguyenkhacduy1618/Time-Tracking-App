import { useState } from "react";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ username, password });
        // TODO: call API /auth/login-json
    };

    return (
        <div style={{ maxWidth: 400, margin: "100px auto" }}>
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
        <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        />

        <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
        </form>
        </div>
    );
}
