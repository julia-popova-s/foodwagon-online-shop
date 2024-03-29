import cn from 'classnames';
import { FC } from 'react';

import { ReactComponent as Label } from '../../../assets/images/food/label.svg';
import { ReactComponent as Star } from '../../../assets/images/food/star.svg';
import { ReactComponent as Watch } from '../../../assets/images/food/watch.svg';
import { useAppSelector } from '../../../store';
import { deliveryTypeSelector, listOfDistancesSelector } from '../../../store/slices/location/slice';
import { DeliveryType } from '../../../store/slices/location/types';
import { listOfOperatingStatusSelector } from '../../../store/slices/restaurants/slice';
import { OperatingModes } from '../../../store/utils/getExtraReducers';
import { OpeningStatus } from '../../../store/utils/getOpenStatus';
import { getPartOfString } from '../../../utils/getPartOfString';
import { Distance } from '../Distance/Distance';
import { OperatingStatus } from '../OperatingStatus/OperatingStatus';
import style from './cardFeatured.module.scss';

type CardFeaturedProps = {
  deliveryTime: number;
  discount: number;
  id: string;
  imageSrc: string;
  local_hours: OperatingModes;
  logo_photos: string;
  name: string;
  weighted_rating_value: number;
};

export const CardFeatured: FC<CardFeaturedProps> = (props) => {
  const { deliveryTime, discount, id, imageSrc, logo_photos, name, weighted_rating_value } = props;
  const deliveryType = useAppSelector(deliveryTypeSelector);
  const listOfDistances = useAppSelector(listOfDistancesSelector);
  const istOfOperatingStatus = useAppSelector(listOfOperatingStatusSelector);

  const statusEnabled = istOfOperatingStatus.find((el) => el.id === id);
  const distance = listOfDistances?.find((el) => el.id === id)?.distance;

  let status;

  if (deliveryType === DeliveryType.DELIVERY) {
    status = statusEnabled?.deliveryEnabled;
  }

  if (deliveryType === DeliveryType.PICKUP) {
    status = statusEnabled?.pickupEnabled;
  }

  const isClosed = status === OpeningStatus.CLOSED;

  return (
    <div className={style.card}>
      <div className={style.card__up}>
        <img alt={name} className={style.card__image} src={process.env.PUBLIC_URL + imageSrc} />
        <div className={style.card__upInfo}>
          <div className={style.card__discount}>
            <Label className={style.card__discountIcon} />
            <div className={style.card__discountValue}>{discount} % off</div>
          </div>

          <div className={style.card__fast}>
            <Watch className={style.card__fastIcon} />
            <div className={style.card__fastValue}>{deliveryTime <= 100 ? 'Fast' : 'Not fast'}</div>
          </div>
        </div>
      </div>

      <div className={cn(style.card__location, style.location)}>
        <div className={style.location__img}>
          <img alt={name} className={style.location__icon} src={process.env.PUBLIC_URL + logo_photos} />
        </div>

        <div className={style.location__text}>
          <p className={style.location__name}>{getPartOfString(name, 25)}</p>

          <div className={style.location__rating}>
            <Star className={style.location__ratingIcon} />
            <div className={style.location__ratingValue}>{weighted_rating_value.toFixed(2)}</div>
          </div>
        </div>
      </div>

      <div className={cn(style.card__status)}>
        {status && <OperatingStatus isClosed={isClosed} isOpened={status === OpeningStatus.OPENED} />}
        {distance && <Distance deliveryType={deliveryType} distance={distance} isClosed={isClosed} />}
      </div>
    </div>
  );
};
