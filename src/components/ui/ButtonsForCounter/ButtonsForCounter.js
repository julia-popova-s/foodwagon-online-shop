import cn from 'classnames'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import React, { useState } from 'react'
import { useRef } from 'react'

import styles from './buttonsForCounter.module.scss'

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
    if (e.target.contains(inputRef.current)) {
      setIsHiddenInput(true)
    }
  }

  useEffect(() => {
    document.body.addEventListener('click', (e) => handleOutsideClick(e))
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
    <div className={cn(styles.buttons, classNames)}>
      <button className={cn(styles.button, styles.buttons__plus)} onClick={handleClickPlusProduct}>
        {'+'}
      </button>
      <div className={styles.buttons__input} onClick={() => setIsHiddenInput(false)}>
        <span
          className={cn(styles.buttons__quantity, {
            [styles.buttons__inputCount_hidden]: !isHiddenInput,
          })}
        >
          {quantity}
        </span>
        <input
          className={cn(styles.buttons__inputCount, {
            [styles.buttons__inputCount_hidden]: isHiddenInput,
          })}
          maxLength="3"
          onChange={handleChangeCount}
          ref={inputRef}
          type="text"
          value={count}
        />
      </div>
      <button
        className={cn(styles.buttons__minus, styles.button)}
        onClick={handleClickMinusProduct}
      >
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
