import cn from 'classnames'
import { ReactSVG } from 'react-svg'

import styles from './buttonFind.module.scss'

export function ButtonFind({ classNames, handleClick, icon, label }) {
  return (
    <button className={cn(styles.buttonFind, classNames)} onClick={handleClick}>
      {icon && icon === 'search' && (
        <ReactSVG
          className={styles.buttonFind__icon}
          src={`${process.env.PUBLIC_URL}/images/find-food/search-panel/search.svg`}
          wrapper="span"
        />
      )}
      <span>{label}</span>
    </button>
  )
}
