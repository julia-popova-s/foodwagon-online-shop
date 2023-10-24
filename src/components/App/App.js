import { Outlet } from 'react-router-dom'

import { Footer, Header } from '../elements'
import './styles/base.css'
import './styles/normalize.css'

export function App() {
  return (
    <div className="app">
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}
