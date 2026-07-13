import { useState } from "react"
import { v4 as uuidv4 } from "uuid"

function InsumoForm({ agregarInsumo }) {
  const [nombre, setNombre] = useState("")
  const [cantidad, setCantidad] = useState("")
  const [tipo, setTipo] = useState("Reactivo")
  const [fechaIngreso, setFechaIngreso] = useState("")
  const [fechaVencimiento, setFechaVencimiento] = useState("")
  const [lote, setLote] = useState("")
  const [proveedor, setProveedor] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!nombre || !cantidad) return

    const nuevoInsumo = {
      id: uuidv4(),
      nombre,
      cantidad,
      tipo,
      fechaIngreso,
      fechaVencimiento,
      lote,
      proveedor
    }

    agregarInsumo(nuevoInsumo)

    // Limpiar campos
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
      <input placeholder="Nombre del insumo" value={nombre} onChange={(e) => setNombre(e.target.value)} />
      <input type="number" placeholder="Cantidad" value={cantidad} onChange={(e) => setCantidad(e.target.value)} min="0" />
      <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
        <option value="Reactivo">Reactivo</option>
        <option value="Equipo">Equipo</option>
        <option value="Material">Material</option>
      </select>
      <label>Fecha de ingreso</label>
      <input type="date" value={fechaIngreso} onChange={(e) => setFechaIngreso(e.target.value)} />
      <label>Fecha de vencimiento</label>
      <input type="date" value={fechaVencimiento} onChange={(e) => setFechaVencimiento(e.target.value)} />
      <input placeholder="Nº de lote" value={lote} onChange={(e) => setLote(e.target.value)} />
      <input placeholder="Proveedor" value={proveedor} onChange={(e) => setProveedor(e.target.value)} />
      <button type="submit">
        <i className="fas fa-plus-circle"></i> Agregar
      </button>
    </form>
  )
}

export default InsumoForm
