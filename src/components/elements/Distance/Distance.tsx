import cn from 'classnames';
import { FC } from 'react';

import { ReactComponent as Delivery } from '../../../assets/images/delivery/delivery.svg';
import { ReactComponent as Run } from '../../../assets/images/delivery/pickup.svg';
import { DeliveryType } from '../../../store/slices/location/types';
import style from './distance.module.scss';

type DistanceProps = {
  classNames?: string;
  deliveryType?: DeliveryType;
  distance?: string;
  isClosed?: boolean;
};

export const Distance: FC<DistanceProps> = ({ classNames, deliveryType, distance, isClosed }) => {
  return (
    <div className={cn(style.distance, classNames, { [style.theme]: isClosed })}>
      {deliveryType === DeliveryType.PICKUP && (
        <Run
          className={cn(style.distance__pickupIcon, {
            [style.distance__pickupIcon_theme]: isClosed,
          })}
        />
      )}
      {deliveryType === DeliveryType.DELIVERY && (
        <Delivery
          className={cn(style.distance__deliveryIcon, {
            [style.distance__deliveryIcon_theme]: isClosed,
          })}
        />
      )}
      {distance && (
        <div
          className={cn(style.distance__distanceValue, {
            [style.distance__distanceValue_theme]: isClosed,
          })}
        >
          {distance.replace('&#160;', ' ')}
        </div>
      )}
    </div>
  );
};
