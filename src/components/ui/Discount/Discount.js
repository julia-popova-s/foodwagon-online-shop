import cn from 'classnames'

import styles from './discount.module.scss'

export function Discount({ classNames, discount, view }) {
  const labelView = view === 'smallLabel'

  return (
    <div
      className={cn(styles.label, classNames, {
        [styles.smallLabel]: labelView,
      })}
    >
      <div
        className={cn(styles.label__discount, {
          [styles.smallLabel__discount]: labelView,
        })}
      >
        {discount}
      </div>
      <div
        className={cn(styles.label__discountPercent, {
          [styles.smallLabel__discountPercent]: labelView,
        })}
      >
        {'%'}
      </div>
      <div
        className={cn(styles.label__discountOff, {
          [styles.smallLabel__discountOff]: labelView,
        })}
      >
        {'off'}
      </div>
    </div>
  )
}
