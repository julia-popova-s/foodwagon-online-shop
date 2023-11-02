import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-use'

import { setUser } from '../../../store/reducers/user'
import { AuthRegForm } from './AuthRegForm'
import style from './login.module.scss'

export function SignUp() {
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
      .catch(console.error)
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className={style.login}>
      <p>Sign Up</p>
      <AuthRegForm handleClick={handleRegister} title={'Register'} />
      <p>
        Or <Link to="/login">sign in</Link>
      </p>
    </div>
  )
}
