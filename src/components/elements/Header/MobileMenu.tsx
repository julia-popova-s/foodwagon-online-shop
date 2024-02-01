import cn from 'classnames';
import { FC, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink, useLocation } from 'react-router-dom';

// import { useOutsideClick } from '../../../hooks/useOutsideClick';
import { isAuthSelector } from '../../../store/slices/user/slice';
import { CartButton } from '../../ui/buttons/CartButton';
import { DeliverAddress } from './DeliverAddress';
import style from './mobileMenu.module.scss';

type MobileMenuProps = {
  handleLogOut: () => void;
};

export const MobileMenu: FC<MobileMenuProps> = ({ handleLogOut }) => {
  const { pathname } = useLocation();

  useEffect(() => setMenuIsVisible(false), [pathname]);

  const [menuIsVisible, setMenuIsVisible] = useState(false);

  const handleClickMenu = () => {
    setMenuIsVisible(!menuIsVisible);
  };

  // const menuRef = useOutsideClick(() => setMenuIsVisible(false));

  const isAuth = useSelector(isAuthSelector);

  const getActiveClassName = ({ isActive }: { isActive: boolean }) =>
    [isActive ? style.active : '', style.menu__link].join(' ');

  return (
    <div className={style.mobileMenu}>
      <Link to={'cart'}>
        <CartButton />
      </Link>
      <button
        className={cn(style.menuButton, {
          [style.buttonClose]: menuIsVisible,
        })}
        onClick={handleClickMenu}
      >
        <div className={cn(style.menuButton__border, style.menuButton__border_top)}></div>
        <div className={cn(style.menuButton__border, style.menuButton__border_center)}></div>
        <div className={cn(style.menuButton__border, style.menuButton__border_bottom)}></div>
      </button>

      <nav
        className={cn(style.menu, {
          [style.menuClosed]: !menuIsVisible,
        })}
        // ref={menuRef}
      >
        <ul className={style.menu__list}>
          <li className={style.menu__item}>
            <NavLink className={getActiveClassName} to={'/'}>
              Home
            </NavLink>
          </li>

          <li className={style.menu__item}>
            <NavLink className={getActiveClassName} to={'/search'}>
              Search
            </NavLink>
          </li>

          <li className={style.menu__item}>
            {isAuth ? (
              <button className={style.menu__link} onClick={handleLogOut}>
                Logout
              </button>
            ) : (
              <NavLink className={getActiveClassName} to={'/login'}>
                Login
              </NavLink>
            )}
          </li>

          <li className={style.menu__item}>
            <NavLink className={getActiveClassName} to={'/cart'}>
              Cart
            </NavLink>
          </li>
          <li className={style.menu__item}>
            <DeliverAddress address="" />
          </li>
        </ul>
      </nav>
    </div>
  );
};
