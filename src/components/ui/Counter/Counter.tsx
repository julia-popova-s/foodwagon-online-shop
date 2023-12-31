import cn from 'classnames';
import PropTypes from 'prop-types';
import { ChangeEvent, FC, useState } from 'react';

import style from './counter.module.scss';

type CounterProps = {
  classNames: string;
  handleInputQuantity: (quantity: number) => void;
  handleMinusProduct: () => void;
  handlePlusProduct: () => void;
  quantity: number;
};

export const Counter: FC<CounterProps> = ({
  classNames,
  handleInputQuantity,
  handleMinusProduct,
  handlePlusProduct,
  quantity,
}) => {
  const [count, setCount] = useState(quantity);

  const handleChangeCount = (e: ChangeEvent<HTMLInputElement>) => {
    const counter = e.target.value.replace(/[^0-9]/gi, '');
    if (counter !== '') {
      setCount(+counter);
      handleInputQuantity(+counter);
    } else {
      setCount(0);
    }
  };

  const handleClickPlusProduct = () => {
    handlePlusProduct();
    setCount(count + 1);
  };

  const handleClickMinusProduct = () => {
    handleMinusProduct();
    setCount(count - 1);
  };

  return (
    <div className={cn(style.buttons, classNames)}>
      <button
        className={cn(style.button, style.buttons__plus, {
          [style.disabledBtn]: count > 98,
        })}
        disabled={count > 98}
        onClick={handleClickPlusProduct}
      >
        {'+'}
      </button>

      <input
        className={cn(style.buttons__input)}
        maxLength={2}
        onChange={handleChangeCount}
        type="text"
        value={count}
      />

      <button className={cn(style.buttons__minus, style.button)} onClick={handleClickMinusProduct}>
        {'–'}
      </button>
    </div>
  );
};

Counter.propTypes = {
  handleMinusProduct: PropTypes.func.isRequired,
  handlePlusProduct: PropTypes.func.isRequired,
  quantity: PropTypes.number.isRequired,
};

Counter.defaultProps = { quantity: 0 };
