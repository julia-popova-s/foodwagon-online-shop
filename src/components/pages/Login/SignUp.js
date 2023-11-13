import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import { setUser } from '../../../store/reducers/user'
import { signupSchema } from '../../../utils/utilsForForm/fieldValidationSchemes'
import { AuthRegForm } from './AuthRegForm'
import style from './login.module.scss'

export function SignUp() {
  const [errorMessage, setErrorMessage] = useState('')

  const auth = getAuth()
  const { pathname } = useLocation()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleRegister = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
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
          case 'auth/email-already-in-use':
            setErrorMessage('This email address is already in use by another account.')
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
        handleClick={handleRegister}
        schema={signupSchema}
        title={'Sign Up'}
      />
    </div>
  )
}
