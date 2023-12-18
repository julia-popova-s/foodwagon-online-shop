import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC } from 'react';
import { useSelector } from 'react-redux';

import { totalQuantitySelector } from '../../../../store/slices/cart/selectors';
import style from './cartButton.module.scss';

export const CartButton: FC = () => {
  const totalQuantity = useSelector(totalQuantitySelector);
  return (
    <button className={style.cartButton}>
      <FontAwesomeIcon className={style.cartButton__icon} icon={faCartShopping} size="xl" />

      {!!totalQuantity && <div className={style.cartButton__counter}>{totalQuantity}</div>}
    </button>
  );
};
