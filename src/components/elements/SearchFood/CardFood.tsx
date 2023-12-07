import cn from 'classnames';
import { FC } from 'react';

import style from './cardFood.module.scss';

export const CardFood: FC = ({ classNames, imageSrc, name, onClickCategory }) => {
  return (
    <div className={cn(classNames, style.cardFoodBlock)} onClick={onClickCategory}>
      <div className={style.cardFood__up}>
        <img alt={name} className={style.cardFood__image} src={process.env.PUBLIC_URL + imageSrc} />
      </div>

      <p className={style.cardFood__label}>{name}</p>
    </div>
  );
};
