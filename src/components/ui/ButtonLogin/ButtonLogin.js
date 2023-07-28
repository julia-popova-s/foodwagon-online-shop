import cn from 'classnames'
import { ReactSVG } from 'react-svg'

import style from './buttonLogin.module.scss'

export function ButtonLogin({ classNames }) {
  return (
    <button className={cn(classNames, style.buttonLogin)}>
      <ReactSVG
        className={style.buttonLogin__icon}
        src={`${process.env.PUBLIC_URL}/images/header/user.svg`}
        wrapper="span"
      />
      <span className={style.buttonLogin__name}>Login</span>
    </button>
  )
}
