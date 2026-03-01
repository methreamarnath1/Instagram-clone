import React from "react";
import { Link } from "react-router";
import axios from "axios";
const Register = () => {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/register",
        {
          username,
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );
      console.log(res.data);
    } catch (err) {
      console.log(err);
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
