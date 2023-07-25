import cn from 'classnames'
import { ReactSVG } from 'react-svg'

import styles from './buttonOrder.module.scss'

export function ButtonOrder({ classNames, name, onClick }) {
  return (
    <button className={cn(styles.buttonOrder, classNames)} onClick={onClick}>
      {name}
      <ReactSVG
        className={styles.buttonOrder__icon}
        src={`${process.env.PUBLIC_URL}/images/cards-big/btn.svg`}
        wrapper="span"
      />
    </button>
  )
}
