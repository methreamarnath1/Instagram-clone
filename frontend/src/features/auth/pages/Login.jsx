import React from "react";
import "../style/form.scss";
import { Link } from "react-router";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", {
        username,
        password,
      },{
        withCredentials: true
      });
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <main>
      <div className="form_container">
        <h1>Login</h1>
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
              setPassword(e.target.value);
            }}
            type="password"
            name="password"
            placeholder="Enter your password"
            value={password}
          />
          <button type="submit"   >
            Login
          </button>
        </form>
        <p>
          Don't have an account?{" "}
          <Link className="toggleAuthForm" to="/register">
            Register
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
