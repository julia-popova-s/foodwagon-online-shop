import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import { setUser } from '../../../store/reducers/user'
import { AuthRegForm } from './AuthRegForm'
import style from './login.module.scss'

export function Login() {
  const auth = getAuth()
  const { pathname } = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.accessToken,
          }),
        )
        navigate('/')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className={style.login}>
      <AuthRegForm handleClick={handleLogin} title={'Log in'} />
    </div>
  )
}
