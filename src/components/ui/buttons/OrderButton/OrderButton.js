import cn from 'classnames';
import { ReactSVG } from 'react-svg';

import style from './orderButton.module.scss';

export function OrderButton({ classNames, name, onClick }) {
  return (
    <button className={cn(style.orderButton, classNames)} onClick={onClick}>
      {name}

      <ReactSVG
        className={style.orderButton__icon}
        src={`${process.env.PUBLIC_URL}/images/cards-big/btn.svg`}
        wrapper="span"
      />
    </button>
  );
}
