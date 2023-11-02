import cn from 'classnames'
import { ReactSVG } from 'react-svg'

import style from './buttonLogin.module.scss'

export function ButtonLogin({ classNames, handleClick, title }) {
  return (
    <button className={cn(classNames, style.buttonLogin)} onClick={handleClick}>
      <ReactSVG
        className={style.buttonLogin__icon}
        src={`${process.env.PUBLIC_URL}/images/header/user.svg`}
        wrapper="span"
      />
      <span className={style.buttonLogin__name}>{title}</span>
    </button>
  )
}
