import React from "react";
import { Link, useNavigate } from "react-router";
import "../style/form.scss";
import { register } from "../services/auth.api.jsx";
const Register = () => {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await register(username, email, password);
      navigate("/");
    } catch (err) {
      console.error("Registration failed:", err);
      alert(err.response?.data?.message || "Registration failed");
    }
  }

  return (
    <main>
      <div className="form_container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <input
            onInput={(e) => {
              setUsername(e.target.value);
            }}
            type="text"
            name="username"
            placeholder="Enter your username"
            value={username}
          />
          <input
            onInput={(e) => {
              setEmail(e.target.value);
            }}
            type="text"
            name="email"
            value={email}
            placeholder="Enter your email"
          />
          <input
            onInput={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            name="password"
            placeholder="Enter your password"
            value={password}
          />
          <button type="submit">Register</button>
        </form>
        <p>
          Already have an account?{" "}
          <Link className="toggleAuthForm" to="/">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
