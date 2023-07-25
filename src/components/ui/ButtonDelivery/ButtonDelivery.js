import classNames from 'classnames'
import { ReactSVG } from 'react-svg'

import styles from './buttonDelivery.module.scss'

export function ButtonDelivery({ active, icon, label, onClickItem }) {
  return (
    <button
      className={classNames(styles.delivery, { [styles.btnActive]: active })}
      onClick={onClickItem}
    >
      {label === 'Delivery' ? (
        <ReactSVG
          className={styles.delivery___btnIcon}
          src={`${process.env.PUBLIC_URL}${icon}`}
          wrapper="span"
        />
      ) : (
        <ReactSVG
          className={styles.delivery___btnIcon}
          src={`${process.env.PUBLIC_URL}${icon}`}
          wrapper="span"
        />
      )}
      <span className={styles.delivery__btnName}>{label}</span>
    </button>
  )
}
