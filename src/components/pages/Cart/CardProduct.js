import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import cn from 'classnames'
import { useEffect } from 'react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { Counter } from '../../ui/Counter'
import { Discount } from '../../ui/Discount/Discount'
import style from './cardProduct.module.scss'

export function CardProduct({
  amount,
  discount,
  handleAddProduct,
  handleDeleteProduct,
  handleInputCount,
  handleRemoveProduct,
  id,
  image,
  price,
  quantity,
  restaurantId,
  restaurantName,
  title,
}) {
  const [returnedProduct, setReturnedProduct] = useState(false)
  const handleProductExclusion = () => setReturnedProduct(true)

  const productInfo = {
    discount,
    id,
    image,
    price,
    restaurantId,
    restaurantName,
    title,
  }

  const handlePlusProduct = () => handleAddProduct(productInfo)

  const handleMinusProduct = () => handleDeleteProduct({ id, restaurantId })

  const handleReturnProduct = () => setReturnedProduct(false)

  const handleInputQuantity = (quantity) => {
    if (!quantity) {
      setReturnedProduct(true)
    } else handleInputCount({ id, price, quantity: quantity, restaurantId })
  }

  useEffect(() => {
    if (returnedProduct) {
      const timer = setTimeout(() => {
        handleRemoveProduct({ id, restaurantId })
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [returnedProduct])

  return (
    <div className={style.product}>
      <div className={style.product__image}>
        <Link className={style.product__imageLink} to={`/restaurant/${restaurantId}/product/${id}`}>
          <img
            alt={`${image}`}
            className={style.product__img}
            src={`${process.env.PUBLIC_URL}${image}`}
          />
          {discount > 0 && (
            <Discount
              classNames={style.product__discount}
              discount={discount}
              view={'smallLabel'}
            />
          )}
        </Link>
      </div>
      {!returnedProduct ? (
        <>
          <div className={cn(style.product__info, style.info)}>
            <p className={style.info__title}>
              <Link
                className={style.info__titleLink}
                to={`/restaurant/${restaurantId}/product/${id}`}
              >
                {title}
              </Link>
            </p>
            <p className={style.info__name}>
              <FontAwesomeIcon className={style.info__nameIcon} icon={faLocationDot} />
              <Link
                className={style.info__nameLink}
                to={`/restaurant/${restaurantId}/product/${id}`}
              >
                {restaurantName}
              </Link>
            </p>
            <div
              className={cn(style.info__price, {
                [style.info__price_theme]: discount,
              })}
            >
              &#36;{price}
            </div>
            {discount ? (
              <div className={style.info__price}>
                &#36;{(price - (price * discount) / 100).toFixed(2)}
              </div>
            ) : null}
          </div>

          <div className={cn(style.product__counter, style.counter)}>
            <Counter
              classNames={style.counter__btns}
              handleInputQuantity={handleInputQuantity}
              handleMinusProduct={handleMinusProduct}
              handlePlusProduct={handlePlusProduct}
              quantity={quantity}
            />
            <div className={style.counter__price}>&#36; {amount && amount.toFixed(2)}</div>{' '}
          </div>
        </>
      ) : (
        <>
          <button
            className={cn(style.btnReturn, style.product__btnReturn)}
            onClick={handleReturnProduct}
          >
            Restore to cart
          </button>
          <div className={cn(style.loadingBar, style.product__loadingBar)}>
            <div className={style.loadingBar__inner}>
              <div className={style.loadingBar__shadow}></div>
            </div>
          </div>
        </>
      )}
      <button
        className={cn(style.product__btnDelete, style.btnDelete)}
        onClick={handleProductExclusion}
      >
        <FontAwesomeIcon className={style.btnDelete__icon} icon={faTrashCan} size="xl" />
      </button>
    </div>
  )
}