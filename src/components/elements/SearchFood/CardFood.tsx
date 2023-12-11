import cn from 'classnames';
import { FC } from 'react';

import style from './cardFood.module.scss';

type CardFoodProps = {
  classNames?: string;
  handleClickCategory: () => void;
  imageSrc: string;
  name: string;
};

export const CardFood: FC<CardFoodProps> = ({ classNames, handleClickCategory, imageSrc, name }) => {
  return (
    <div className={cn(classNames, style.cardFoodBlock)} onClick={handleClickCategory}>
      <div className={style.cardFood__up}>
        <img alt={name} className={style.cardFood__image} src={process.env.PUBLIC_URL + imageSrc} />
      </div>

      <p className={style.cardFood__label}>{name}</p>
    </div>
  );
};
