import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useLocation } from 'react-use'

import { addProduct, deleteOneProduct, setProductCount } from '../../../store/reducers/cart'
import { setCurrentPage } from '../../../store/reducers/filters'
import { setCategory } from '../../../store/reducers/filters'
import { fetchProducts } from '../../../store/reducers/products'
import { setSortType } from '../../../store/reducers/sortingType'
// import { Categories } from '../../elements/Categories'
import { CardPopular } from '../../elements/PopularItems/CardPopular'
import { SortPopup } from '../../elements/SortPopup'
import { Pagination } from '../../ui/Pagination/Pagination'
import { Loader } from './Loader'
import style from './restaurantPage.module.scss'

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
  const { currentPage } = useSelector((state) => state.filters)
  const { isLoaded, products, status } = useSelector((state) => state.products)

  const handleSelectCategory = (index) => {
    dispatch(setCategory(index))
  }

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number))
  }

  const handleSelectSortType = (type, order) => {
    dispatch(setSortType({ order, type }))
  }

  useEffect(() => {
    dispatch(
      fetchProducts({
        limit: 4,
        order,
        page: currentPage,
        // category: categoryNames[category],
        restaurantId,
        sortType,
      })
    )
    window.scrollTo(0, 0)
  }, [sortType, category, limit, restaurantId, dispatch, order, currentPage])

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
    <div className={style.restaurant}>
      <div className="container">
        {/* <p className="restaurant__name">{'name'}</p> */}
        <div className={style.filters}>
          {/* <Categories
            items={categoryNames}
            activeCategory={category}
            handleClickCategory={handleSelectCategory}
          /> */}
          <SortPopup
            activeSortType={sortType}
            classNames={style.filters__sortBy}
            handleClickSortType={handleSelectSortType}
            items={sortItems}
            orderType={order}
          />
        </div>
        <div className={style.menuList}>
          {isLoaded && products
            ? products.map((item, i) => (
                <CardPopular
                  classNames={style.menuList__item}
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
        <Pagination currentPage={currentPage} onChangePage={onChangePage} pageCount={3} />
      </div>
    </div>
  )
}
