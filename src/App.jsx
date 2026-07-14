import { useEffect } from 'react'
import './holdx.css'
import { initHoldx } from './holdxApp.js'

// HOLDX — React kabuğu.
// Uygulamanın tamamı holdxApp.js içinde çalışıyor. Burada sadece
// içine yazacağı <div id="app" class="hx"> alanını oluşturup,
// sayfa yüklenince initHoldx() ile başlatıyoruz.
export default function App() {
  useEffect(() => {
    initHoldx()
  }, [])

  return <div id="app" className="hx"></div>
}
