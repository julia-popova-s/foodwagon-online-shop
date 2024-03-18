import cn from 'classnames';
import { FC } from 'react';
import { ReactSVG } from 'react-svg';

import discount from '../../../assets/images/app-downLoad/discount.svg';
import style from './appDownLoad.module.scss';

type LinkType = {
  name: string;
  src: string;
};

const titles: string[][] = [
  ['Daily', 'Discounts'],
  ['Live', 'Tracing'],
  ['Quick', 'Delivery'],
];

const links: LinkType[] = [
  { name: 'google-play', src: '/images/install-app/google-play.png' },
  { name: 'app-store', src: '/images/install-app/app-store.png' },
];

export const AppDownLoad: FC = () => {
  return (
    <div className={style.installBlock}>
      <div className={style.appDownLoad}>
        <div className={cn(style.appDownLoad__up, style.upBlock)}>
          <div className={style.upBlock__container}>
            <div className={style.upBlock__list}>
              {titles &&
                titles.map(([oneTitle, twoTitle], i) => {
                  return (
                    <div className={cn(style.upBlock__item, style.upBlock__item_border)} key={`${oneTitle}_${i}`}>
                      <ReactSVG className={style.upBlock__img} src={discount} />
                      <div className={style.upBlock__text}>
                        <p>{oneTitle}</p>
                        <p>{twoTitle}</p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        <div className={cn(style.appDownLoad__down, style.downBlock)}>
          <div className={style.downBlock__container}>
            <div className={cn(style.downBlock__install, style.install)}>
              <p className={style.install__title}>Install the app</p>
              <p className={style.install__text}>
                It's never been easier to order food. Look for the finest discounts and you'll be lost in a world of
                delectable food.
              </p>
              {links &&
                links.map(({ name, src }, i) => {
                  return (
                    <a className={style.install__link} href="##" key={`${name}_${i}`}>
                      <img alt={name} className={style.install__linkImg} src={`${process.env.PUBLIC_URL}${src}`} />
                    </a>
                  );
                })}
            </div>
            <div className={style.downBlock__image}>
              <img
                alt="iphone"
                className={style.downBlock__imgBack}
                src={process.env.PUBLIC_URL + '/images/install-app/iphone.png'}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
