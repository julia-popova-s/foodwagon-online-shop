import cn from 'classnames';
import { FC } from 'react';
import { Link } from 'react-router-dom';

import style from './footerNav.module.scss';

type LinkItem = {
  classNames?: string;
  links: string[];
  title: string;
};

export const FooterNav: FC<LinkItem> = ({ classNames, links, title }) => {
  return (
    <div className={cn(style.cityList, classNames)}>
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
