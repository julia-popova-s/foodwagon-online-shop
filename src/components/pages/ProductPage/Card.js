import cn from 'classnames'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ReactSVG } from 'react-svg'

import { getPartOfString } from '../../../utils/getPartOfString'
import { ButtonFind } from '../../ui/ButtonFind'
import { ButtonsWithCounter } from '../../ui/ButtonsWithCounter'
import style from './card.module.scss'

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

  const handleInputQuantity = (count) =>
    handleInputCount({ quantity: count, id, price, restaurantId })

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
    <div className={style.card}>
      <div className={style.card__left}>
        <img alt={title} className={style.card__image} src={`${process.env.PUBLIC_URL}${image}`} />
        {discount ? (
          <div className={style.card__discount}>
            {discount}
            <div className={style.card__discount_size}>%</div>
            <div className={style.card__discount_off}>off</div>
          </div>
        ) : null}
      </div>
      <div className={style.card__right}>
        <p className={style.card__name}>{title}</p>
        <p className={style.card__rest}>
          <ReactSVG
            className={style.card__restIcon}
            src={`${process.env.PUBLIC_URL}/images/popular-items/map.svg`}
            wrapper="span"
          />
          <Link className={style.card__restLink}>{restaurantName}</Link>
        </p>
        <div className={style.card__prices}>
          <div
            className={cn(style.card__price, {
              [style.card__price_theme]: discount,
            })}
          >
            &#36; {price}
          </div>
          {discount ? (
            <div className={style.card__price}>
              &#36; {(price - (price * discount) / 100).toFixed(2)}
            </div>
          ) : null}
        </div>
        <p className={style.card__ingredients}>
          Ingredients: {getPartOfString(ingredients.join(', '), 215)}
        </p>
        <div className={style.card__add}>
          {quantity ? (
            <ButtonsWithCounter
              handleInputQuantity={handleInputQuantity}
              handleMinusProduct={handleMinusProduct}
              handlePlusProduct={handlePlusProduct}
              quantity={quantity}
            />
          ) : (
            <ButtonFind
              classNames={style.card__btn}
              handleClick={handlePlusProduct}
              label="Order Now"
            />
          )}
        </div>
      </div>
    </div>
  )
}
