import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useLocation } from 'react-use'

import { addProduct, deleteOneProduct, setProductCount } from '../../../store/reducers/cart'
import {
  categorySelector,
  currentPageSelector,
  setCurrentPage,
} from '../../../store/reducers/filters'
import {
  fetchProducts,
  isLoadedSelector,
  productListSelector,
} from '../../../store/reducers/products'
import { orderSelector, setSortType, sortTypeSelector } from '../../../store/reducers/sortingType'
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

export function RestaurantPage() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  const { restaurantId } = useParams()

  const dispatch = useDispatch()

  const category = useSelector(categorySelector)
  const order = useSelector(orderSelector)
  const sortType = useSelector(sortTypeSelector)

  const currentPage = useSelector(currentPageSelector)
  const isLoaded = useSelector(isLoadedSelector)
  const products = useSelector(productListSelector)

  const handleChangePage = (number) => {
    dispatch(setCurrentPage(number))
  }

  const handleSelectSortType = (type, order) => {
    dispatch(setSortType({ order, type }))
  }

  useEffect(() => {
    dispatch(
      fetchProducts({
        currentPage,
        limit: 4,
        order,
        restaurantId,
        sortType,
      })
    )
    window.scrollTo(0, 0)
  }, [sortType, category, restaurantId, order, currentPage])

  const handleAddProduct = (obj) => {
    dispatch(addProduct(obj))
  }

  const handleRemoveProduct = (product) => {
    dispatch(deleteOneProduct(product))
  }

  const handleInputCount = (obj) => {
    dispatch(setProductCount(obj))
  }

  const skeleton = Array(4)
    .fill(0)
    .map((_, index) => <Loader key={index} />)

  return (
    <div className={style.restaurant}>
      <div className="container">
        <div className={style.filters}>
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
            ? products.map((item) => (
                <CardPopular
                  classNames={style.menuList__item}
                  key={item.id}
                  {...item}
                  handleAddProduct={handleAddProduct}
                  handleInputCount={handleInputCount}
                  handleRemoveProduct={handleRemoveProduct}
                />
              ))
            : skeleton}
        </div>
        <Pagination currentPage={currentPage} handleChangePage={handleChangePage} pageCount={3} />
      </div>
    </div>
  )
}
