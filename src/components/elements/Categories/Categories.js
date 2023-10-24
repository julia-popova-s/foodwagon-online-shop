import classNames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

import style from './categories.module.scss'

export function Categories({ activeCategory, handleClickCategory, items }) {
  return (
    <div className={style.categories}>
      <ul className={style.categories__list}>
        {items.map((item, i) => {
          return (
            <li
              className={classNames(style.categories__item, {
                [style.categories__item_active]: activeCategory === i,
              })}
              key={`${item}_${i}`}
              onClick={() => handleClickCategory(i)}
            >
              {item}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

Categories.propTypes = {
  activeCategory: PropTypes.number.isRequired,
  handleClickCategory: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
}

Categories.defaultProps = { activeCategory: 0, items: [] }
