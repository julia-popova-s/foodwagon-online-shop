import { useDispatch, useSelector } from 'react-redux'

import { setCurrentPage } from '../../../store/reducers/filters'
import { SearchPanel } from '../../elements/FindFood/SearchPanel'
import { Pagination } from './Pagination'
import style from './searchPage.module.scss'

export function SearchPage() {
  const { isLoaded, products } = useSelector((state) => state.products)
  const { currentPage } = useSelector((state) => state.filters)
  const dispatch = useDispatch()

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number))
  }
  console.log(products.length)
  console.log(products)
  return (
    <div className={style.searchPage}>
      <div className="container">
        <SearchPanel />
        {isLoaded &&
          products?.map((item, index) => {
            // console.log(item)
            return (
              <div key={index}>
                <img alt="" src={'/foodwagon' + item.image} />
                {item.title}
              </div>
            )
          })}
        {!isLoaded && !products.length && (
          <div>
            We didn't find anything. But there is a lot of interesting things in our catalog.
          </div>
        )}
        {isLoaded && (
          <Pagination
            currentPage={currentPage}
            onChangePage={onChangePage}
            pageCount={3}
          />
        )}
      </div>
    </div>
  )
}
