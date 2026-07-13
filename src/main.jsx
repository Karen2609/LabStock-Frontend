// main.jsx
//Importa la librería React para poder usar JSX
import React from 'react'
// Importa ReactDOM para renderizar la aplicación en el DOM
import ReactDOM from 'react-dom/client'
// Importa el componente principal de la aplicación
import App from './App.jsx'
// Importa los estilos globales
import './index.css'

// Crea el root y renderiza la App en el elemento con id 'root'
ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)
