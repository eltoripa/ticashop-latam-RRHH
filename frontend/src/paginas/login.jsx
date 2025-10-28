import { useState } from "react";

export default function Login({ onLogin }) {
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch("http://localhost:3001/usuarios/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: correo, password: contraseña }), // 👈 aquí el cambio
    });

    if (!res.ok) {
      alert("Credenciales incorrectas");
      return;
    }

    const usuario = await res.json();
    localStorage.setItem("usuario", JSON.stringify(usuario));
    onLogin(usuario);
  } catch (error) {
    console.error("Error en login:", error);
  }
};

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
          required
        />
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
}
