import classNames from 'classnames';
import { FC } from 'react';

import style from './categories.module.scss';

type CategoryProps = {
  activeCategory: number;
  handleChangeCategory: (index: number) => void;
  items: string[];
};

export const Categories: FC<CategoryProps> = ({ activeCategory, handleChangeCategory, items }) => {
  return (
    <div className={style.categories}>
      <ul className={style.categories__list}>
        {items.map((item, i) => {
          return (
            <li
              className={classNames(style.categories__item, {
                [style.categories__item_active]: activeCategory === i,
              })}
              key={`${item}_${i}`}
              onClick={() => handleChangeCategory(i)}
            >
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
