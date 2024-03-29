import cn from 'classnames';
import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { RouteNames } from '../../../router';
import { useAppDispatch, useAppSelector } from '../../../store';
import { addressSelector } from '../../../store/slices/location/slice';
import { isAuthSelector, removeUser } from '../../../store/slices/user/slice';
import { DeliveryAddress } from '../../elements/DeliveryAddress';
import { MobileMenu } from '../../elements/MobileMenu';
import { LogoType } from '../../ui/LogoType';
import { LoginButton } from '../../ui/buttons/LoginButton';
import { CartLink } from '../../ui/links/CartLink';
import { OrdersLink } from '../../ui/links/OrdersLink';
import { SearchLink } from '../../ui/links/SearchLink';
import style from './header.module.scss';

export const Header: FC = () => {
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const isAuth = useAppSelector(isAuthSelector);

  const dispatch = useAppDispatch();

  const address = useAppSelector(addressSelector);

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

          <DeliveryAddress address={address} classNames={style.header__address} />

          <div className={cn(style.search, style.header__search)}>
            <Link to={RouteNames.SEARCH}>
              <SearchLink />
            </Link>

            <Link to={RouteNames.ORDERS}>
              <OrdersLink />
            </Link>

            {isAuth ? (
              <LoginButton classNames={style.search__login} handleClick={handleLogOut} title={'Logout'} />
            ) : (
              <LoginButton classNames={style.search__login} handleClick={handleLogin} title={'Login'} />
            )}

            {pathname !== RouteNames.CART && (
              <Link to={RouteNames.CART}>
                <CartLink />
              </Link>
            )}
          </div>

          <MobileMenu handleLogOut={handleLogOut} />
        </div>
      </div>
    </header>
  );
};
