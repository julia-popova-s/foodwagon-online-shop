import cn from 'classnames'
import React from 'react'
import { Link } from 'react-router-dom'

import { ButtonFind } from '../ButtonFind'
import { ButtonsForCounter } from '../ButtonsForCounter'
import styles from './buttonsWithCounter.module.scss'

export function ButtonsWithCounter({
  handleInputQuantity,
  handleMinusProduct,
  handlePlusProduct,
  quantity,
}) {
  return (
    <div className={styles.buttons}>
      <Link className={styles.buttons__link} to={'/cart'}>
        <ButtonFind
          classNames={cn(styles.buttons__btnToCart, styles.buttons__btnToCart_color)}
          label="To Cart"
        />
      </Link>
      <ButtonsForCounter
        classNames={styles.buttons__counter}
        handleInputQuantity={handleInputQuantity}
        handleMinusProduct={handleMinusProduct}
        handlePlusProduct={handlePlusProduct}
        quantity={quantity}
      />
    </div>
  )
}
