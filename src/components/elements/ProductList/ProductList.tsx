import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getDatabase, onValue, push, query, ref, set, update } from 'firebase/database';
import { useCallback, useEffect, useMemo, useState } from 'react';
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
import { idSelector, isAuthSelector, orderCounterSelector, setOrders } from '../../../store/slices/user/slice';
import { OrderItem } from '../../../store/slices/user/types';
import { OpeningStatus } from '../../../store/utils/getOpenStatus';
import { DeliveryMethod } from '../../elements/DeliveryMethod';
import { Button } from '../../elements/DeliveryMethod/DeliveryMethod';
import { Distance } from '../../elements/Distance';
import { OperatingStatus } from '../../elements/OperatingStatus';
import { PanelWithAddress } from '../../elements/PanelWithAaddress';
import { ProductCard } from '../../elements/ProductCard';
import { OrderButton } from '../../ui/buttons/OrderButton';
import { OrderInfoBlock } from '../OrderInfoBlock';
import style from './productList.module.scss';

export type RestaurantInfo = { restaurantId: string; restaurantName: string };

type ProductListProps = {
  handleOrderNumberChange: (counter: number) => void;
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
  const deliveryStatus = useAppSelector(deliveryStatusSelector);
  const isAuth = useAppSelector(isAuthSelector);
  const cart = useAppSelector(cartSelector);
  const coords = useAppSelector(coordsSelector);
  const address = useAppSelector(addressSelector);
  const userId = useAppSelector(idSelector);

  const [activeType, setActiveType] = useState(deliveryType);
  const [order, setOrder] = useState(0);

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

  const updateOrderCounter = () => {
    const counterRef = ref(getDatabase(), 'counter/');
    let count = 0;
    onValue(counterRef, (snapshot) => {
      const counter = snapshot.val() || 0;
      count = counter + 1;
      setOrder(count);
      return;
    });
    return update(ref(getDatabase()), { counter: count });
  };

  const writeUserData = (userId: string, orderInfo: OrderItem) => {
    const db = ref(getDatabase(), 'users/' + userId + '/');

    const newOrder = push(db);
    return set(newOrder, orderInfo);
  };

  const handlePlaceOrder = (id: string, name: string, isClosed: boolean) => {
    if (true) {
      if (!isAuth) {
        navigate('/login');
      } else {
        const list = cart[id];
        const item = listOfOperatingStatus.find((el) => el.id === id);
        const date = Date();

        if (deliveryType === DeliveryType.DELIVERY && deliveryStatus) {
          updateOrderCounter();
          const orderInfo = { date, deliveryType, id, list, location: { address, coords }, name, orderNumber: order };

          updateModalInfo(id, name);

          dispatch(setOrders(orderInfo));

          writeUserData(userId, orderInfo);
        } else if (deliveryType === DeliveryType.PICKUP && item?.address) {
          updateOrderCounter();

          const orderInfo = {
            date,
            deliveryType,
            id,
            list,
            location: { address: item?.address },
            name,
            orderNumber: order,
          };

          updateModalInfo(id, name);

          dispatch(setOrders(orderInfo));
          writeUserData(userId, orderInfo);
        } else {
          console.log('error');
        }
      }
    }
  };

  const updateModalInfo = (id: string, name: string) => {
    handleRestaurantInfoChange({ restaurantId: id, restaurantName: name });
    handleVisibleModal(true);
    handleOrderNumberChange(order);
  };

  const handleDeliveryTypeChange = useCallback((label: DeliveryType) => {
    setActiveType(label);
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
    <div className={style.cart} key={restaurantId}>
      <div className={style.cart__top}>
        <div className={style.cart__status}>
          <div className={style.cart__restaurantName}>{restaurantName}</div>

          <OperatingStatus classNames={style.cart__operatStatus} isClosed={isClosed} />
          {distance && (
            <Distance
              classNames={style.cart__distanceItem}
              deliveryType={deliveryType}
              distance={distance}
              isClosed={isClosed}
            />
          )}
        </div>

        <div className={style.cart__clear}>
          <button className={style.cart__clearBtn} onClick={() => handleClearCart({ restaurantId, restaurantName })}>
            <FontAwesomeIcon className={style.cart__clearIcon} icon={faTrashCan} size="lg" />
            clear
          </button>
        </div>
      </div>
      <div className={style.cart__deliveryСhoice}>
        <DeliveryMethod deliveryType={activeType} handleDeliveryTypeChange={handleDeliveryTypeChange} list={buttons} />
        <PanelWithAddress address={address} item={item} status={deliveryStatus} type={activeType} />
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
          <div className={style.cart__orderInfo}>
            <OrderInfoBlock price={price} quantity={quantity} />
            <OrderButton
              classNames={style.cart__orderBtn}
              handleClick={() => handlePlaceOrder(restaurantId, restaurantName, isClosed)}
              name={'Place an order'}
            />
          </div>
        </>
      ) : null}
    </div>
  );
};
