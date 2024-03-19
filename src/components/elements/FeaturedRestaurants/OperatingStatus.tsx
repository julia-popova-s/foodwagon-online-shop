import cn from 'classnames';
import { FC } from 'react';

import style from './cardFeatured.module.scss';

type OperatingStatusProps = {
  classNames?: string;
  isClosed: boolean;
};

export const OperatingStatus: FC<OperatingStatusProps> = ({ classNames, isClosed }) => {
  return (
    <div
      className={cn(classNames, style.card__text, {
        [style.card__text_theme]: isClosed,
      })}
    >
      {isClosed ? 'Closed Now' : 'Open Now'}
    </div>
  );
};
