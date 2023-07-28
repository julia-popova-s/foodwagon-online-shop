import cn from 'classnames'
import { Link } from 'react-router-dom'

import styles from './footerNav.module.scss'

export function FooterNav({ links, title }) {
  return (
    <div className={styles.cityList}>
      <div className={styles.cityList__title}>{title}</div>
      <ul className={cn(styles.cityList__items)}>
        {links &&
          links.map((item) => {
            return (
              <li className={styles.cityList__item} key={item}>
                <Link className={styles.cityList__item} to={''}>
                  {item}
                </Link>
              </li>
            )
          })}
      </ul>
    </div>
  )
}
