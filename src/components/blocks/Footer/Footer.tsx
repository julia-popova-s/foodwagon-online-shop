import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';

import { validationEmail } from '../../../utils/validationEmail';
import { FooterNav } from '../../elements/FooterNav/FooterNav';
import style from './footer.module.scss';

type LinkItem = {
  links: string[];
  title: string;
};

export const LINKS: LinkItem[] = [
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
];

export const Footer: FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!validationEmail(e.target.value)) {
      setError('Email is invalid');
    } else {
      setError('');
    }

    setEmail(e.target.value);
  };

  const handleEmailSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmail('');
  };

  return (
    <footer className={style.footer}>
      <div className="container">
        <div className={style.footer__service}>
          <div className={style.footer__nav}>
            {LINKS.map(({ links, title }) => (
              <FooterNav classNames={style.footer__list} key={title} links={links} title={title} />
            ))}
          </div>

          <div className={style.footer__mailbox}>
            <p className={style.footer__title}>Follow Us</p>
            <div className={style.footer__networks}>
              <Link to={''}>
                <FontAwesomeIcon className={style.footer__networksItem} icon={faInstagram} />
              </Link>
              <Link to={''}>
                <FontAwesomeIcon className={style.footer__networksItem} icon={faFacebook} />
              </Link>
              <Link to={''}>
                <FontAwesomeIcon className={style.footer__networksItem} icon={faTwitter} />
              </Link>
            </div>

            <form className={style.footer__form} onSubmit={handleEmailSubmit}>
              <p className={style.footer__label}>Receive exclusive offers in your mailbox</p>
              <input
                className={style.footer__input}
                name="email"
                onChange={handleChange}
                placeholder="Enter Your email"
                value={email}
              />
              <button className={style.footer__btn} type="submit">
                Subscribe
              </button>
              <div className={style.footer__error}>{error}</div>
            </form>
          </div>
        </div>
        <footer className={style.footer__copyright}>
          <div className={style.footer__reserved}>All rights Reserved</div>
          <div className={style.footer__copy}>&copy;</div>
          <div className={style.footer__date}>Foodwagon, {2023}</div>
        </footer>
      </div>
    </footer>
  );
};
