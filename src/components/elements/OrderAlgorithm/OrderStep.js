import { ReactSVG } from 'react-svg'

import styles from './orderStep.module.scss'

export function OrderStep({ description, imageSrc, label }) {
  return (
    <div className={styles.orderStep}>
      <ReactSVG
        className={styles.orderStep__icon}
        src={`${process.env.PUBLIC_URL}${imageSrc}`}
        wrapper="div"
      />
      <p className={styles.orderStep__label}>{label}</p>
      <p className={styles.orderStep__descr}>{description}</p>
    </div>
  )
}
