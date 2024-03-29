import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { RouteNames } from '../../../router';
import style from './navItem.module.scss';

type NavItemProps = {
  name: string;
  path: RouteNames;
};

export const NavItem: FC<NavItemProps> = ({ name, path }) => {
  const getActiveClassName = ({ isActive }: { isActive: boolean }) =>
    [isActive ? style.active : '', style.menuLink].join(' ');

  return (
    <li className={style.menuItem}>
      <NavLink className={getActiveClassName} to={path}>
        {name}
      </NavLink>
    </li>
  );
};
