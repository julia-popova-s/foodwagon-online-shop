import { FC } from 'react';

import { Discount } from '../../ui/Discount';
import style from './flashDealCard.module.scss';

export const FlashDealCard: FC = ({ discount, image, restaurantName }) => {
  return (
    <div className={style.card}>
      <div className={style.card__up}>
        <img alt={restaurantName} className={style.card__image} src={process.env.PUBLIC_URL + image} />

        {discount && discount ? <Discount classNames={style.card__discount} discount={discount} /> : null}
        <Discount classNames={style.discount} discount={discount} view={'smallLabel'} />
      </div>

      <p className={style.card__name}>{restaurantName}</p>
      <p className={style.card__text}>6 Days Remaining</p>
    </div>
  );
};
