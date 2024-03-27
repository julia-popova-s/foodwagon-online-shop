import { FC } from 'react';

import { CartProduct } from '../../../store/slices/cart/types';
import { OrderItem } from '../../../store/slices/user/types';

export const OrderCard: FC<OrderItem> = ({
  date,
  deliveryType,
  list: { items, totalAmount },
  location: { address },
  name,
  orderNumber,
}: OrderItem) => {
  const productList = Object.values(items);
  const orderDate = new Date(date).toLocaleDateString('en-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div>
          <div>Order dated {orderDate}</div>
          <div>{orderNumber}</div>
        </div>
        <div>
          <div>--{totalAmount}</div>
        </div>
      </div>
      <div>{deliveryType}</div>
      <div>{typeof address === 'string' ? address : address.street_addr}</div>

      <div>{name}</div>
      <div style={{ display: 'flex', gap: '20px' }}>
        {productList?.length &&
          productList.map(({ discount, id, image, price, title }: CartProduct) => {
            return (
              <div key={id} style={{ maxWidth: '100px' }}>
                <img alt={title} key={id} src={image} width={100} />
              </div>
            );
          })}
      </div>
    </div>
  );
};
