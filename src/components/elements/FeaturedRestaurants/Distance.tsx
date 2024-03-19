import cn from 'classnames';
import { FC } from 'react';

import { ReactComponent as Delivery } from '../../../assets/images/delivery/delivery.svg';
import { ReactComponent as Run } from '../../../assets/images/delivery/pickup.svg';
import { DeliveryType } from '../../../store/slices/location/types';
import style from './cardFeatured.module.scss';

type DistanceProps = {
  classNames?: string;
  deliveryType?: DeliveryType;
  distance?: string;
  isClosed?: boolean;
};

export const Distance: FC<DistanceProps> = ({ classNames, deliveryType, distance, isClosed }) => {
  return (
    <div className={cn(style.card__run, classNames, { [style.card__run_theme]: isClosed })}>
      {deliveryType === DeliveryType.PICKUP && (
        <Run
          className={cn(style.card__pickupIcon, {
            [style.card__pickupIcon_theme]: isClosed,
          })}
        />
      )}
      {deliveryType === DeliveryType.DELIVERY && (
        <Delivery
          className={cn(style.card__deliveryIcon, {
            [style.card__deliveryIcon_theme]: isClosed,
          })}
        />
      )}
      <div
        className={cn(style.card__distanceValue, {
          [style.card__distanceValue_theme]: isClosed,
        })}
      >
        {distance && distance.replace('&#160;', ' ')}
      </div>
    </div>
  );
};
