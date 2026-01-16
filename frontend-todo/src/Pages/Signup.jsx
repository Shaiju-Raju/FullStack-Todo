import "../Pages/auth.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export default function Signup() {
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
      const res = await fetch(`${API_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(value)
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Signup failed");
        return;
      }

      
      alert("Signup successful");
      navigate("/");
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
        <h2 className="auth-title">Signup</h2>

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

          <button type="submit">Signup</button>
        </form>

        <p className="auth-footer">
          You already have an account?
          <a href="/"> Login</a>
        </p>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}
