import cn from 'classnames';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { ReactSVG } from 'react-svg';

import { listOfDistancesSelector } from '../../../store/slices/location/slice';
import { OperatingModes } from '../../../store/utils/getExtraReducers';
import { OpeningStatus, getOpenStatus } from '../../../store/utils/getOpenStatus';
import { getPartOfString } from '../../../utils/getPartOfString';
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
  const {
    deliveryTime,
    discount,
    id,
    imageSrc,
    local_hours: { delivery },
    logo_photos,
    name,
    weighted_rating_value,
  } = props;
  const status = getOpenStatus(delivery);
  const listOfDistances = useSelector(listOfDistancesSelector);
  const distance = listOfDistances?.find((el) => el.id === id)?.distance;
  const space = ' ';
  return (
    <div className={style.card}>
      <div className={style.card__up}>
        <img alt={name} className={style.card__image} src={process.env.PUBLIC_URL + imageSrc} />
        <div className={style.card__upInfo}>
          <div className={style.card__discount}>
            <ReactSVG src={`${process.env.PUBLIC_URL}/images/food/label.svg`} wrapper="span" />
            {discount} % off
          </div>

          <div className={style.card__fast}>
            <ReactSVG src={process.env.PUBLIC_URL + '/images/food/watch.svg'} wrapper="span" />
            {deliveryTime <= 100 ? 'Fast' : 'Not fast'}
          </div>
        </div>
      </div>

      <div className={cn(style.card__location, style.location)}>
        <div className={style.location__img}>
          <img alt={name} className={style.location__icon} src={process.env.PUBLIC_URL + logo_photos} />
        </div>

        <div className={style.location__text}>
          <p className={style.location__name}>{getPartOfString(name, 25)}</p>

          <span className={style.location__rating}>
            <ReactSVG
              className={style.location__icon}
              src={process.env.PUBLIC_URL + '/images/food/star.svg'}
              wrapper="span"
            />
            {weighted_rating_value.toFixed(2)}
          </span>
        </div>
      </div>

      <div className={cn(style.card__distance)}>
        <div
          className={cn(style.card__text, {
            [style.card__text_theme]: status === OpeningStatus.CLOSED,
          })}
        >
          {status === OpeningStatus.CLOSED ? 'Closed Now' : 'Open Now'}
        </div>

        {distance && (
          <div
            className={cn(style.card__run, {
              [style.card__run_theme]: status === OpeningStatus.CLOSED,
            })}
          >
            <ReactSVG
              className={cn(style.card__runIcon, {
                [style.card__runIcon_theme]: status === OpeningStatus.CLOSED,
              })}
              src={process.env.PUBLIC_URL + '/images/run.svg'}
              wrapper="span"
            />
            {distance.replace('&#160;', space)}
          </div>
        )}
      </div>
    </div>
  );
};
