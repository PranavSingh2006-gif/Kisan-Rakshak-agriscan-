import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Ensure site is permanently in light mode
if (typeof document !== 'undefined') {
  document.documentElement.classList.remove('dark');
  document.body.classList.remove('dark');
  try { localStorage.removeItem('theme'); } catch (e) {}
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
