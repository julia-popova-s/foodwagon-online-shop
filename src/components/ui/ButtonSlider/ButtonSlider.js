import cn from 'classnames'
import { ReactSVG } from 'react-svg'

import styles from './buttonSlider.module.scss'

const arrows = {
  arrowLeftSrc: '/images/ui/arrow_left.svg',
  arrowRightSrc: '/images/ui/arrow_right.svg',
}

export function ButtonSlider({ classNames, onClick, type }) {
  return (
    <button className={cn(styles.buttonSlider, classNames)} onClick={onClick}>
      {type === 'left' ? (
        <ReactSVG
          className={styles.buttonSlider__arrow}
          src={`${process.env.PUBLIC_URL}${arrows.arrowLeftSrc}`}
        />
      ) : (
        <ReactSVG
          className={styles.buttonSlider__arrow}
          src={`${process.env.PUBLIC_URL}${arrows.arrowRightSrc}`}
        />
      )}
    </button>
  )
}
