import { Delivery } from './Delivery'
import styles from './findFood.module.scss'
import { SearchPanel } from './SearchPanel'

export function FindFood() {
  return (
    <div className={styles.findFoodWrapper}>
      <div className="container">
        <div className={styles.findFood}>
          <h1 className={styles.findFood__title}>Are you starving?</h1>
          <p className={styles.findFood__text}>
            Within a few clicks, find meals that are accessible near you
          </p>
          <div className={styles.findFood__search}>
            <Delivery />
            <SearchPanel />
          </div>
        </div>
      </div>
    </div>
  )
}
