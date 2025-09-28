import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";

export default function Login() {
  const { login } = useContext(AppContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username.trim(), password);
      nav("/");
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>CollabNotes Lite</h1>
        <h2>Welcome Back</h2>
        <p>Enter your credentials to access your notes</p>
        {error && <div className="error">{error}</div>}
        <label>Username
          <input placeholder= "Enter your username" value={username} onChange={e=>setUsername(e.target.value)} />
        </label>
        <label>Password
          <input type="password" placeholder = "Enter your password" value={password} onChange={e=>setPassword(e.target.value)} />
        </label>
        <button className="btn" type="submit">Login</button>
        <p className="muted">Use any username & password</p>
      </form>
    </div>
  );
}
