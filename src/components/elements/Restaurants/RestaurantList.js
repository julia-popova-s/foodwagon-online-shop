import React from 'react'
import { Link } from 'react-router-dom'

import { CardFeatured } from './CardFeatured'
import { Loader } from './Loader'
import style from './restaurantList.module.scss'

export function RestaurantList({ isLoading, list }) {
  return (
    <div className={style.restaurantListWrapper}>
      {isLoading && list
        ? list.map((obj, i) => {
            return (
              <Link key={obj.id} to={`restaurant/${obj.id}/product/${obj.backgroundId}`}>
                <CardFeatured {...obj} />
              </Link>
            )
          })
        : Array(list.length)
            .fill(0)
            .map((_, index) => <Loader key={index} />)}
    </div>
  )
}
