import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import './assets/js/main.js'
import './assets/js/switcher.js'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
