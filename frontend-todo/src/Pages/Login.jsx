import "../Pages/Login.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export default function Login() {
  const navigate = useNavigate();

  const [value, setValue] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setValue(preValue => ({
      ...preValue,
      [name]: value
    }));
  }

  async function handleSubmission(event) {
    event.preventDefault();
    setError("");

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(value)
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }

      localStorage.setItem("token", data.token);
      alert("Login successful");
      navigate("/todos");
    } catch (err) {
      setError("Something went wrong");
    }
  }

  useEffect(() => {
    console.log(value);
  }, [value]);

  return (
    <div className="main">
      <div className="auth-container">
        <h2 className="auth-title">Login</h2>

        <form onSubmit={handleSubmission} className="auth-form">
          <input
            onChange={handleChange}
            name="email"
            value={value.email}
            type="email"
            placeholder="Email"
            required
          />

          <input
            onChange={handleChange}
            name="password"
            value={value.password}
            type="password"
            placeholder="Password"
            required
          />

          <button type="submit">Login</button>
        </form>

        <p className="auth-footer">
          Don’t have an account?
          <a href="/signup"> Sign up</a>
        </p>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}
