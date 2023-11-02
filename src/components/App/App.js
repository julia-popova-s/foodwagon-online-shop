import { useNavigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

import { useAuth } from '../../hooks/useAuth'
import { Footer, Header } from '../elements'
import './styles/base.css'
import './styles/normalize.css'

export function App() {
  const navigate = useNavigate()
  const { isAuth } = useAuth()

  if (!isAuth) {
    navigate('/login')
  }

  return (
    <div className="app">
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}
