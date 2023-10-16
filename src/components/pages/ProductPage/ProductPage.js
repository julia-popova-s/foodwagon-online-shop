import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useLocation } from 'react-use'

import { addProduct, deleteOneProduct, setProductCount } from '../../../store/reducers/cart'
import { fetchProduct } from '../../../store/reducers/product'
import { fetchRestaurants } from '../../../store/reducers/restaurants'
import { RestaurantPage } from '../RestaurantPage/RestaurantPage'
import { Card } from './Card'
import { LoaderLeft } from './LoaderLeft'
import { LoaderRight } from './LoaderRight'
import style from './productPage.module.scss'

export function ProductPage() {
  let { id, restaurantId } = useParams()
  const dispatch = useDispatch()

  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  useEffect(() => {
    dispatch(
      fetchProduct({
        filter: `&id=${id}`,
      })
    )
  }, [id, dispatch])

  useEffect(() => {
    dispatch(
      fetchRestaurants({
        limit: 20,
        restaurantId,
      })
    )
  }, [restaurantId, dispatch])

  const { isLoaded, product } = useSelector((state) => state.product)

  const handleAddProduct = (product) => {
    dispatch(addProduct(product))
  }

  const handleRemoveProduct = (product) => {
    dispatch(deleteOneProduct(product))
  }

  const handleInputCount = (obj) => {
    dispatch(setProductCount(obj))
  }

  return (
    <>
      <div className={style.productPage}>
        <div className="container">
          <div className={style.product}>
            {isLoaded && product
              ? product.map((item, i) => (
                  <Card
                    {...item}
                    handleAddProduct={handleAddProduct}
                    handleInputCount={handleInputCount}
                    handleRemoveProduct={handleRemoveProduct}
                    key={`${item.id}${i}`}
                  />
                ))
              : Array(1)
                  .fill(0)
                  .map((_, index) => (
                    <div className={style.placeholder} key={index}>
                      <LoaderLeft />
                      <LoaderRight />
                    </div>
                  ))}
          </div>
        </div>
      </div>
      <RestaurantPage />
    </>
  )
}
