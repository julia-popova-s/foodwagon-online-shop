import cn from 'classnames';
import { ReactSVG } from 'react-svg';

import { getPartOfString } from '../../../utils/getPartOfString';
import style from './cardFeatured.module.scss';

const theme = 'close';

export function CardFeatured(props) {
  const { deliveryTime, imageSrc, logo_photos, name, weighted_rating_value } = props;

  return (
    <div className={style.card} theme={theme}>
      <div className={style.card__up}>
        <img alt={name} className={style.card__image} src={process.env.PUBLIC_URL + imageSrc} />

        <div className={style.card__discount}>
          <ReactSVG src={`${process.env.PUBLIC_URL}/images/food/label.svg`} wrapper="span" />
          time: {deliveryTime} min
        </div>

        <div className={style.card__fast}>
          <ReactSVG src={process.env.PUBLIC_URL + '/images/food/watch.svg'} wrapper="span" />
          {deliveryTime <= 100 ? 'Fast' : 'Not fast'}
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

      <div className={style.card__text}>Open Now</div>
    </div>
  );
}
