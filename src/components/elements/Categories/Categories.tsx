import classNames from 'classnames';
import { FC } from 'react';

import style from './categories.module.scss';

export const Categories: FC = ({ activeCategory, handleClickCategory, items }) => {
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
              onClick={() => handleClickCategory(i)}
            >
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
