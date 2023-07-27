import cn from 'classnames'
import { Link } from 'react-router-dom'

import { ButtonOrder } from '../../ui/ButtonOrder'
import styles from './cardBig.module.scss'

export function CardBig({ description, flippedСard, food, imageSrc, link, title }) {
  const flippedСardStyle = {
    imgBorder: styles.cardBig__img_border,
    imgRight: styles.cardBig__img_right,
    textBorder: styles.cardBig__description_border,
  }
  return (
    <div
      className={cn(styles.cardBig, {
        [flippedСardStyle.imgRight]: flippedСard,
      })}
    >
      <div className={styles.cardBig__image}>
        <img
          className={cn(styles.cardBig__img, {
            [flippedСardStyle.imgBorder]: flippedСard,
          })}
          alt={`${title}${food}`}
          src={`${process.env.PUBLIC_URL}${imageSrc}`}
        />
      </div>
      <div
        className={cn(styles.cardBig__description, {
          [flippedСardStyle.textBorder]: flippedСard,
        })}
      >
        <p className={styles.cardBig__title}>
          {title}
          <Link className={styles.cardBig__link} to={link}>
            {' '}
            {food}
          </Link>
        </p>
        <p className={styles.cardBig__text}>{description}</p>
        <Link to={link}>
          <ButtonOrder classNames={styles.cardBig__btn} name={'Proceed to order'} />
        </Link>
      </div>
    </div>
  )
}
