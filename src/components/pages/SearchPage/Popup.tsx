import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { v4 as uuidv4 } from 'uuid';

import { Product } from '../../../store/slices/cart/types';
import { PriceBlock } from '../CartPage/PriceBlock';
import style from './popup.module.scss';

type PopupProps = {
  isLoaded: boolean;
  isOpen: boolean;
  list: Product[];
};

export const Popup = forwardRef<HTMLDivElement, PopupProps>(({ isLoaded, isOpen, list }, ref) => {
  return (
    <CSSTransition classNames="alert" in={isOpen && isLoaded} timeout={300} unmountOnExit>
      <div className={style.popup} ref={ref}>
        {list.map(({ discount, id, image, price, restaurantId, title }) => (
          <Link className={style.link} key={uuidv4()} to={`/restaurant/${restaurantId}/product/${id}`}>
            <div className={style.card}>
              <div className={style.card__left}>
                <img alt={title} className={style.card__image} src={process.env.PUBLIC_URL + image} />
              </div>

              <div className={style.card__right}>
                <div className={style.card__title}>{title}</div>
                <PriceBlock classNames={style.card__prices} discount={discount} price={price} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </CSSTransition>
  );
});
