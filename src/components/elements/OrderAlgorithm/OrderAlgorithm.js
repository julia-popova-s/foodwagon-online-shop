import style from './orderAlgorithm.module.scss'
import { OrderStep } from './OrderStep'

const algorithm = [
  {
    description: 'Choose the location where your food will be delivered.',
    imageSrc: '/images/order-algorithm/map.svg',
    label: 'Select location',
  },
  {
    description: 'Check over hundreds of menus to pick your favorite food',
    imageSrc: '/images/order-algorithm/menu.svg',
    label: 'Choose order',
  },
  {
    description: " It's quick, safe, and simple. Select several methods of payment",
    imageSrc: '/images/order-algorithm/invoice.svg',
    label: 'Pay advanced',
  },
  {
    description: 'Food is made and delivered directly to your home.',
    imageSrc: '/images/order-algorithm/donut.svg',
    label: 'Enjoy meals',
  },
]

export function OrderAlgorithm() {
  return (
    <div className={style.orderAlgorithmBlock}>
      <div className="container">
        <div className={style.orderAlgorithm}>
          <h2 className={style.orderAlgorithm__title}>How does it work</h2>
          <div className={style.orderAlgorithm__list}>
            {algorithm &&
              algorithm.map(({ id, label, ...others }, i) => {
                return <OrderStep key={`${label}_${i}`} label={label} {...others} />
              })}
          </div>
        </div>
      </div>
    </div>
  )
}
