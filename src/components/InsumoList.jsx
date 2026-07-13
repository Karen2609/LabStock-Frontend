// components/InsumoList.jsx
import React from "react"
import InsumoItem from "./InsumoItem" // Importamos el componente que muestra cada insumo

// Componente que recibe props desde App:
// insumos → lista de objetos insumo
// actualizar → función que actualiza un insumo
// eliminar → función que elimina un insumo
function InsumoList({ insumos, eliminar, actualizar }) {
  return (
    <div className="lista">
      {insumos.map((insumo) => (
        <InsumoItem
          key={insumo.id}
          insumo={insumo}
          eliminar={eliminar}
          actualizar={actualizar}
        />
      ))}
    </div>
  )
}

export default InsumoList
