import cn from 'classnames';
import { ReactSVG } from 'react-svg';

import style from './buttonOrder.module.scss';

export function ButtonOrder({ classNames, name, onClick }) {
  return (
    <button className={cn(style.buttonOrder, classNames)} onClick={onClick}>
      {name}

      <ReactSVG
        className={style.buttonOrder__icon}
        src={`${process.env.PUBLIC_URL}/images/cards-big/btn.svg`}
        wrapper="span"
      />
    </button>
  );
}
