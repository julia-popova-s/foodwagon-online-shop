import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames';
import { child, get, getDatabase, push, ref, set, update } from 'firebase/database';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
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
} from '../../../store/slices/location/slice';
import { DeliveryStatus, DeliveryType } from '../../../store/slices/location/types';
import { listOfOperatingStatusSelector } from '../../../store/slices/restaurants/slice';
import { idSelector, isAuthSelector, setOrders } from '../../../store/slices/user/slice';
import { Order, OrderListItem } from '../../../store/slices/user/types';
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

export type RestaurantInfo = { orderNumber?: number; restaurantId: string; restaurantName: string };

type ProductListProps = {
  handleRestaurantInfoChange: ({ orderNumber, restaurantId, restaurantName }: RestaurantInfo) => void;
  handleVisibleModal: (status: boolean) => void;
  handleVisiblePopup: (status: boolean) => void;
  restaurantInfo: AddedGoodsItem;
};

export const ProductList: FC<ProductListProps> = ({
  handleRestaurantInfoChange,
  handleVisibleModal,
  handleVisiblePopup,
  restaurantInfo,
}) => {
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
  const [isLoaded, setIsLoaded] = useState(false);
  const [orderNumber, setOrderNumber] = useState(0);
  const [orderInfo, setOrderInfo] = useState<OrderListItem>();
  const [isMessage, setIsMessage] = useState(false);

  const buttons: Button[] = useMemo(() => [{ label: DeliveryType.DELIVERY }, { label: DeliveryType.PICKUP }], []);

  const [restaurantId, info] = restaurantInfo;
  const products = Object.values(info.items);
  const price = info.totalAmount;
  const quantity = info.totalCount;
  const restaurantName = products[0] && products[0]?.restaurantName;
  const distance = listOfDistance?.find((el: any) => el.id === restaurantId)?.distance;
  const item = listOfOperatingStatus.find((el) => el.id === restaurantId);
  const status = activeType === DeliveryType.DELIVERY ? item?.deliveryEnabled : item?.pickupEnabled;
  const isClosed = status === OpeningStatus.CLOSED;
  const isOpened = status === OpeningStatus.OPENED;

  const updateOrderCounter = () => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, 'counter/')).then((snapshot) => {
      const count: number = snapshot.val() + 1 || 0;
      setIsLoaded(true);
      setOrderNumber(count);
    });
  };

  useEffect(() => {
    if (isLoaded && orderNumber && orderInfo) {
      const order: Order = { ...orderInfo, orderNumber };
      writeUserData(userId, order);
      updateDatabase(order);
    }
  }, [isLoaded]);

  const updateDatabase = (order: Order) => {
    update(ref(getDatabase()), { 'counter/': orderNumber });
    updateModalInfo({ orderNumber, restaurantId, restaurantName });
    dispatch(setOrders(order));
  };

  const writeUserData = (userId: string, orderInfo: Order) => {
    const db = ref(getDatabase(), 'users/' + userId + '/');

    const newOrder = push(db);
    return set(newOrder, orderInfo);
  };

  const handlePlaceOrder = (restaurantId: string, restaurantName: string) => {
    if (isClosed) {
      setIsMessage(true);
    }

    if (!isAuth && isOpened) {
      navigate('/login');
    }

    if (isAuth && isOpened) {
      const list = cart[restaurantId];
      const date = Date();

      if (activeType === DeliveryType.DELIVERY && deliveryStatus === DeliveryStatus.YES) {
        updateOrderCounter();
        const orderInfo = {
          date,
          deliveryType: activeType,
          list,
          location: { address, coords },
          restaurantId,
          restaurantName,
        };
        setOrderInfo(orderInfo);
      } else if (activeType === DeliveryType.PICKUP && item?.address) {
        updateOrderCounter();
        const orderInfo = {
          date,
          deliveryType: activeType,
          list,
          location: { address: item?.address },
          restaurantId,
          restaurantName,
        };
        setOrderInfo(orderInfo);
      } else {
        console.log('error');
      }
      return;
    }
  };

  const updateModalInfo = (options: RestaurantInfo) => {
    handleRestaurantInfoChange(options);
    handleVisibleModal(true);
  };

  const handleDeliveryTypeChange = useCallback((label: DeliveryType) => {
    setActiveType(label);
  }, []);

  const handleCartDelete = (options: RestaurantInfo) => {
    handleRestaurantInfoChange(options);
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

          {status && <OperatingStatus classNames={style.cart__operatStatus} isClosed={isClosed} isOpened={isOpened} />}
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
          <button className={style.cart__clearBtn} onClick={() => handleCartDelete({ restaurantId, restaurantName })}>
            <FontAwesomeIcon className={style.cart__clearIcon} icon={faTrashCan} size="lg" />
            clear
          </button>
        </div>
      </div>
      <div className={style.cart__deliveryСhoice}>
        <DeliveryMethod deliveryType={activeType} handleDeliveryTypeChange={handleDeliveryTypeChange} list={buttons} />
        <PanelWithAddress
          address={address}
          isClosed={isMessage}
          item={item}
          status={deliveryStatus}
          type={activeType}
        />
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
              classNames={cn(style.cart__orderBtn)}
              handleClick={() => handlePlaceOrder(restaurantId, restaurantName)}
              name={'Place an order'}
            />
          </div>
        </>
      ) : null}
    </div>
  );
};
