import { useState } from 'react';
import { ReactSVG } from 'react-svg';

import { ButtonFind } from '../../ui/ButtonFind';
import style from './card.module.scss';

export function Card({ discount, handleClick, id, image, ingredients, price, restaurantId, restaurantName, title }) {
  const [count, setCount] = useState(70);
  const [visible, setVisible] = useState(false);

  const handleVisibleText = () => {
    setCount(500);
    setVisible(true);
  };

  return (
    <div className={style.card}>
      <div className={style.card__up}>
        <img alt="food" className={style.card__image} src={process.env.PUBLIC_URL + image} />
        {discount && discount ? (
          <div className={style.card__discount}>
            {discount}
            <div className={style.card__discount_size}>%</div>
            <div className={style.card__discount_off}>off</div>
          </div>
        ) : null}
      </div>

      <p className={style.card__name}>{title}</p>

      <p className={style.card__rest}>
        <ReactSVG src={process.env.PUBLIC_URL + '/images/popular-items/map.svg'} wrapper="span" />
        <span>{restaurantName}</span>
      </p>
      <p className={style.card__price}>&#36; {price}</p>

      <ButtonFind classNames={style.card__btn} handleClick={handleClick} name="Add To Cart" />
    </div>
  );
}
