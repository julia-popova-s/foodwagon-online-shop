import { FC } from 'react';

import { getDaysBetweenDates } from '../../../utils/getDaysBetweenDates';
import { Discount } from '../../ui/Discount';
import style from './flashDealCard.module.scss';

export enum SaleMessage {
  END = 'Promotion has ended',
  OK = 'Days Remaining',
}

type FlashDealCardProps = {
  discount: number;
  image: string;
  restaurantName: string;
  salePeriodEnd: string;
  salePeriodStart: string;
};

export const FlashDealCard: FC<FlashDealCardProps> = ({
  discount,
  image,
  restaurantName,
  salePeriodEnd,
  salePeriodStart,
}) => {
  const days = getDaysBetweenDates(salePeriodStart, salePeriodEnd);

  return (
    <div className={style.card}>
      <div className={style.card__up}>
        <img alt={restaurantName} className={style.card__image} src={process.env.PUBLIC_URL + image} />

        {discount && discount ? <Discount classNames={style.card__discount} discount={discount} /> : null}
        <Discount classNames={style.discount} discount={discount} view={'smallLabel'} />
      </div>

      <p className={style.card__name}>{restaurantName}</p>
      <p className={style.card__text}>{days ? `${days} ${SaleMessage.OK}` : SaleMessage.END}</p>
    </div>
  );
};
