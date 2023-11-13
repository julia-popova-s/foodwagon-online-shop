import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

import { isAuthSelector } from '../../store/reducers/user'
import { Footer, Header } from '../elements'
import './styles/base.css'
import './styles/normalize.css'

export function App() {
  // const navigate = useNavigate()
  // const isAuth = useSelector(isAuthSelector)

  // useEffect(() => {
  //   if (!isAuth) {
  //     navigate('/login')
  //   }
  // }, [])

  return (
    <div className="app">
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}
