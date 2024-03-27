import { FC } from 'react';
import { Link } from 'react-router-dom';

import { CartProduct } from '../../../store/slices/cart/types';
import { DeliveryType } from '../../../store/slices/location/types';
import { OrderItem } from '../../../store/slices/user/types';
import style from './orderCard.module.scss';

export const OrderCard: FC<OrderItem> = ({
  date,
  deliveryType,
  id: restId,
  list: { items, totalAmount },
  location: { address },
  name,
  orderNumber,
}: OrderItem) => {
  const productList = Object.values(items);

  const orderDate = new Date(date).toLocaleDateString('en-RU', {
    day: 'numeric',
    month: 'long',
    // minute: '2-digit',
    // hour: '2-digit',
    // year: 'numeric',
  });

  return (
    <div className={style.card}>
      <div className={style.card__top}>
        <div className={style.card__text}>
          <div className={style.card__date}>Order dated {orderDate}</div>
          <div className={style.card__counter}>Order № {orderNumber}</div>
        </div>
        <div className={style.card__pay}>payable: &#36; {totalAmount.toFixed(2)}</div>
      </div>

      <div className={style.card__bottom}>
        <div className={style.card__bottomText}>
          <div className={style.card__address}>
            {deliveryType === DeliveryType.DELIVERY ? 'Delivery to address: ' : 'Pickup from address: '}
            {typeof address === 'string' ? address : `${address.city}, ${address.street_addr}, ${address.house}`}
          </div>
          <div className={style.card__name}>
            <Link to={`/restaurant/${restId}/product/${productList[0].id}`}>{name}</Link>
          </div>
        </div>

        <div className={style.card__list}>
          {productList?.length &&
            productList.map(({ id, image, title }: CartProduct) => {
              return (
                <Link className={style.card__listItem} key={id} to={`/restaurant/${restId}/product/${id}`}>
                  <img alt={title} className={style.card__listImg} src={image} width={100} />
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
};
