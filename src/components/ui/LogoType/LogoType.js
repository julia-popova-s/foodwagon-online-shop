import cn from 'classnames'
import { ReactSVG } from 'react-svg'

import styles from './logoType.module.scss'

export function LogoType({ onClick }) {
  return (
    <div className={styles.logo} onClick={onClick}>
      <ReactSVG
        className={styles.logo__image}
        src={`${process.env.PUBLIC_URL}/images/header/logo.svg`}
        wrapper="span"
      />

      <div className={styles.logo__name}>food</div>
      <div className={cn(styles.logo__name, styles.logo__name_color)}>wagon</div>
    </div>
  )
}
