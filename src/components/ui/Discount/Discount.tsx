import cn from 'classnames';
import { FC } from 'react';

import style from './discount.module.scss';

type DiscountProps = { classNames?: string; discount: number; view?: 'smallLabel' };

export const Discount: FC<DiscountProps> = ({ classNames, discount, view }) => {
  const labelView = view === 'smallLabel';

  return (
    <div
      className={cn(style.label, classNames, {
        [style.smallLabel]: labelView,
      })}
    >
      <div
        className={cn(style.label__discount, {
          [style.smallLabel__discount]: labelView,
        })}
      >
        {discount}
      </div>

      <div
        className={cn(style.label__discountPercent, {
          [style.smallLabel__discountPercent]: labelView,
        })}
      >
        {'%'}
      </div>

      <div
        className={cn(style.label__discountOff, {
          [style.smallLabel__discountOff]: labelView,
        })}
      >
        {'off'}
      </div>
    </div>
  );
};
