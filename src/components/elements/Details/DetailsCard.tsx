import cn from 'classnames';
import { FC } from 'react';
import { Link } from 'react-router-dom';

import { OrderButton } from '../../ui/buttons/OrderButton';
import style from './detailsCard.module.scss';

export const DetailsCard: FC = ({ description, flippedСard, food, imageSrc, link, title }) => {
  const flippedСardStyle = {
    imgBorder: style.cardBig__img_border,
    imgRight: style.cardBig__img_right,
    textBorder: style.cardBig__description_border,
  };

  return (
    <div
      className={cn(style.cardBig, {
        [flippedСardStyle.imgRight]: flippedСard,
      })}
    >
      <div className={style.cardBig__image}>
        <img
          className={cn(style.cardBig__img, {
            [flippedСardStyle.imgBorder]: flippedСard,
          })}
          alt={`${title}${food}`}
          src={process.env.PUBLIC_URL + imageSrc}
        />
      </div>
      <div
        className={cn(style.cardBig__description, {
          [flippedСardStyle.textBorder]: flippedСard,
        })}
      >
        <p className={style.cardBig__title}>
          {title}
          <Link className={style.cardBig__link} to={link}>
            {food}
          </Link>
        </p>
        <p className={style.cardBig__text}>{description}</p>
        <Link to={link}>
          <OrderButton classNames={style.cardBig__btn} name={'Proceed to order'} />
        </Link>
      </div>
    </div>
  );
};
