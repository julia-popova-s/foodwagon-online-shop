import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { useOutsideClick } from '../../../hooks/useOutsideClick';
import { useAppDispatch, useAppSelector } from '../../../store';
import {
  addProduct,
  addedGoodsSelector,
  cartSelector,
  clearCart,
  deleteOneProduct,
  removeProduct,
  setProductCount,
  totalQuantitySelector,
} from '../../../store/slices/cart/slice';
import { Product, ProductInfoIds, ProductInfoQuantity } from '../../../store/slices/cart/types';
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
import { isAuthSelector, setOrders } from '../../../store/slices/user/slice';
import { OpeningStatus } from '../../../store/utils/getOpenStatus';
import { Distance } from '../../elements/FeaturedRestaurants/Distance';
import { OperatingStatus } from '../../elements/FeaturedRestaurants/OperatingStatus';
import { Button, DeliveryMethod } from '../../elements/FindFood/DeliveryMethod';
import { Popup } from '../../ui/Popup';
import { OrderButton } from '../../ui/buttons/OrderButton';
import { DeliveryAddress } from './DeliveryAddress';
import { Modal } from './Modal';
import { ProductCard } from './ProductCard';
import style from './cartPage.module.scss';

let orderNumber = 0;

type Restaurant = { restaurantId: string; restaurantName: string };

export const Cart: FC = () => {
  const { pathname } = useLocation();

  const [name, setName] = useState<string>('');
  const [id, setId] = useState<string>('');

  const [visiblePopup, setVisiblePopup] = useState<boolean>(false);
  const [visibleModal, setVisibleModal] = useState<boolean>(false);

  const totalQuantity = useAppSelector(totalQuantitySelector);
  const addedGoods = useAppSelector(addedGoodsSelector);
  const isAuth = useAppSelector(isAuthSelector);
  const cart = useAppSelector(cartSelector);
  const deliveryType = useAppSelector(deliveryTypeSelector);
  const deliveryStatus = useAppSelector(deliveryStatusSelector);
  const address = useAppSelector(addressSelector);
  const coords = useAppSelector(coordsSelector);
  const listOfDistance = useAppSelector(listOfDistancesSelector);
  const listOfOperatingStatus = useAppSelector(listOfOperatingStatusSelector);

  const handleChangeDeliveryType = useCallback((label: DeliveryType) => {
    dispatch(setDeliveryType(label));
  }, []);

  const buttons: Button[] = useMemo(() => [{ label: DeliveryType.DELIVERY }, { label: DeliveryType.PICKUP }], []);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const handleClearCart = ({ restaurantId, restaurantName }: Restaurant) => {
    setName(restaurantName);
    setId(restaurantId);
    setVisiblePopup(true);
  };

  const handleRemoveProduct = (item: ProductInfoIds) => {
    dispatch(removeProduct(item));
  };

  const handleAddProduct = (product: Product) => {
    dispatch(addProduct(product));
  };

  const handleDeleteProduct = (item: ProductInfoIds, count: number) => {
    if (count < 1) {
      dispatch(removeProduct(item));
    } else dispatch(deleteOneProduct(item));
  };

  const handleInputQuantity = (obj: ProductInfoQuantity) => {
    dispatch(setProductCount(obj));
  };

  const handlePlaceAnOrder = (id: string, name: string, isClosed: boolean) => {
    if (isClosed) {
    } else {
      const list = cart[id];
      if (!isAuth) {
        navigate('/login');
      } else {
        setName(name);
        setId(id);
        orderNumber++;
        const item = listOfOperatingStatus.find((el) => el.id === id);
        if (!isClosed && deliveryStatus === DeliveryStatus.YES && deliveryType === DeliveryType.DELIVERY) {
          dispatch(setOrders({ deliveryType, id, list, location: { address, coords }, name, orderNumber }));
        }
        if (!isClosed && deliveryType === DeliveryType.PICKUP && item?.address) {
          dispatch(setOrders({ deliveryType, id, list, location: { address: item?.address }, name, orderNumber }));
        }
        setVisibleModal(true);
      }
    }
  };

  const handleClosePopup = () => {
    setVisiblePopup(false);
  };

  const handleClearOrder = () => {
    dispatch(clearCart({ restaurantId: id }));
    setVisiblePopup(false);
  };

  const handleCloseModal = () => {
    dispatch(clearCart({ restaurantId: id }));
    setVisibleModal(false);
  };

  const popupRef = useOutsideClick(handleClosePopup);

  if (!totalQuantity) {
    return (
      <div className={style.cart}>
        <div className={cn(style.cart__container, 'container')}>
          <div className={style.cart__inner}>
            <div className={style.cart__empty}>
              <p className={style.cart__name}>Shopping cart is empty</p>
              <p className={style.cart__message}>Use the search to find everything you need.</p>
              <p className={style.cart__links}>
                Go to{' '}
                <Link className={style.cart__linkItem} to="/search">
                  search page
                </Link>{' '}
                or{' '}
                <Link className={style.cart__linkItem} to={'/'}>
                  menu
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={style.cart}>
      <div className={cn(style.cart__container, 'container')}>
        <h1 className={style.cart__title}>Shopping cart</h1>
        <div className={style.cart__inner}>
          {totalQuantity &&
            addedGoods.map((restaurant) => {
              const [restaurantId, info] = restaurant;
              const products = Object.values(info.items);

              const price = info.totalAmount;
              const quantity = info.totalCount;
              const restaurantName = products[0] && products[0].restaurantName;
              const distance = listOfDistance?.find((el: any) => el.id === restaurantId)?.distance;
              const item = listOfOperatingStatus.find((el) => el.id === restaurantId);
              const status = deliveryType === DeliveryType.DELIVERY ? item?.deliveryEnabled : item?.pickupEnabled;
              const isClosed = status === OpeningStatus.CLOSED;
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
                      <button
                        className={style.cart__clearBtn}
                        onClick={() => handleClearCart({ restaurantId, restaurantName })}
                      >
                        <FontAwesomeIcon className={style.cart__clearIcon} icon={faTrashCan} size="lg" />
                        clear
                      </button>
                    </div>
                  </div>
                  <div className={style.cart__deliveryСhoice}>
                    <DeliveryMethod handleChangeDeliveryType={handleChangeDeliveryType} list={buttons} />
                    <DeliveryAddress address={address} item={item} status={deliveryStatus} type={deliveryType} />
                  </div>

                  {quantity ? (
                    <>
                      {products.map(({ quantity, ...item }) => {
                        return (
                          <ProductCard
                            {...item}
                            handleAddProduct={(item) => handleAddProduct(item)}
                            handleDeleteProduct={(obj) => handleDeleteProduct(obj, quantity)}
                            handleInputCount={(obj) => handleInputQuantity(obj)}
                            handleRemoveProduct={(obj) => handleRemoveProduct(obj)}
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
            })}
        </div>
      </div>

      <Modal handleCloseModal={handleCloseModal} isOpen={visibleModal} name={name} orderNumber={orderNumber} />
      <Popup handleClickClose={handleClosePopup} handleClickOk={handleClearOrder} isOpen={visiblePopup} ref={popupRef}>
        <>
          Are you sure you want to empty the cart from <span className={style.popup__name}>«{name}»</span>?
        </>
      </Popup>
    </div>
  );
};
