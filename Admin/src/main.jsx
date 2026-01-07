import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'  // ← Change this line
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>  {/* ← Change this line */}
      <App />
    </HashRouter> {/* ← Change this line */}
  </React.StrictMode>,
)