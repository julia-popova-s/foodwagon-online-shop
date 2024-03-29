import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC } from 'react';

import { useAppSelector } from '../../../../store';
import { totalQuantitySelector } from '../../../../store/slices/cart/slice';
import style from './cartLink.module.scss';

export const CartLink: FC = () => {
  const totalQuantity = useAppSelector(totalQuantitySelector);
  return (
    <div className={style.cartLink}>
      <FontAwesomeIcon className={style.cartLink__icon} icon={faCartShopping} size="xl" />

      {!!totalQuantity && <div className={style.cartLink__counter}>{totalQuantity}</div>}
    </div>
  );
};
