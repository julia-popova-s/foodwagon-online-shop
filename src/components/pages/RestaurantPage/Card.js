import classNames from 'classnames'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ReactSVG } from 'react-svg'

import { getPartOfString } from '../../../utils/getPartOfString'
import { ButtonFind } from '../../ui/ButtonFind'
import styles from './card.module.scss'

export function Card({
  discount,
  handleClick,
  id,
  image,
  ingredients,
  price,
  restaurantId,
  restaurantName,
  title,
}) {
  const [count, setCount] = useState(70)
  const [visible, setVisible] = useState(false)

  const handleVisibleText = () => {
    setCount(500)
    setVisible(true)
  }

  return (
    <div className={styles.card}>
      {/* <Link to={`restaurant/${restaurantId}/product/${id}`}> */}
      <div className={styles.card__up}>
        <img alt="food" className={styles.card__image} src={image} />
        {discount && discount ? (
          <div className={styles.card__discount}>
            {discount}
            <div className={styles.card__discount_size}>%</div>
            <div className={styles.card__discount_off}>off</div>
          </div>
        ) : null}
      </div>
      {/* </Link> */}

      <p className={styles.card__name}>{title}</p>

      <p className={styles.card__rest}>
        <ReactSVG src="/images/popular-items/map.svg" wrapper="span" />
        <span>{restaurantName}</span>
      </p>
      <p className={styles.card__price}>&#36; {price}</p>

      <ButtonFind classNames={styles.card__btn} handleClick={handleClick} name="Add To Cart" />
    </div>
  )
}
