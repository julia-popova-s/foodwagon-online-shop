import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-use'

import { setUser } from '../../../store/reducers'
import { AuthRegForm } from './AuthRegForm'
import style from './login.module.scss'

export function Login() {
  const auth = getAuth()
  const { pathname } = useLocation()
  const dispatch = useDispatch()

  const handleLogin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        // console.log(user)
      })
      .catch(console.error)
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className={style.login}>
      <p>Login</p>
      <AuthRegForm handleClick={handleLogin} title={'Sign in'} />
      <p>
        Or <Link to="/register">register</Link>
      </p>
    </div>
  )
}
