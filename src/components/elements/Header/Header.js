import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import cn from 'classnames'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
// import { Link as LinkScroll } from 'react-scroll'
import { ReactSVG } from 'react-svg'

import { ButtonCart } from '../../ui/ButtonCart'
import { ButtonLogin } from '../../ui/ButtonLogin'
import { LogoType } from '../../ui/LogoType'
import style from './header.module.scss'

export function Header({ geolocation }) {
  let navigate = useNavigate()
  const goBack = () => navigate(-1)
  const { pathname } = useLocation()
  console.log(pathname)
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
              {/* <button className={style.search__inner}> */}
              {/* <LinkScroll
                  activeClass={style.active}
                  className={style.search__link}
                  duration={500}
                  offset={-70}
                  smooth={true}
                  spy={true}
                  to="searchByFood"
                > */}
              <ReactSVG
                className={style.search__icon}
                src={`${process.env.PUBLIC_URL}/images/header/search.svg`}
                wrapper="span"
              />
              <span className={style.search__name}>Search Food</span>
              {/* </LinkScroll> */}
              {/* </button> */}
            </Link>

            <Link to={'login'}>
              <ButtonLogin classNames={style.search__login} />
            </Link>

            {pathname !== '/cart' && (
              <Link to={'cart'}>
                <ButtonCart />
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
