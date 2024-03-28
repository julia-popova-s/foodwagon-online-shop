import cn from 'classnames';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

import { ReactComponent as Box } from '../../../assets/images/header/box.svg';
import { useAppDispatch, useAppSelector } from '../../../store';
import { addressSelector } from '../../../store/slices/location/slice';
import { isAuthSelector, removeUser } from '../../../store/slices/user/slice';
import { DeliveryAddress } from '../../elements/DeliveryAddress';
import { MobileMenu } from '../../elements/MobileMenu';
import { LogoType } from '../../ui/LogoType';
import { CartButton } from '../../ui/buttons/CartButton';
import { LoginButton } from '../../ui/buttons/LoginButton';
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

  const handleOrders = () => {
    navigate('orders');
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
            <Link className={style.search__link} to="search">
              <ReactSVG
                className={style.search__icon}
                src={process.env.PUBLIC_URL + '/images/header/search.svg'}
                wrapper="span"
              />
              <span className={style.search__name}>Search Food</span>
            </Link>
            <button className={style.box} onClick={handleOrders}>
              <Box height={40} width={40} />
            </button>

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
