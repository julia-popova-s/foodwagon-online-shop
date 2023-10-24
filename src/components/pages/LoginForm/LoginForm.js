import { useEffect } from 'react'
import { useLocation } from 'react-use'

import style from './loginForm.module.scss'

export function LoginForm() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className={style.loginForm}>
      <div className="container">The Page is under construction...</div>
    </div>
  )
}
