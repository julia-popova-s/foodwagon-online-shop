import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useLocation } from 'react-use'

import { addProduct, deleteOneProduct, setProductCount } from '../../../store/reducers/cart'
import { fetchProduct } from '../../../store/reducers/product'
import Restaurants, { fetchRestaurants } from '../../../store/reducers/restaurants'
import { RestaurantPage } from '../RestaurantPage/RestaurantPage'
import { Card } from './Card'
import { Loader, LoaderLeft } from './LoaderLeft'
import { LoaderRight } from './LoaderRight'
import style from './productPage.module.scss'

export function ProductPage() {
  let { id, restaurantId } = useParams()
  const dispatch = useDispatch()

  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  // const [limit, setLimit] = useState(4)

  // const { category, sortType } = useSelector((state) => state.filters)

  // const handleSelectCategory = (index) => {
  //   dispatch(setCategory(index))
  // }

  // const handleSelectSortType = (type) => {
  //   dispatch(setSortBy(type))
  // }

  useEffect(() => {
    dispatch(
      fetchProduct({
        filter: `&id=${id}`,
      })
    )
  }, [id, dispatch])

  // useEffect(() => {
  //   dispatch(
  //     fetchRestaurants({
  //       restaurantId,
  //       limit: 20,
  //     })
  //   )
  // }, [restaurantId, dispatch])

  // // const { list } = useSelector((state) => state.restaurants)
  const { isLoaded, product } = useSelector((state) => state.product)
  const { cart } = useSelector((state) => state.cart)

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
                    handleAddProduct={(obj) => handleAddProduct(obj)}
                    handleInputCount={(obj) => handleInputCount(obj)}
                    handleRemoveProduct={(obj) => handleRemoveProduct(obj)}
                    key={`${item.id}${i}`}
                    quantity={cart[item.restaurantId]?.items[item.id]?.quantity}
                    restaurantId={restaurantId}
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
