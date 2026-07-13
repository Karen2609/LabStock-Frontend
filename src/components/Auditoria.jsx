import { useEffect, useState } from "react"
import axios from "axios"

function Auditoria({ onVolver }) {
  const [eventos, setEventos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const cargarEventos = async () => {
      try {
        const respuesta = await axios.get("/api/auditoria")
        setEventos(respuesta.data)
      } catch (error) {
        console.error("Error al cargar auditoría:", error)
        setError("No fue posible cargar los registros de auditoría")
      } finally {
        setCargando(false)
      }
    }

    cargarEventos()
  }, [])

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleString("es-CL")
  }

  return (
    <div className="auditoria-container">
      <div className="auditoria-cabecera">
        <div>
          <h2>📋 Auditoría del sistema</h2>
          <p>Registro de accesos y operaciones realizadas en LabStock.</p>
        </div>

        <button type="button" onClick={onVolver}>
          ← Volver al inventario
        </button>
      </div>

      {cargando && <p>Cargando auditoría...</p>}

      {error && <p className="login-error">{error}</p>}

      {!cargando && !error && eventos.length === 0 && (
        <p>No existen eventos registrados.</p>
      )}

      {!cargando && !error && eventos.length > 0 && (
        <div className="tabla-auditoria-contenedor">
          <table className="tabla-auditoria">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Usuario</th>
                <th>Rol</th>
                <th>Tipo</th>
                <th>Detalle</th>
              </tr>
            </thead>

            <tbody>
              {eventos.map((evento) => (
                <tr key={evento.id}>
                  <td>{formatearFecha(evento.fecha)}</td>
                  <td>{evento.usuario}</td>
                  <td>{evento.rol?.replaceAll("_", " ")}</td>
                  <td>{evento.tipo?.replaceAll("_", " ")}</td>
                  <td>{evento.detalle}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Auditoria