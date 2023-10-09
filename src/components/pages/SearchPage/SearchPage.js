import { useSelector } from 'react-redux'

import { SearchPanel } from '../../elements/FindFood/SearchPanel'
import style from './searchPage.module.scss'

export function SearchPage() {
  const { isLoaded, products } = useSelector((state) => state.products)

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
      </div>
    </div>
  )
}
