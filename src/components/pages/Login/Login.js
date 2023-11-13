import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import { setUser } from '../../../store/reducers/user'
import { loginSchema } from '../../../utils/utilsForForm/fieldValidationSchemes'
import { AuthRegForm } from './AuthRegForm'
import style from './login.module.scss'

export function Login() {
  const auth = getAuth()
  const { pathname } = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')

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
      .catch(({ code, message }) => {
        switch (code) {
          case 'auth/invalid-login-credentials':
            setErrorMessage('Invalid login details')
            break

          default:
            setErrorMessage(message)
            break
        }
      })
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className={style.login}>
      <AuthRegForm
        errorMessage={errorMessage}
        handleClick={handleLogin}
        schema={loginSchema}
        title={'Log in'}
      />
    </div>
  )
}
