import cn from 'classnames'
import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react'
import React from 'react'

import styles from './sortPopup.module.scss'
// let render = 0

export function SortPopup({ activeSortType, classNames, handleClickSortType, items, orderType }) {
  // console.log('render SortPopup', ++render)
  const [visiblePopup, setVisiblePopup] = useState(false)
  const sortRef = useRef()

  const activeLabel = items.find((obj) => obj.type === activeSortType).name

  const handleVisiblePopup = () => {
    setVisiblePopup(!visiblePopup)
  }

  const handleOutsideClick = (e) => {
    if (e.target.parentNode !== sortRef.current) {
      setVisiblePopup(false)
    }
  }
  const handleSelectFilter = (type, order) => {
    handleClickSortType(type, order)
    // activeLabel = items[index].name
  }

  useEffect(() => {
    document.body.addEventListener('click', (e) => handleOutsideClick(e))
  }, [])

  return (
    <div className={cn(styles.sort, classNames)}>
      <div className={styles.sort__title} ref={sortRef}>
        sort by
        {/* Сортировать по: */}
        <span className={styles.sort__link} onClick={handleVisiblePopup}>
          {activeLabel}
        </span>
      </div>
      {visiblePopup && (
        <div className={styles.sort__popup}>
          <ul className={styles.sort__list}>
            {items &&
              items.map(({ name, order, type }, i) => {
                return (
                  <li
                    className={cn(styles.sort__item, {
                      [styles.sort__item_active]: type === activeSortType && order === orderType,
                    })}
                    key={`${type}_${i}`}
                    onClick={() => handleSelectFilter(type, order)}
                  >
                    {name}
                  </li>
                )
              })}
          </ul>
        </div>
      )}
    </div>
  )
}
SortPopup.propTypes = {
  activeSortType: PropTypes.string.isRequired,
  handleClickSortType: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
}

SortPopup.defaultProps = {
  items: [],
}
