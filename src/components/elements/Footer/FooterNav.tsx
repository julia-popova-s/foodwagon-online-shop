import cn from 'classnames';
import { FC } from 'react';
import { Link } from 'react-router-dom';

import style from './footerNav.module.scss';

export const FooterNav: FC = ({ links, title }) => {
  return (
    <div className={style.cityList}>
      <div className={style.cityList__title}>{title}</div>

      <ul className={cn(style.cityList__items)}>
        {links &&
          links.map((item) => {
            return (
              <li className={style.cityList__item} key={item}>
                <Link className={style.cityList__item} to={''}>
                  {item}
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
};
