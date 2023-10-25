import { Link as LinkScroll } from 'react-scroll'

import { ButtonOrder } from '../../ui/ButtonOrder'
import style from './readyToOrder.module.scss'

export function ReadyToOrder() {
  return (
    <div className={style.readyOrderBlock}>
      <div className="container">
        <div className={style.readyOrder}>
          <p className={style.readyOrder__title}>Are you ready to order with the best deals?</p>
          <LinkScroll duration={500} offset={-70} smooth={true} spy={true} to="featuredRestaurants">
            <ButtonOrder classNames={style.readyOrder__btn} name={'Proceed to order'} />
          </LinkScroll>
        </div>
      </div>
    </div>
  )
}
