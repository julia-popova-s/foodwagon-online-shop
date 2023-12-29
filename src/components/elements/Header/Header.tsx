import cn from 'classnames';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

import { isAuthSelector, removeUser } from '../../../store/slices/user/slice';
import { LogoType } from '../../ui/LogoType';
import { CartButton } from '../../ui/buttons/CartButton';
import { LoginButton } from '../../ui/buttons/LoginButton';
import { DeliverAddress } from './DeliverAddress';
import { MobileMenu } from './MobileMenu';
import style from './header.module.scss';

export const Header: FC = () => {
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const isAuth = useSelector(isAuthSelector);

  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(removeUser());
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <header className={style.headerBlock}>
      <div className="container">
        <div className={style.header}>
          <Link className={style.header__logoLink} to={'/'}>
            <LogoType classNames={style.header__logo} />
          </Link>

          <DeliverAddress classNames={style.header__address} />

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
              <LoginButton classNames={style.search__login} handleClick={handleLogOut} title={'Logout'} />
            ) : (
              <LoginButton classNames={style.search__login} handleClick={handleLogin} title={'Login'} />
            )}

            {pathname !== '/cart' && (
              <Link to={'cart'}>
                <CartButton />
              </Link>
            )}
          </div>

          <MobileMenu handleLogOut={handleLogOut} />
        </div>
      </div>
    </header>
  );
};
