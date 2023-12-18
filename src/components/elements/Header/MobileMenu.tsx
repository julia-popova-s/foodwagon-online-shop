import cn from 'classnames';
import { FC, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { isAuthSelector } from '../../../store/slices/user/selectors';
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

  const menuRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const isAuth = useSelector(isAuthSelector);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node) && !buttonRef.current?.contains(e.target as Node)) {
        setMenuIsVisible(false);
      }
    };
    document.body.addEventListener('click', handleOutsideClick);

    return () => document.body.removeEventListener('click', handleOutsideClick);
  }, []);

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
        ref={buttonRef}
      >
        <div className={cn(style.menuButton__border, style.menuButton__border_top)}></div>
        <div className={cn(style.menuButton__border, style.menuButton__border_center)}></div>
        <div className={cn(style.menuButton__border, style.menuButton__border_bottom)}></div>
      </button>

      <nav
        className={cn(style.menu, {
          [style.menuClosed]: !menuIsVisible,
        })}
        ref={menuRef}
      >
        <ul className={style.menu__list}>
          <li className={style.menu__item}>
            <Link className={style.menu__link} to={'/'}>
              Home
            </Link>
          </li>

          <li className={style.menu__item}>
            <Link className={style.menu__link} to={'/search'}>
              Search
            </Link>
          </li>

          <li className={style.menu__item}>
            {isAuth ? (
              <button className={style.menu__link} onClick={handleLogOut}>
                Logout
              </button>
            ) : (
              <Link className={style.menu__link} to={'/login'}>
                Login
              </Link>
            )}
          </li>

          <li className={style.menu__item}>
            <Link className={style.menu__link} to={'/cart'}>
              Cart
            </Link>
          </li>
          <li className={style.menu__item}>
            <DeliverAddress />
          </li>
        </ul>
      </nav>
    </div>
  );
};
