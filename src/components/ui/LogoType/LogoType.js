import cn from 'classnames'
import { ReactSVG } from 'react-svg'

import style from './logoType.module.scss'

export function LogoType({ onClick }) {
  return (
    <div className={style.logo} onClick={onClick}>
      <ReactSVG
        className={style.logo__image}
        src={process.env.PUBLIC_URL + '/images/header/logo.svg'}
        wrapper="span"
      />

      <div className={style.logo__name}>food</div>
      <div className={cn(style.logo__name, style.logo__name_color)}>
        <span className={style.logo__nameWa}>wa</span>
        <span className={style.logo__nameG}>G</span>
        <span className={style.logo__nameOn}>on</span>
      </div>
    </div>
  )
}
