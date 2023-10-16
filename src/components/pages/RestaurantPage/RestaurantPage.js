import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useLocation } from 'react-use'

import { addProduct, deleteOneProduct, setProductCount } from '../../../store/reducers/cart'
import { setCurrentPage } from '../../../store/reducers/filters'
import { fetchProducts } from '../../../store/reducers/products'
import { setSortType } from '../../../store/reducers/sortingType'
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

  const { category } = useSelector((state) => state.filters)
  const { order, sortType } = useSelector((state) => state.sortingType)
  const { currentPage } = useSelector((state) => state.filters)
  const { isLoaded, products } = useSelector((state) => state.products)

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
        restaurantId,
        sortType,
      })
    )
    window.scrollTo(0, 0)
  }, [sortType, category, restaurantId, dispatch, order, currentPage])

  const handleAddProduct = (obj) => {
    dispatch(addProduct(obj))
  }

  const handleRemoveProduct = (product) => {
    dispatch(deleteOneProduct(product))
  }

  const handleInputCount = (obj) => {
    dispatch(setProductCount(obj))
  }

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
            ? products.map((item, i) => (
                <CardPopular
                  classNames={style.menuList__item}
                  key={`${item.id}${i}`}
                  {...item}
                  handleAddProduct={handleAddProduct}
                  handleInputCount={handleInputCount}
                  handleRemoveProduct={handleRemoveProduct}
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
