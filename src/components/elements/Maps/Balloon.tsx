import cn from 'classnames';
import { FC } from 'react';
import { ReactSVG } from 'react-svg';

import { Coords } from '../../../store/slices/location/types';
import style from './balloon.module.scss';

type BalloonProps = { address: string; coord: Coords; handleClick: () => void; isActive: boolean; status?: boolean };

export const Balloon: FC<BalloonProps> = ({ address, coord, handleClick, isActive, status }) => {
  return (
    <div className={cn(style.balloon, { [style.visible]: isActive })}>
      <div className={style.balloon__contact}>Your location:</div>
      <div className={style.balloon__address}>{address}</div>
      <div className={style.balloon__address}>Coordinates: {coord.join(', ')}</div>

      <div>Delivery: {status ? 'Available' : 'No'}</div>

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
