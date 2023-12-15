import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames';
import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';

import { useOutsideClick } from '../../../hooks/useOutsideClick';
import { useAppDispatch } from '../../../store';
import {
  Product,
  ProductInfoIds,
  ProductInfoQuantity,
  addedGoodsSelector,
  cartSelector,
  totalQuantitySelector,
} from '../../../store/reducers/cart';
import { addProduct, clearCart, deleteOneProduct, removeProduct, setProductCount } from '../../../store/reducers/cart';
import { isAuthSelector, setOrders } from '../../../store/reducers/user';
import { Popup } from '../../ui/Popup';
import { OrderButton } from '../../ui/buttons/OrderButton';
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

  const addedGoods = useSelector(addedGoodsSelector);
  const cart = useSelector(cartSelector);
  const totalQuantity = useSelector(totalQuantitySelector);
  const isAuth = useSelector(isAuthSelector);

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

  const handlePlaceAnOrder = (id: string, name: string) => {
    const list = cart[id];
    if (!isAuth) {
      navigate('/login');
    } else {
      setName(name);
      setId(id);
      orderNumber++;
      setVisibleModal(true);
      dispatch(setOrders({ id, list, name, orderNumber }));
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

              return (
                <div className={style.cart__list} key={restaurantId}>
                  <div className={style.cart__top}>
                    <div className={style.cart__restaurantName}>{restaurantName}</div>
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
                          handleClick={() => handlePlaceAnOrder(restaurantId, restaurantName)}
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
