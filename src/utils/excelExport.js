// utils/excelExport.js
import * as XLSX from "xlsx"

export const exportarInsumosAExcel = (insumos) => {
  const hoja = XLSX.utils.json_to_sheet(insumos)
  const libro = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(libro, hoja, "Insumos")

  // Descargar archivo
  XLSX.writeFile(libro, "ListadoInsumos.xlsx")
}
