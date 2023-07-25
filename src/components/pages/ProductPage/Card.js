import cn from 'classnames'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ReactSVG } from 'react-svg'

import { getPartOfString } from '../../../utils/getPartOfString'
import { ButtonFind } from '../../ui/ButtonFind'
import { ButtonsWithCounter } from '../../ui/ButtonsWithCounter'
import styles from './card.module.scss'

export function Card({
  discount,
  handleAddProduct,
  handleInputCount,
  handleRemoveProduct,
  id,
  image,
  ingredients,
  price,
  quantity,
  restaurantId,
  restaurantName,
  title,
}) {
  // const [count, setCount] = useState(200)
  // const [visible, setVisible] = useState(false)

  // const handleVisibleText = () => {
  //   setCount(500)
  //   setVisible(true)
  // }

  const handleMinusProduct = () => {
    const data = { discount, id, image, price, restaurantId, restaurantName, title }
    handleRemoveProduct(data)
  }

  const handleInputQuantity = (count) => handleInputCount({ count, id, price })

  const handlePlusProduct = () => {
    handleAddProduct({
      discount,
      id,
      image,
      price,
      restaurantId,
      restaurantName,
      title,
    })
  }
  return (
    <div className={styles.card}>
      <div className={styles.card__left}>
        <img alt={title} className={styles.card__image} src={`${process.env.PUBLIC_URL}${image}`} />
        {discount ? (
          <div className={styles.card__discount}>
            {discount}
            <div className={styles.card__discount_size}>%</div>
            <div className={styles.card__discount_off}>off</div>
          </div>
        ) : null}
      </div>
      <div className={styles.card__right}>
        <p className={styles.card__name}>{title}</p>
        <p className={styles.card__rest}>
          <ReactSVG
            className={styles.card__restIcon}
            src={`${process.env.PUBLIC_URL}/images/popular-items/map.svg`}
            wrapper="span"
          />
          <Link className={styles.card__restLink}>{restaurantName}</Link>
        </p>
        <div className={styles.card__prices}>
          <div
            className={cn(styles.card__price, {
              [styles.card__price_theme]: discount,
            })}
          >
            &#36; {price}
          </div>
          {discount ? (
            <div className={styles.card__price}>
              &#36; {(price - (price * discount) / 100).toFixed(2)}
            </div>
          ) : null}
        </div>
        <p className={styles.card__ingredients}>
          Ingredients: {getPartOfString(ingredients.join(', '), 215)}
        </p>
        <div className={styles.card__add}>
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
      </div>
    </div>
  )
}
