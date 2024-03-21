import { FC } from 'react';

import style from './orderInfoBlock.module.scss';

type OrderInfoBlockProps = {
  price: number;
  quantity: number;
};

export const OrderInfoBlock: FC<OrderInfoBlockProps> = ({ price, quantity }) => {
  return (
    <div className={style.orderInfo}>
      Your order for the total amount{' '}
      <span className={style.orderInfo__result_color}>&#36;{price && price.toFixed(2)}</span> and{' '}
      <span className={style.orderInfo__result_color}>{quantity}</span> items
    </div>
  );
};
