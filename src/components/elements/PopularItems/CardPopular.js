import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { ButtonsForCounter } from '../../ui/ButtonsForCounter';
import cn from 'classnames'
// import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { Link, useLocation } from 'react-router-dom'

import { getPartOfString } from '../../../utils/getPartOfString'
import { ButtonFind } from '../../ui/ButtonFind'
// import { useState } from 'react';
import { ButtonsWithCounter } from '../../ui/ButtonsWithCounter'
import { Discount } from '../../ui/Discount/Discount'
import styles from './cardPopular.module.scss'

export function CardPopular(props) {
  const {
    classNames,
    discount,
    handleAddProduct,
    handleInputCount,
    handleRemoveProduct,
    id,
    image,
    price,
    quantity = 0,
    restaurantId,
    restaurantName,
    title,
  } = props

  const data = { discount, id, image, price, restaurantId, restaurantName, title }

  const handlePlusProduct = () => {
    handleAddProduct(data)
  }

  const handleMinusProduct = () => {
    handleRemoveProduct(data)
  }

  const handleInputQuantity = (count) => handleInputCount({ count, id, restaurantId })

  return (
    <div className={cn(styles.card, classNames)}>
      <div className={styles.card__up}>
        <Link className={styles.card__upLink} to={`/restaurant/${restaurantId}/product/${id}`}>
          <img
            alt="food"
            className={styles.card__image}
            src={`${process.env.PUBLIC_URL}${image}`}
          />
          {discount > 0 && <Discount discount={discount} view={'smallLabel'} />}
        </Link>
      </div>
      {/* <FontAwesomeIcon icon={faHeart} size="xl" /> */}
      <Link className={styles.card__name} to={`/restaurant/${restaurantId}/product/${id}`}>
        {getPartOfString(title, 47)}
      </Link>
      <Link
        // to={`/restaurant/${restaurantId}`}
        className={styles.card__location}
      >
        <FontAwesomeIcon className={styles.card__locationIcon} icon={faLocationDot} />
        {getPartOfString(restaurantName, 24)}
      </Link>
      <p className={styles.card__price}>&#36; {price}</p>
      {quantity ? (
        <ButtonsWithCounter
          handleInputQuantity={handleInputQuantity}
          handleMinusProduct={handleMinusProduct}
          handlePlusProduct={handlePlusProduct}
          quantity={quantity}
        />
      ) : (
        <ButtonFind
          classNames={styles.card__btn}
          handleClick={handlePlusProduct}
          label="Order Now"
        />
      )}
    </div>
  )
}
