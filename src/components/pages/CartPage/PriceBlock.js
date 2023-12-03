import cn from 'classnames';

import style from './priceBlock.module.scss';

export function PriceBlock({ classNames, discount, price }) {
  return (
    <div className={style.priceBlock}>
      {discount ? (
        <div className={cn(style.priceBlock__price, classNames)}>
          &#36; {(price - (price * discount) / 100).toFixed(2)}
        </div>
      ) : null}

      <div
        className={cn(style.priceBlock__price, classNames, {
          [style.priceBlock__price_theme]: discount,
        })}
      >
        &#36;{price.toFixed(2)}
      </div>
    </div>
  );
}
