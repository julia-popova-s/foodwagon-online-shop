import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

import { isAuthSelector } from '../../../store/reducers/user';
import { removeUser } from '../../../store/reducers/user';
import { ButtonCart } from '../../ui/ButtonCart';
import { ButtonLogin } from '../../ui/ButtonLogin';
import { LogoType } from '../../ui/LogoType';
import style from './header.module.scss';

export function Header() {
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
  
  return (
    <header className={style.headerBlock}>
      <div className="container">
        <div className={style.header}>
          <Link className={style.header__logoLink} to={'/'}>
            <LogoType classNames={style.header__logo} />
          </Link>

          <div className={cn(style.address, style.header__address)}>
            <p className={style.address__deliver}>Deliver to:</p>
            <FontAwesomeIcon className={style.address__icon} icon={faLocationDot} />
            <span className={style.address__location}>Current Location</span>
            <span className={cn(style.address__location, style.address__location_weight)}>
              Lakeshore Road East, Mississauga
            </span>
          </div>

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
        </div>
      </div>
    </header>
  );
}
