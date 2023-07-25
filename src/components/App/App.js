import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'

import { getCoords } from '../../utils/getCurrentPosition'
import { Footer, Header } from '../elements'
import './styles/base.css'
import './styles/normalize.css'

function App() {
  const [geolocation, setGeolocation] = useState(null)

  useEffect(() => {
    getCoords().then(({ lat, long }) => setGeolocation([lat, long]))

    function disableContext(e) {
      const clickedEl = e == null ? e.srcElement.tagName : e.target.tagName
      if (clickedEl === 'IMG') {
        return false
      }
    }
    document.addEventListener('contextmenu', (e) => disableContext(e))
  }, [])

  return (
    <div className="app">
      <Header geolocation={geolocation} />
      <Outlet />
      <Footer />
    </div>
  )
}

export default App
