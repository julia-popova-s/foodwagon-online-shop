import cn from 'classnames';
import { FC } from 'react';
import { Link } from 'react-router-dom';

import { Counter } from '../../Counter';
import { SearchButton } from '../SearchButton';
import style from './counterWithButton.module.scss';

type CounterWithButtonProps = {
  classNames?: string;
  handleProductMinus: () => void;
  handleProductPlus: () => void;
  handleQuantityInput: (quantity: number) => void;
  quantity: number;
};

export const CounterWithButton: FC<CounterWithButtonProps> = ({
  classNames,
  handleProductMinus,
  handleProductPlus,
  handleQuantityInput,
  quantity,
}) => {
  return (
    <div className={style.buttons}>
      <Link className={style.buttons__link} to={'/cart'}>
        <SearchButton
          classNames={cn(style.buttons__btnToCart, style.buttons__btnToCart_color, classNames)}
          label="To Cart"
        />
      </Link>

      <Counter
        classNames={style.buttons__counter}
        handleProductMinus={handleProductMinus}
        handleProductPlus={handleProductPlus}
        handleQuantityInput={handleQuantityInput}
        quantity={quantity}
      />
    </div>
  );
};
