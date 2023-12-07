import cn from 'classnames';
import { FC } from 'react';
import { ReactSVG } from 'react-svg';

import style from './orderButton.module.scss';

type OrderButtonProps = {
  classNames: string;
  handleClick?: () => void;
  name: string;
};

export const OrderButton: FC<OrderButtonProps> = ({ classNames, handleClick, name }) => {
  return (
    <button className={cn(style.orderButton, classNames)} onClick={handleClick}>
      {name}

      <ReactSVG
        className={style.orderButton__icon}
        src={`${process.env.PUBLIC_URL}/images/cards-big/btn.svg`}
        wrapper="span"
      />
    </button>
  );
};
