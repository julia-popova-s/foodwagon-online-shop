import { Delivery } from './Delivery'
import { SearchPanel } from './SearchPanel'
import style from './findFood.module.scss'

export function FindFood() {
  return (
    <div className={style.findFoodWrapper}>
      <div className="container">
        <div className={style.findFood}>
          <h1 className={style.findFood__title}>Are you starving?</h1>
          <p className={style.findFood__text}>
            Within a few clicks, find meals that are accessible near you
          </p>
          <div className={style.findFood__search}>
            <Delivery />
            <div className={style.searchPanel}>
              <SearchPanel />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
