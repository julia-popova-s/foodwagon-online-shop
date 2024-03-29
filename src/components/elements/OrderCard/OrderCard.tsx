import cn from 'classnames';
import { FC } from 'react';
import { Link } from 'react-router-dom';

import { CartProduct } from '../../../store/slices/cart/types';
import { DeliveryType } from '../../../store/slices/location/types';
import { Order } from '../../../store/slices/user/types';
import { BrandName } from '../BrandName';
import style from './orderCard.module.scss';

export const OrderCard: FC<Order> = ({
  date,
  deliveryType,
  list: { items, totalAmount, totalCount },
  location: { address },
  orderNumber,
  restaurantId,
  restaurantName,
}) => {
  const productList = Object.values(items);

  const orderDate = new Date(date).toLocaleDateString('en-RU', {
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className={style.card}>
      <div className={style.card__top}>
        <div className={style.card__detail}>
          <div className={style.card__detailItem}>Order dated {orderDate}</div>
          <div className={style.card__detailItem}>Order № {orderNumber}</div>
        </div>
        <div className={cn(style.card__detail, style.card__detail_theme)}>
          <div className={style.card__detailItem}> payable: &#36; {totalAmount.toFixed(2)}</div>
          <div className={style.card__detailItem}>
            {totalCount} {totalCount > 1 ? 'items' : 'item'}
          </div>
        </div>
      </div>

      <div className={style.card__bottom}>
        <div className={style.card__bottomText}>
          <div className={style.card__address}>
            <span className={style.card__delivery}>
              {deliveryType === DeliveryType.DELIVERY ? 'Delivery: ' : 'Pickup: '}
            </span>
            {typeof address === 'string' ? address : `${address.city}, ${address.street_addr}, ${address.house}`}
          </div>

          <BrandName id={productList[0]?.id} restaurantId={restaurantId} restaurantName={restaurantName} />
        </div>

        <div className={style.card__list}>
          {productList?.length &&
            productList.map(({ id, image, title }: CartProduct) => {
              return (
                <Link className={style.card__listItem} key={id} to={`/restaurant/${restaurantId}/product/${id}`}>
                  <img alt={title} className={style.card__listImg} src={image} width={100} />
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
};
