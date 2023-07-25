import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import cn from 'classnames'
import { useEffect } from 'react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { ButtonsForCounter } from '../../ui/ButtonsForCounter'
import { Discount } from '../../ui/Discount/Discount'
import styles from './cardProduct.module.scss'

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
    } else handleInputCount({ id, price, quantity, restaurantId })
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
    <div className={styles.product}>
      <div className={styles.product__image}>
        <Link
          className={styles.product__imageLink}
          to={`/restaurant/${restaurantId}/product/${id}`}
        >
          <img
            alt={`${image}`}
            className={styles.product__img}
            src={`${process.env.PUBLIC_URL}${image}`}
          />
          {discount > 0 && (
            <Discount
              classNames={styles.product__discount}
              discount={discount}
              view={'smallLabel'}
            />
          )}
        </Link>
      </div>
      {!returnedProduct ? (
        <>
          <div className={styles.product__info}>
            <p className={styles.product__title}>
              <Link
                className={styles.product__titleLink}
                to={`/restaurant/${restaurantId}/product/${id}`}
              >
                {title}
              </Link>
            </p>
            <p className={styles.product__rest}>
              <FontAwesomeIcon className={styles.product__restIcon} icon={faLocationDot} />
              <Link
                className={styles.product__restLink}
                to={`/restaurant/${restaurantId}/product/${id}`}
              >
                {restaurantName}
              </Link>
            </p>
            <div
              className={cn(styles.product__price, {
                [styles.product__price_theme]: discount,
              })}
            >
              &#36;{price}
            </div>
            {discount ? (
              <div className={styles.product__price}>
                &#36;{(price - (price * discount) / 100).toFixed(2)}
              </div>
            ) : null}
          </div>

          <div className={styles.product__counterWithPrice}>
            <ButtonsForCounter
              classNames={styles.product__counter}
              handleInputQuantity={handleInputQuantity}
              handleMinusProduct={handleMinusProduct}
              handlePlusProduct={handlePlusProduct}
              quantity={quantity}
            />
            <div className={styles.product__priceWithSale}>&#36; {amount && amount.toFixed(2)}</div>{' '}
          </div>
        </>
      ) : (
        <>
          <button
            className={cn(styles.btnReturn, styles.product__btnReturn)}
            onClick={handleReturnProduct}
          >
            Restore to cart
          </button>
          <div className={styles.loadingBar}>
            <div className={styles.loadingBar__inner}>
              <div className={styles.loadingBar__shadow}></div>
            </div>
          </div>
        </>
      )}
      <button className={styles.product__btnDelete} onClick={handleProductExclusion}>
        <FontAwesomeIcon className={styles.product__delete} icon={faTrashCan} size="xl" />
      </button>
    </div>
  )
}
