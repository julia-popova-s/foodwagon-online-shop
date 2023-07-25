import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import cn from 'classnames'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom'
import { Link as LinkScroll } from 'react-scroll'
import { ReactSVG } from 'react-svg'

import { ButtonCart } from '../../ui/ButtonCart'
import { ButtonLogin } from '../../ui/ButtonLogin'
import { LogoType } from '../../ui/LogoType'
import styles from './header.module.scss'
export function Header({ geolocation }) {
  // let navigate = useNavigate()
  // const goBack = () => navigate(-1)
  const location = useLocation()

  return (
    <header className={styles.headerBlock}>
      <div className="container">
        <div className={styles.header}>
          <Link className={styles.header__logoLink} to={'/'}>
            <LogoType classNames={styles.header__logo} />
          </Link>

          <div className={cn(styles.address, styles.header__address)}>
            <p className={styles.address__deliver}>Deliver to:</p>
            <FontAwesomeIcon className={styles.address__icon} icon={faLocationDot} />
            <span className={styles.address__location}>Current Location</span>
            <span className={cn(styles.address__location, styles.address__location_weight)}>
              Lakeshore Road East, Mississauga
            </span>
          </div>

          <div className={cn(styles.search, styles.header__search)}>
            {location.pathname === '/' && (
              <LinkScroll
                activeClass={styles.active}
                className={styles.search__link}
                duration={500}
                offset={-70}
                smooth={true}
                spy={true}
                to="searchByFood"
              >
                <div className={styles.search__inner}>
                  <ReactSVG
                    className={styles.search__innerIcon}
                    src={`${process.env.PUBLIC_URL}/images/header/search.svg`}
                    wrapper="span"
                  />
                  <span className={styles.search__innerName}>Search Food </span>
                </div>
              </LinkScroll>
            )}

            <Link to={'login'}>
              <ButtonLogin classNames={styles.search__login} />
            </Link>

            <Link to={'cart'}>
              <ButtonCart />
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
