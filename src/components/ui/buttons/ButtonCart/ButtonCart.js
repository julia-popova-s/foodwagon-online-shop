import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';

import style from './buttonCart.module.scss';

export function ButtonCart() {
  const { totalQuantity } = useSelector((state) => state.cart);
  return (
    <button className={style.cartButton}>
      <FontAwesomeIcon className={style.cartButton__icon} icon={faCartShopping} size="xl" />
      
      {totalQuantity > 0 && <div className={style.cartButton__counter}>{totalQuantity}</div>}
    </button>
  );
}
