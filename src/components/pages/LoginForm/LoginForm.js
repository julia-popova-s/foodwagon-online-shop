import { useEffect } from 'react'
import { useLocation } from 'react-use'

import styles from './loginForm.module.scss'

export function LoginForm() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className={styles.loginForm}>
      <div className="container">Login</div>
    </div>
  )
}
