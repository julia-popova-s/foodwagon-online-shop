import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useLocation } from 'react-use'

import { addProduct, deleteOneProduct, setProductCount } from '../../../store/reducers/cart'
import { setCategory } from '../../../store/reducers/filters'
import { fetchProducts } from '../../../store/reducers/products'
import { setSortType } from '../../../store/reducers/sortingType'
// import { Categories } from '../../elements/Categories'
import { CardPopular } from '../../elements/PopularItems/CardPopular'
import { SortPopup } from '../../elements/SortPopup'
import { Loader } from './Loader'
import styles from './restaurantPage.module.scss'

const sortItems = [
  { name: 'popularity ', order: 'desc', type: 'rating' },
  {
    name: 'price ascending',
    order: 'asc',
    type: 'price',
  },
  {
    name: 'price descending',
    order: 'desc',
    type: 'price',
  },
  { name: 'discount', order: 'desc', type: 'discount' },
  { name: 'alphabetically', order: 'asc', type: 'title' },
]

const categoryNames = ['All', 'Pasta', 'Salad', 'Fish', 'Meat', 'Soup', 'Burger', 'Dessert']

export function RestaurantPage() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  const { restaurantId } = useParams()

  const dispatch = useDispatch()
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)

  const { category } = useSelector((state) => state.filters)
  const { order, sortType } = useSelector((state) => state.sortingType)

  const handleSelectCategory = (index) => {
    dispatch(setCategory(index))
  }

  const handleSelectSortType = (type, order) => {
    dispatch(setSortType({ order, type }))
  }

  useEffect(() => {
    dispatch(
      fetchProducts({
        limit,
        order,
        // category: categoryNames[category],
        restaurantId,
        sortType,
      })
    )
  }, [sortType, category, limit, restaurantId, dispatch, order])

  const { isLoaded, products } = useSelector((state) => state.products)

  const handleAddProduct = (obj) => {
    dispatch(addProduct(obj))
  }

  const { cart } = useSelector((state) => state.cart)

  const handleRemoveProduct = (product) => {
    dispatch(deleteOneProduct(product))
  }

  const handleInputCount = (obj) => {
    dispatch(setProductCount(obj))
  }

  return (
    <div className={styles.restaurant}>
      <div className="container">
        {/* <p className="restaurant__name">{'name'}</p> */}
        <div className={styles.filters}>
          {/* <Categories
            items={categoryNames}
            activeCategory={category}
            handleClickCategory={handleSelectCategory}
          /> */}
          <SortPopup
            activeSortType={sortType}
            classNames={styles.filters__sortBy}
            handleClickSortType={handleSelectSortType}
            items={sortItems}
            orderType={order}
          />
        </div>
        <div className={styles.menuList}>
          {isLoaded && products
            ? products.map((item, i) => (
                <CardPopular
                  classNames={styles.menuList__item}
                  key={`${item.id}${i}`}
                  {...item}
                  handleAddProduct={(obj) => handleAddProduct(obj)}
                  handleInputCount={(obj) => handleInputCount(obj)}
                  handleRemoveProduct={(obj) => handleRemoveProduct(obj)}
                  quantity={cart[item.restaurantId]?.items[item.id]?.quantity}
                />
              ))
            : Array(4)
                .fill(0)
                .map((_, index) => <Loader key={index} />)}
        </div>
      </div>
    </div>
  )
}
