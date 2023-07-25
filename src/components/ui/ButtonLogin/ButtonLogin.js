import cn from 'classnames'
import { ReactSVG } from 'react-svg'

import styles from './buttonLogin.module.scss'

export function ButtonLogin({ classNames }) {
  return (
    <button className={cn(classNames, styles.buttonLogin)}>
      <ReactSVG
        className={styles.buttonLogin__icon}
        src={`${process.env.PUBLIC_URL}/images/header/user.svg`}
        wrapper="span"
      />
      <span className={styles.buttonLogin__name}>Login</span>
    </button>
  )
}
