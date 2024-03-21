import cn from 'classnames';
import PropTypes from 'prop-types';
import { ChangeEvent, FC, useState } from 'react';

import style from './counter.module.scss';

type CounterProps = {
  classNames: string;
  handleProductMinus: () => void;
  handleProductPlus: () => void;
  handleQuantityInput: (quantity: number) => void;
  quantity: number;
};

export const Counter: FC<CounterProps> = ({
  classNames,
  handleProductMinus,
  handleProductPlus,
  handleQuantityInput,
  quantity,
}) => {
  const [count, setCount] = useState(quantity);

  const handleChangeCount = (e: ChangeEvent<HTMLInputElement>) => {
    const counter = e.target.value.replace(/[^0-9]/gi, '');
    if (counter !== '') {
      setCount(+counter);
      handleQuantityInput(+counter);
    } else {
      setCount(0);
    }
  };

  const handleClickProductPlus = () => {
    handleProductPlus();
    setCount(count + 1);
  };

  const handleClickProductMinus = () => {
    handleProductMinus();
    setCount(count - 1);
  };

  return (
    <div className={cn(style.buttons, classNames)}>
      <button
        className={cn(style.button, style.buttons__plus, {
          [style.disabledBtn]: count > 98,
        })}
        disabled={count > 98}
        onClick={handleClickProductPlus}
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

      <button className={cn(style.buttons__minus, style.button)} onClick={handleClickProductMinus}>
        {'–'}
      </button>
    </div>
  );
};

Counter.propTypes = {
  handleProductMinus: PropTypes.func.isRequired,
  handleProductPlus: PropTypes.func.isRequired,
  quantity: PropTypes.number.isRequired,
};

Counter.defaultProps = { quantity: 0 };
