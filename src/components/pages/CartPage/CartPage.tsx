import cn from 'classnames';
import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { useOutsideClick } from '../../../hooks/useOutsideClick';
import { useAppDispatch, useAppSelector } from '../../../store';
import { addedGoodsSelector, clearCart, totalQuantitySelector } from '../../../store/slices/cart/slice';
import { changeOrderNumber, orderNumberSelector } from '../../../store/slices/user/slice';
import { Popup } from '../../ui/Popup';
import { Modal } from './Modal';
import { ProductList, RestaurantInfo } from './ProductList';
import style from './cartPage.module.scss';

export const Cart: FC = () => {
  const { pathname } = useLocation();

  const [name, setName] = useState<string>('');
  const [id, setId] = useState<string>('');

  const [visiblePopup, setVisiblePopup] = useState<boolean>(false);
  const [visibleModal, setVisibleModal] = useState<boolean>(false);

  const totalQuantity = useAppSelector(totalQuantitySelector);
  const addedGoods = useAppSelector(addedGoodsSelector);
  const orderNumber = useAppSelector(orderNumberSelector);

  const dispatch = useAppDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

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

  const handleRestaurantInfoChange = ({ restaurantId, restaurantName }: RestaurantInfo) => {
    setName(restaurantName);
    setId(restaurantId);
  };

  const handleVisibleModal = (status: boolean) => {
    setVisibleModal(status);
  };

  const handleVisiblePopup = (status: boolean) => {
    setVisiblePopup(status);
  };

  const handleOrderNumberChange = () => {
    dispatch(changeOrderNumber());
  };

  return (
    <div className={style.cart}>
      <div className={cn(style.cart__container, 'container')}>
        <h1 className={style.cart__title}>Shopping cart</h1>
        <div className={style.cart__inner}>
          {totalQuantity &&
            addedGoods.map((restaurant) => (
              <ProductList
                handleOrderNumberChange={handleOrderNumberChange}
                handleRestaurantInfoChange={handleRestaurantInfoChange}
                handleVisibleModal={handleVisibleModal}
                handleVisiblePopup={handleVisiblePopup}
                key={uuidv4()}
                restaurantInfo={restaurant}
              />
            ))}
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
