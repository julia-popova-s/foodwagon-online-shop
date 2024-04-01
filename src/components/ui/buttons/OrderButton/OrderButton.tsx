import cn from 'classnames';
import { FC } from 'react';

import { ReactComponent as Arrow } from '../../../../assets/images/call-to-action/btn.svg';
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
      <Arrow className={style.orderButton__icon} />
    </button>
  );
};
