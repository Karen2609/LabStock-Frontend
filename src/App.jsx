import { useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import axios from "axios"

import "./App.css"
import InsumoItem from "./components/InsumoItem"
import Login from "./components/Login"
import { exportarInsumosAExcel } from "./utils/excelExport"

// Formulario para agregar insumos
function InsumoForm({ agregarInsumo }) {
  const [nombre, setNombre] = useState("")
  const [cantidad, setCantidad] = useState("")
  const [tipo, setTipo] = useState("Reactivo")
  const [fechaIngreso, setFechaIngreso] = useState("")
  const [fechaVencimiento, setFechaVencimiento] = useState("")
  const [lote, setLote] = useState("")
  const [proveedor, setProveedor] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!nombre || !cantidad) {
      return
    }

    const nuevoInsumo = {
      id: uuidv4(),
      nombre,
      cantidad: Number(cantidad),
      tipo,
      fechaIngreso,
      fechaVencimiento,
      lote,
      proveedor
    }

    const creadoCorrectamente = await agregarInsumo(nuevoInsumo)

    if (!creadoCorrectamente) {
      return
    }

    setNombre("")
    setCantidad("")
    setTipo("Reactivo")
    setFechaIngreso("")
    setFechaVencimiento("")
    setLote("")
    setProveedor("")
  }

  return (
    <form onSubmit={handleSubmit} className="formulario">
      <h2>Agregar nuevo insumo</h2>

      <input
        placeholder="Nombre del insumo"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <input
        type="number"
        placeholder="Cantidad"
        value={cantidad}
        onChange={(e) => setCantidad(e.target.value)}
        min="0"
      />

      <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
        <option value="Reactivo">Reactivo</option>
        <option value="Equipo">Equipo</option>
        <option value="Material">Material</option>
      </select>

      <label>Fecha de ingreso</label>
      <input
        type="date"
        value={fechaIngreso}
        onChange={(e) => setFechaIngreso(e.target.value)}
      />

      <label>Fecha de vencimiento</label>
      <input
        type="date"
        value={fechaVencimiento}
        onChange={(e) => setFechaVencimiento(e.target.value)}
      />

      <input
        placeholder="Nº de lote"
        value={lote}
        onChange={(e) => setLote(e.target.value)}
      />

      <input
        placeholder="Proveedor"
        value={proveedor}
        onChange={(e) => setProveedor(e.target.value)}
      />

      <button type="submit">Agregar</button>
    </form>
  )
}

function App() {
  const [usuario, setUsuario] = useState(() => {
    try {
      const usuarioGuardado = localStorage.getItem("usuarioLabStock")
      return usuarioGuardado ? JSON.parse(usuarioGuardado) : null
    } catch {
      return null
    }
  })

  const [insumos, setInsumos] = useState([])
  const [busqueda, setBusqueda] = useState("")
  const [cargandoInsumos, setCargandoInsumos] = useState(false)

  const puedeModificar =
    usuario?.rol === "administrador" ||
    usuario?.rol === "tecnologo_medico"

  useEffect(() => {
    if (!usuario) {
      setInsumos([])
      return
    }

    const cargarInsumos = async () => {
      setCargandoInsumos(true)

      try {
        const respuesta = await axios.get("/api/insumos")
        setInsumos(respuesta.data)
      } catch (error) {
        console.error("Error al cargar los insumos:", error)
        alert("No se pudieron cargar los insumos")
      } finally {
        setCargandoInsumos(false)
      }
    }

    cargarInsumos()
  }, [usuario])

  const iniciarSesion = (usuarioAutenticado) => {
    setUsuario(usuarioAutenticado)
  }

  const cerrarSesion = () => {
    localStorage.removeItem("usuarioLabStock")
    setUsuario(null)
    setInsumos([])
    setBusqueda("")
  }

  const agregarInsumo = async (nuevo) => {
    try {
      const respuesta = await axios.post("/api/insumos", nuevo)

      setInsumos((insumosActuales) => [
        ...insumosActuales,
        respuesta.data.insumo
      ])

      return true
    } catch (error) {
      console.error("Error al agregar el insumo:", error)
      alert("No se pudo guardar el insumo")
      return false
    }
  }

  const actualizarInsumo = async (actualizado) => {
    try {
      const respuesta = await axios.put(
        `/api/insumos/${actualizado.id}`,
        actualizado
      )

      setInsumos((insumosActuales) =>
        insumosActuales.map((insumo) =>
          insumo.id === actualizado.id
            ? respuesta.data.insumo
            : insumo
        )
      )
    } catch (error) {
      console.error("Error al actualizar el insumo:", error)
      alert("No se pudo actualizar el insumo")
    }
  }

  const eliminarInsumo = async (id) => {
    try {
      await axios.delete(`/api/insumos/${id}`)

      setInsumos((insumosActuales) =>
        insumosActuales.filter((insumo) => insumo.id !== id)
      )
    } catch (error) {
      console.error("Error al eliminar:", error)
      alert("No se pudo eliminar el insumo")
    }
  }

  const insumosFiltrados = insumos.filter((insumo) =>
    insumo.nombre.toLowerCase().includes(busqueda.toLowerCase())
  )

  if (!usuario) {
    return <Login onLogin={iniciarSesion} />
  }

  return (
    <div className="container">
      <div className="cabecera-usuario">
        <div>
          <h1>📦 LabStock - Inventario de Laboratorio</h1>
          <p>
            👤 <strong>{usuario.nombre}</strong>
          </p>
          <p>
            Rol: <strong>{usuario.rol.replaceAll("_", " ")}</strong>
          </p>
        </div>

        <button type="button" onClick={cerrarSesion}>
          🚪 Cerrar sesión
        </button>
      </div>

      <input
        type="text"
        placeholder="Buscar insumo por nombre..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="busqueda"
      />

      {puedeModificar && (
        <InsumoForm agregarInsumo={agregarInsumo} />
      )}

      <h2>Listado de Insumos</h2>

      <button
        type="button"
        onClick={() => exportarInsumosAExcel(insumosFiltrados)}
      >
        📤 Exportar a Excel
      </button>

      {cargandoInsumos ? (
        <p>Cargando insumos...</p>
      ) : insumosFiltrados.length === 0 ? (
        <p>No hay insumos para mostrar.</p>
      ) : (
        insumosFiltrados.map((insumo) => (
          <InsumoItem
            key={insumo.id}
            insumo={insumo}
            actualizar={puedeModificar ? actualizarInsumo : null}
            eliminar={puedeModificar ? eliminarInsumo : null}
            soloLectura={!puedeModificar}
          />
        ))
      )}
    </div>
  )
}

export default App