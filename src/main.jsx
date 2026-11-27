import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { LangProvider } from './lang.jsx'
import './styles/tokens.css'
import './styles/global.css'
import './styles/components.css'
import './styles/guide.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LangProvider>
      <App />
    </LangProvider>
  </StrictMode>
)
