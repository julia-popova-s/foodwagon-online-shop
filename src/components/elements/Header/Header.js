import cn from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

import { isAuthSelector } from '../../../store/reducers/user';
import { removeUser } from '../../../store/reducers/user';
import { LogoType } from '../../ui/LogoType';
import { ButtonCart } from '../../ui/buttons/ButtonCart';
import { ButtonLogin } from '../../ui/buttons/ButtonLogin';
import { CurrentLocation } from './CurrentLocation';
import style from './header.module.scss';

export function Header() {
  const [menuIsVisible, setMenuIsVisible] = useState(false);

  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const navigate = useNavigate();
  const goBack = () => navigate('/');

  const { pathname } = useLocation();

  const isAuth = useSelector(isAuthSelector);

  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(removeUser());
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleClickMenu = () => {
    setMenuIsVisible(!menuIsVisible);
  };

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
    <header className={style.headerBlock}>
      <div className="container">
        <div className={style.header}>
          <Link className={style.header__logoLink} to={'/'}>
            <LogoType classNames={style.header__logo} />
          </Link>

          <CurrentLocation classNames={style.header__address} />

          <div className={cn(style.search, style.header__search)}>
            <Link className={style.search__link} to="search">
              <ReactSVG
                className={style.search__icon}
                src={process.env.PUBLIC_URL + '/images/header/search.svg'}
                wrapper="span"
              />
              <span className={style.search__name}>Search Food</span>
            </Link>

            {isAuth ? (
              <ButtonLogin classNames={style.search__login} handleClick={handleLogOut} title={'Logout'} />
            ) : (
              <ButtonLogin classNames={style.search__login} handleClick={handleLogin} title={'Login'} />
            )}

            {pathname !== '/cart' && (
              <Link to={'cart'}>
                <ButtonCart />
              </Link>
            )}
          </div>

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
              [style.menuOpened]: menuIsVisible,
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
                <CurrentLocation />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
