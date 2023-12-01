import cn from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { isAuthSelector } from '../../../store/reducers/user';
import { DeliverAddress } from './DeliverAddress';
import style from './mobileMenu.module.scss';

export function MobileMenu({ handleLogOut }) {
  const [menuIsVisible, setMenuIsVisible] = useState(false);

  const handleClickMenu = () => {
    setMenuIsVisible(!menuIsVisible);
  };

  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const isAuth = useSelector(isAuthSelector);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!menuRef.current?.contains(e.target) && !buttonRef.current?.contains(e.target)) {
        setMenuIsVisible(false);
      }
    };
    document.body.addEventListener('click', handleOutsideClick);

    return () => document.body.removeEventListener('click', handleOutsideClick);
  }, []);

  return (
    <div className={style.mobileMenu}>
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
}
