import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'

import { getCoords } from '../../utils/getCurrentPosition'
import { Footer, Header } from '../elements'
import './styles/base.css'
import './styles/normalize.css'

export function App() {
  const [geolocation, setGeolocation] = useState(null)

  useEffect(() => {
    getCoords().then(({ lat, long }) => setGeolocation([lat, long]))

    function disableContext(e) {
      const clickedEl = e == null ? e.srcElement.tagName : e.target.tagName
      if (clickedEl === 'IMG') {
        e.preventDefault()
        return false
      }
    }

    document.addEventListener('contextmenu', (e) => disableContext(e))

    return document.addEventListener('contextmenu', (e) => disableContext(e))
  }, [])

  return (
    <div className="app">
      {/* <Header geolocation={geolocation} /> */}
      <Outlet />
      {/* <Footer /> */}
    </div>
  )
}
