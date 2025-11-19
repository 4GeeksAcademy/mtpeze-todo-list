import { useState } from "react";
import "../../styles/auth.css";

export default function Login(props) {
  const [name, setName] = useState("");

  const host = "https://playground.4geeks.com/todo";

  const apiRequest = async (endpoint, metodo, body = null) => {
    const uri = `${host}${endpoint}`;
    const options = {
      method: metodo,
      headers: {
        "Content-Type": "application/json",
      },
      body: body && JSON.stringify(body),
    };

    const response = await fetch(uri, options);

    if (!response.ok) {
      console.log("Error:", response.status, response.statusText);
      return;
    }

    return await response.json();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name.trim() === "") {
      alert("Por favor ingresa tu nombre");
      return;
    }

    let userData = await apiRequest(`/users/${name}`, "GET");

    if (!userData) {
      userData = await apiRequest(`/users/${name}`, "POST");
    }

    if (userData) {
      props.setLoged(true);
      props.setUser(userData.name);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <input
              type="text"
              className="login-input"
              placeholder="Tu nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
