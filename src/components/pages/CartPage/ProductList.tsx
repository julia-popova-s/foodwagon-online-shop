import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames';
import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../store';
import {
  addProduct,
  cartSelector,
  deleteOneProduct,
  removeProduct,
  setProductCount,
} from '../../../store/slices/cart/slice';
import { AddedGoodsItem, Product, ProductInfoIds, ProductInfoQuantity } from '../../../store/slices/cart/types';
import {
  addressSelector,
  coordsSelector,
  deliveryStatusSelector,
  deliveryTypeSelector,
  listOfDistancesSelector,
  setDeliveryType,
} from '../../../store/slices/location/slice';
import { DeliveryStatus, DeliveryType } from '../../../store/slices/location/types';
import { listOfOperatingStatusSelector } from '../../../store/slices/restaurants/slice';
import { isAuthSelector, orderNumberSelector, setOrders } from '../../../store/slices/user/slice';
import { OpeningStatus } from '../../../store/utils/getOpenStatus';
import { Distance } from '../../elements/FeaturedRestaurants/Distance';
import { OperatingStatus } from '../../elements/FeaturedRestaurants/OperatingStatus';
import { Button, DeliveryMethod } from '../../elements/FindFood/DeliveryMethod';
import { OrderButton } from '../../ui/buttons/OrderButton';
import { DeliveryAddress } from './DeliveryAddress';
import { ProductCard } from './ProductCard';
import style from './productList.module.scss';

export type RestaurantInfo = { restaurantId: string; restaurantName: string };

type ProductListProps = {
  handleOrderNumberChange: () => void;
  handleRestaurantInfoChange: ({ restaurantId, restaurantName }: RestaurantInfo) => void;
  handleVisibleModal: (status: boolean) => void;
  handleVisiblePopup: (status: boolean) => void;
  restaurantInfo: AddedGoodsItem;
};

export const ProductList = ({
  handleOrderNumberChange,
  handleRestaurantInfoChange,
  handleVisibleModal,
  handleVisiblePopup,
  restaurantInfo,
}: ProductListProps) => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const listOfDistance = useAppSelector(listOfDistancesSelector);
  const listOfOperatingStatus = useAppSelector(listOfOperatingStatusSelector);
  const deliveryType = useAppSelector(deliveryTypeSelector);
  const isAuth = useAppSelector(isAuthSelector);
  const cart = useAppSelector(cartSelector);
  const coords = useAppSelector(coordsSelector);
  const address = useAppSelector(addressSelector);
  const deliveryStatus = useAppSelector(deliveryStatusSelector);
  const orderNumber = useAppSelector(orderNumberSelector);

  const [order, setOrder] = useState(orderNumber);

  const buttons: Button[] = useMemo(() => [{ label: DeliveryType.DELIVERY }, { label: DeliveryType.PICKUP }], []);

  const [restaurantId, info] = restaurantInfo;
  const products = Object.values(info.items);
  const price = info.totalAmount;
  const quantity = info.totalCount;
  const restaurantName = products[0] && products[0]?.restaurantName;
  const distance = listOfDistance?.find((el: any) => el.id === restaurantId)?.distance;
  const item = listOfOperatingStatus.find((el) => el.id === restaurantId);
  const status = deliveryType === DeliveryType.DELIVERY ? item?.deliveryEnabled : item?.pickupEnabled;
  const isClosed = status === OpeningStatus.CLOSED;

  const handlePlaceAnOrder = (id: string, name: string, isClosed: boolean) => {
    if (isClosed) {
    } else {
      const list = cart[id];
      if (!isAuth) {
        navigate('/login');
      } else {
        const item = listOfOperatingStatus.find((el) => el.id === id);
        if (!isClosed && deliveryStatus === DeliveryStatus.YES && deliveryType === DeliveryType.DELIVERY) {
          changeOrderNumber(id, name);
          dispatch(setOrders({ deliveryType, id, list, location: { address, coords }, name, orderNumber: order }));
        }
        if (!isClosed && deliveryType === DeliveryType.PICKUP && item?.address) {
          changeOrderNumber(id, name);
          dispatch(
            setOrders({ deliveryType, id, list, location: { address: item?.address }, name, orderNumber: order }),
          );
        }
      }
    }
  };

  const changeOrderNumber = (id: string, name: string) => {
    handleOrderNumberChange();
    handleRestaurantInfoChange({ restaurantId: id, restaurantName: name });
    handleVisibleModal(true);
    setOrder(order + 1);
  };

  const handleDeliveryTypeChange = useCallback((label: DeliveryType) => {
    dispatch(setDeliveryType(label));
  }, []);

  const handleClearCart = ({ restaurantId, restaurantName }: RestaurantInfo) => {
    handleRestaurantInfoChange({ restaurantId, restaurantName });
    handleVisiblePopup(true);
  };

  const handleProductAdd = (product: Product) => {
    dispatch(addProduct(product));
  };

  const handleProductDelete = (item: ProductInfoIds, count: number) => {
    if (count < 1) {
      dispatch(removeProduct(item));
    } else dispatch(deleteOneProduct(item));
  };

  const handleQuantityInput = (obj: ProductInfoQuantity) => {
    dispatch(setProductCount(obj));
  };

  const handleProductRemove = (item: ProductInfoIds) => {
    dispatch(removeProduct(item));
  };

  return (
    <div className={style.cart__list} key={restaurantId}>
      <div className={style.cart__top}>
        <div className={style.cart__status}>
          <div className={style.cart__restaurantName}>{restaurantName}</div>

          <OperatingStatus classNames={style.cart__operatStatus} isClosed={isClosed} />
          <Distance
            classNames={style.cart__distanceItem}
            deliveryType={deliveryType}
            distance={distance}
            isClosed={isClosed}
          />
        </div>

        <div className={style.cart__clear}>
          <button className={style.cart__clearBtn} onClick={() => handleClearCart({ restaurantId, restaurantName })}>
            <FontAwesomeIcon className={style.cart__clearIcon} icon={faTrashCan} size="lg" />
            clear
          </button>
        </div>
      </div>
      <div className={style.cart__deliveryСhoice}>
        <DeliveryMethod handleDeliveryTypeChange={handleDeliveryTypeChange} list={buttons} />
        <DeliveryAddress address={address} item={item} status={deliveryStatus} type={deliveryType} />
      </div>

      {quantity ? (
        <>
          {products.map(({ quantity, ...item }: any) => {
            return (
              <ProductCard
                {...item}
                handleCountInput={(obj) => handleQuantityInput(obj)}
                handleProductAdd={(item) => handleProductAdd(item)}
                handleProductDelete={(obj) => handleProductDelete(obj, quantity)}
                handleProductRemove={(obj) => handleProductRemove(obj)}
                key={item.id}
                quantity={quantity}
              />
            );
          })}
          <div className={cn(style.cart__orderInfo, style.cart__orderInfo_border)}>
            <p className={style.cart__result}>
              Your order for the total amount{' '}
              <span className={style.cart__result_color}>&#36;{price && price.toFixed(2)}</span> and{' '}
              <span className={style.cart__result_color}>{quantity}</span> items
            </p>
            <OrderButton
              classNames={style.cart__orderBtn}
              handleClick={() => handlePlaceAnOrder(restaurantId, restaurantName, isClosed)}
              name={'Place an order'}
            />
          </div>
        </>
      ) : null}
    </div>
  );
};
