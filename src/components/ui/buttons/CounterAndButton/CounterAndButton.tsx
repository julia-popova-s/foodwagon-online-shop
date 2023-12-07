import cn from 'classnames';
import { FC } from 'react';
import { Link } from 'react-router-dom';

import { Counter } from '../../Counter';
import { SearchButton } from '../SearchButton';
import style from './counterAndButton.module.scss';

export const CounterAndButton: FC = ({ handleInputQuantity, handleMinusProduct, handlePlusProduct, quantity }) => {
  return (
    <div className={style.buttons}>
      <Link className={style.buttons__link} to={'/cart'}>
        <SearchButton classNames={cn(style.buttons__btnToCart, style.buttons__btnToCart_color)} label="To Cart" />
      </Link>

      <Counter
        classNames={style.buttons__counter}
        handleInputQuantity={handleInputQuantity}
        handleMinusProduct={handleMinusProduct}
        handlePlusProduct={handlePlusProduct}
        quantity={quantity}
      />
    </div>
  );
};
