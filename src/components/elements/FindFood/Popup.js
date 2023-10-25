import cn from 'classnames'
import { forwardRef } from 'react'
import { Link } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import { v4 as uuidv4 } from 'uuid'

import style from './popup.module.scss'

export const Popup = forwardRef(({ isLoaded, list, show }, ref) => {
  return (
    <CSSTransition classNames="alert" in={show && isLoaded} timeout={300} unmountOnExit>
      <div className={style.popup} ref={ref}>
        {list.map(({ discount, id, image, price, restaurantId, title }) => (
          <Link key={uuidv4()} to={`/restaurant/${restaurantId}/product/${id}`}>
            <div className={style.card}>
              <div className={style.card__left}>
                <img
                  alt={title}
                  className={style.card__image}
                  src={process.env.PUBLIC_URL + image}
                />
              </div>
              <div className={style.card__right}>
                <div className={style.card__title}>{title}</div>
                {discount ? (
                  <div className={style.card__price}>
                    &#36;{(price - (price * discount) / 100).toFixed(2)}
                  </div>
                ) : null}
                <div
                  className={cn(style.card__price, {
                    [style.card__price_theme]: discount,
                  })}
                >
                  &#36;{price}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </CSSTransition>
  )
})
