import cn from 'classnames'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import React, { useState } from 'react'
import { useRef } from 'react'

import style from './buttonsForCounter.module.scss'

export function ButtonsForCounter({
  classNames,
  handleInputQuantity,
  handleMinusProduct,
  handlePlusProduct,
  quantity,
}) {
  const [isHiddenInput, setIsHiddenInput] = useState(true)

  const [count, setCount] = useState(quantity)

  const handleChangeCount = (e) => {
    console.log(e.target.value)
    const counter = e.target.value.replace(/[^0-9]/gi, '')
    if (counter !== '') {
      setCount(+counter)
      handleInputQuantity(+counter)
    } else {
      setCount('')
    }
  }

  const inputRef = useRef()

  const handleOutsideClick = (e) => {
    if (!inputRef.current?.contains(e.target)) {
      setIsHiddenInput(true)
    }
  }

  useEffect(() => {
    document.body.addEventListener('click', (e) => handleOutsideClick(e))
    return () => document.body.removeEventListener('click', (e) => handleOutsideClick(e))
  }, [])

  const handleClickPlusProduct = () => {
    handlePlusProduct()
    setIsHiddenInput(true)
    setCount(count + 1)
  }

  const handleClickMinusProduct = () => {
    handleMinusProduct()
    setIsHiddenInput(true)
    setCount(count - 1)
  }
  return (
    <div className={cn(style.buttons, classNames)}>
      <button className={cn(style.button, style.buttons__plus)} onClick={handleClickPlusProduct}>
        {'+'}
      </button>
      <div className={style.buttons__input} onClick={() => setIsHiddenInput(false)}>
        <span
          className={cn(style.buttons__quantity, {
            [style.buttons__inputCount_hidden]: !isHiddenInput,
          })}
        >
          {quantity}
        </span>
        <input
          className={cn(style.buttons__inputCount, {
            [style.buttons__inputCount_hidden]: isHiddenInput,
          })}
          maxLength="3"
          onChange={(e) => handleChangeCount(e)}
          ref={inputRef}
          type="text"
          value={count}
        />
      </div>
      <button className={cn(style.buttons__minus, style.button)} onClick={handleClickMinusProduct}>
        {'–'}
      </button>
    </div>
  )
}

ButtonsForCounter.propTypes = {
  handleMinusProduct: PropTypes.func.isRequired,
  handlePlusProduct: PropTypes.func.isRequired,
  quantity: PropTypes.number.isRequired,
}

ButtonsForCounter.defaultProps = { quantity: 0 }
