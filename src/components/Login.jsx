import { useState } from "react"
import axios from "axios"

function Login({ onLogin }) {
  const [correo, setCorreo] = useState("")
  const [password, setPassword] = useState("")
  const [mensaje, setMensaje] = useState("")
  const [cargando, setCargando] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMensaje("")
    setCargando(true)

    try {
      const respuesta = await axios.post("/api/auth/login", {
        correo,
        password
      })

      const usuario = respuesta.data.usuario

      localStorage.setItem("usuarioLabStock", JSON.stringify(usuario))
      onLogin(usuario)
    } catch (error) {
      setMensaje(
        error.response?.data?.mensaje || "No fue posible iniciar sesión"
      )
    } finally {
      setCargando(false)
    }
  }

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleSubmit}>
        <h1>🧪 LabStock</h1>
        <p>Sistema de Gestión de Laboratorio Clínico</p>

        <label>Correo electrónico</label>
        <input
          type="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          placeholder="usuario@labstock.cl"
          required
        />

        <label>Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Ingrese su contraseña"
          required
        />

        {mensaje && <p className="login-error">{mensaje}</p>}

        <button type="submit" disabled={cargando}>
          {cargando ? "Ingresando..." : "Iniciar sesión"}
        </button>
      </form>
    </div>
  )
}

export default Login