import { useDispatch, useSelector } from 'react-redux'

import { addProduct, deleteOneProduct, setProductCount } from '../../../store/reducers/cart'
import { setCurrentPage } from '../../../store/reducers/filters'
import { SearchPanel } from '../../elements/FindFood/SearchPanel'
import { CardPopular } from '../../elements/PopularItems/CardPopular'
import { Pagination } from '../../ui/Pagination/Pagination'
import { Loader } from './Loader'
import style from './searchPage.module.scss'

export function SearchPage() {
  const { isLoaded, products, status } = useSelector((state) => state.productsSearch)
  const { currentPage } = useSelector((state) => state.filters)

  const dispatch = useDispatch()

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number))
  }

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
    <div className={style.searchPage}>
      <div className="container">
        <div className={style.panel}>
          <SearchPanel />
        </div>

        <div className={style.menuList}>
          {isLoaded &&
            products.map((item, i) => (
              <CardPopular
                classNames={style.menuList__item}
                key={`${item.id}${i}`}
                {...item}
                handleAddProduct={handleAddProduct}
                handleInputCount={handleInputCount}
                handleRemoveProduct={handleRemoveProduct}
              />
            ))}
          {!isLoaded &&
            status === 'loading' &&
            Array(8)
              .fill(0)
              .map((_, index) => <Loader key={index} />)}
        </div>

        {!isLoaded && status === 'resolve' && (
          <div className={style.message}>
            We didn't find anything. But there is a lot of interesting things in our catalog.
          </div>
        )}

        {status && (
          <Pagination currentPage={currentPage} onChangePage={onChangePage} pageCount={3} />
        )}
        {!status && <div>Are you ready to order with the best deals?</div>}
      </div>
    </div>
  )
}
