import cn from 'classnames'
import { ReactSVG } from 'react-svg'

import styles from './installApp.module.scss'

const titles = [
  ['Daily', 'Discounts'],
  ['Live', 'Tracing'],
  ['Quick', 'Delivery'],
]
const links = [
  { name: 'google-play', src: '/images/install-app/google-play.png' },
  { name: 'app-store', src: '/images/install-app/app-store.png' },
]

export function InstallApp() {
  return (
    <div className={styles.installBlock}>
      <div className={styles.installApp}>
        <div className={cn(styles.installApp__up, styles.upBlock)}>
          <div className={styles.upBlock__container}>
            <div className={styles.upBlock__list}>
              {titles &&
                titles.map(([oneTitle, twoTitle], i) => {
                  return (
                    <div
                      className={cn(styles.upBlock__item, styles.upBlock__item_border)}
                      key={`${oneTitle}_${i}`}
                    >
                      <ReactSVG
                        className={styles.upBlock__img}
                        src={`${process.env.PUBLIC_URL}/images/install-app/discount.svg`}
                      />
                      <div className={styles.upBlock__text}>
                        <p>{oneTitle}</p>
                        <p>{twoTitle}</p>
                      </div>
                    </div>
                  )
                })}
            </div>
          </div>
        </div>

        <div className={cn(styles.installApp__down, styles.downBlock)}>
          <div className={styles.downBlock__container}>
            <div className={cn(styles.downBlock__install, styles.install)}>
              <p className={styles.install__title}>Install the app</p>
              <p className={styles.install__text}>
                It's never been easier to order food. Look for the finest discounts and you'll be
                lost in a world of delectable food.
              </p>
              {links &&
                links.map(({ name, src }, i) => {
                  return (
                    <a className={styles.install__link} href="##" key={`${name}_${i}`}>
                      <img
                        alt={name}
                        className={styles.install__linkImg}
                        src={`${process.env.PUBLIC_URL}${src}`}
                      />
                    </a>
                  )
                })}
            </div>
            <div className={styles.downBlock__image}>
              <img
                alt="iphone"
                className={styles.downBlock__imgBack}
                src={`${process.env.PUBLIC_URL}/images/install-app/iphone.png`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
