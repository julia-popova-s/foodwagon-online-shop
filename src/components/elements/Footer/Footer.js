import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

import { validationEmail } from '../../../utils/validationEmail'
import { CityList } from '../Cities/CityList'
import styles from './footer.module.scss'

export const LINKS = [
  {
    links: ['About us', 'Team', 'Careers', 'Blog'],
    title: 'Company',
  },

  {
    links: [' Help & Support', 'Partner with us', 'Ride with us', 'Blog'],
    title: 'Contact',
  },
  {
    links: ['Terms & Conditions', 'Refund & Cancellation', 'Privacy Policy', 'Cookie Policy'],
    title: 'Legal',
  },
]

export function Footer() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const handleChange = (e) => {
    if (!validationEmail(e.target.value)) {
      setError('Email is invalid')
    } else {
      setError(null)
    }

    setEmail(e.target.value)
  }

  const handleSubmitEmail = (e) => {
    e.preventDefault()
  }

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footer__service}>
          <div className={styles.footer__nav}>
            {LINKS.map(({ links, title }) => (
              <CityList key={title} links={links} title={title} />
            ))}
          </div>

          <div className={styles.footer__mailbox}>
            <p className={styles.footer__title}>Follow Us</p>
            <div className={styles.footer__networks}>
              <FontAwesomeIcon className={styles.footer__networksItem} icon={faInstagram} />
              <FontAwesomeIcon className={styles.footer__networksItem} icon={faFacebook} />
              <FontAwesomeIcon className={styles.footer__networksItem} icon={faTwitter} />
            </div>

            <form className={styles.footer__inputBtn} onSubmit={handleSubmitEmail}>
              <p className={styles.footer__label}>Receive exclusive offers in your mailbox</p>
              <input
                className={styles.footer__input}
                name="email"
                onChange={handleChange}
                placeholder="Enter Your email"
                value={email}
              />
              <button className={styles.footer__btn} type="submit">
                Subscribe
              </button>
              <div className={styles.footer__error}>{error}</div>
            </form>
          </div>
        </div>
        <footer className={styles.footer__copyright}>
          <div className={styles.footer__reserved}>All rights Reserved</div>
          <div className={styles.footer__copy}>&copy;</div>
          <div className={styles.footer__date}>Foodwagon, {2023}</div>
        </footer>
      </div>
    </footer>
  )
}
