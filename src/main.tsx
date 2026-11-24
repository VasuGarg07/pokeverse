import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { OverlayScrollbars } from 'overlayscrollbars'
import 'overlayscrollbars/overlayscrollbars.css'
import './index.css'
import './lib/press'
import './lib/linkTooltip'
import App from './App.tsx'

OverlayScrollbars(document.body, {
  overflow: { x: 'hidden' },
  scrollbars: { theme: 'os-theme-pokeverse', autoHide: 'scroll' },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
