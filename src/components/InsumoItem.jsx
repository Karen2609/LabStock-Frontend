import React, { useState } from "react"

function InsumoItem({
  insumo,
  actualizar,
  eliminar,
  soloLectura = false
}) {
  const [editando, setEditando] = useState(false)

  const [formulario, setFormulario] = useState({
    nombre: insumo.nombre,
    cantidad: insumo.cantidad,
    tipo: insumo.tipo,
    fechaIngreso: insumo.fechaIngreso,
    fechaVencimiento: insumo.fechaVencimiento,
    lote: insumo.lote,
    proveedor: insumo.proveedor
  })

  const vencimiento = new Date(insumo.fechaVencimiento)
  const hoy = new Date()
  const diasRestantes =
    (vencimiento - hoy) / (1000 * 60 * 60 * 24)

  const vencido = diasRestantes < 0
  const porVencer =
    diasRestantes >= 0 && diasRestantes <= 7

  let clase = "item"

  if (vencido) clase += " vencido"
  else if (porVencer) clase += " por-vencer"

  const guardarCambios = () => {
    actualizar({ ...insumo, ...formulario })
    setEditando(false)
  }

  return (
    <div className={clase}>
      {editando ? (
        <>
          <input
            value={formulario.nombre}
            onChange={(e) =>
              setFormulario({
                ...formulario,
                nombre: e.target.value
              })
            }
          />

          <input
            type="number"
            value={formulario.cantidad}
            onChange={(e) =>
              setFormulario({
                ...formulario,
                cantidad: e.target.value
              })
            }
          />

          <select
            value={formulario.tipo}
            onChange={(e) =>
              setFormulario({
                ...formulario,
                tipo: e.target.value
              })
            }
          >
            <option value="Reactivo">Reactivo</option>
            <option value="Equipo">Equipo</option>
            <option value="Material">Material</option>
          </select>

          <label>Fecha de ingreso</label>

          <input
            type="date"
            value={formulario.fechaIngreso}
            onChange={(e) =>
              setFormulario({
                ...formulario,
                fechaIngreso: e.target.value
              })
            }
          />

          <label>Fecha de vencimiento</label>

          <input
            type="date"
            value={formulario.fechaVencimiento}
            onChange={(e) =>
              setFormulario({
                ...formulario,
                fechaVencimiento: e.target.value
              })
            }
          />

          <input
            placeholder="Lote"
            value={formulario.lote}
            onChange={(e) =>
              setFormulario({
                ...formulario,
                lote: e.target.value
              })
            }
          />

          <input
            placeholder="Proveedor"
            value={formulario.proveedor}
            onChange={(e) =>
              setFormulario({
                ...formulario,
                proveedor: e.target.value
              })
            }
          />

          <button onClick={guardarCambios}>
            Guardar
          </button>

          <button onClick={() => setEditando(false)}>
            Cancelar
          </button>
        </>
      ) : (
        <>
          <h3>{insumo.nombre}</h3>

          <p>
            <strong>Cantidad:</strong> {insumo.cantidad}
          </p>

          <p>
            <strong>Tipo:</strong> {insumo.tipo}
          </p>

          <p>
            <strong>Fecha de ingreso:</strong>{" "}
            {insumo.fechaIngreso}
          </p>

          <p>
            <strong>Fecha de vencimiento:</strong>{" "}
            {insumo.fechaVencimiento}
          </p>

          <p>
            <strong>Nº de lote:</strong> {insumo.lote}
          </p>

          <p>
            <strong>Proveedor:</strong> {insumo.proveedor}
          </p>

          {!soloLectura && (
            <>
              <button onClick={() => setEditando(true)}>
                Editar
              </button>

              <button
                onClick={() => eliminar(insumo.id)}
              >
                Eliminar
              </button>
            </>
          )}
        </>
      )}
    </div>
  )
}

export default InsumoItem