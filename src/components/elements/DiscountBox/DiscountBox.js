import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchProductsWithDiscount } from '../../../store/reducers/productsWithDiscount'
import { Card } from './Card'
import { Loader } from './Loader'
import style from './discountBox.module.scss'
const restaurantId = '333f1471-d10f-4b1d-a654-d3c070cb3500'

export function DiscountBox() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      fetchProductsWithDiscount({
        filter: `&sortBy=discount&order=desc`,
        limit: 4,
        restaurantId,
      })
    )
  }, [restaurantId])

  const { products, status } = useSelector((state) => state.productsWithDiscount)

  return (
    <div className={style.discountBox}>
      <div className="container">
        <div className={style.discountBlock}>
          {status === 'resolve' && products
            ? products.map((item, i) => {
                return (
                  <Link
                    key={`${item.id}_${i}`}
                    to={`restaurant/${restaurantId}/product/${item.id}`}
                  >
                    <Card {...item} />
                  </Link>
                )
              })
            : Array(4)
                .fill(0)
                .map((_, index) => <Loader key={index} />)}
        </div>
      </div>
    </div>
  )
}
