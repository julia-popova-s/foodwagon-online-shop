import cn from 'classnames'
import React from 'react'
import { Link } from 'react-router-dom'

import { ButtonFind } from '../ButtonFind'
import { ButtonsForCounter } from '../ButtonsForCounter'
import style from './buttonsWithCounter.module.scss'

export function ButtonsWithCounter({
  handleInputQuantity,
  handleMinusProduct,
  handlePlusProduct,
  quantity,
}) {
  return (
    <div className={style.buttons}>
      <Link className={style.buttons__link} to={'/cart'}>
        <ButtonFind
          classNames={cn(style.buttons__btnToCart, style.buttons__btnToCart_color)}
          label="To Cart"
        />
      </Link>
      <ButtonsForCounter
        classNames={style.buttons__counter}
        handleInputQuantity={handleInputQuantity}
        handleMinusProduct={handleMinusProduct}
        handlePlusProduct={handlePlusProduct}
        quantity={quantity}
      />
    </div>
  )
}
