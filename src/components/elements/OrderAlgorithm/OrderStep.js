import { ReactSVG } from 'react-svg'

import style from './orderStep.module.scss'

export function OrderStep({ description, imageSrc, label }) {
  return (
    <div className={style.orderStep}>
      <ReactSVG
        className={style.orderStep__icon}
        src={imageSrc}
        wrapper="div"
      />
      <p className={style.orderStep__label}>{label}</p>
      <p className={style.orderStep__descr}>{description}</p>
    </div>
  )
}
