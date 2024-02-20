import cn from 'classnames';
import { FC } from 'react';
import { ReactSVG } from 'react-svg';

import style from './balloon.module.scss';

type BalloonProps = { address: string; handleClick: () => void; isActive: boolean; status: boolean };

export const Balloon: FC<BalloonProps> = ({ address, handleClick, isActive, status }) => {
  return (
    <div className={cn(style.balloon, { [style.visible]: isActive })}>
      <div className={style.balloon__contact}>Your location</div>
      <div className={style.balloon__address}>{address}</div>
      <div>{status ? 'Delivery available' : 'No delivery'}</div>

      <button className={style.balloon__close} onClick={handleClick}>
        <ReactSVG
          className={style.balloon__closeIcon}
          src={`${process.env.PUBLIC_URL}/images/find-food/close.svg`}
          wrapper="span"
        />
      </button>
    </div>
  );
};
