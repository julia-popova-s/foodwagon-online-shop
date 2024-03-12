import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames';
import { FC } from 'react';
import { Link } from 'react-router-dom';

import { useAppSelector } from '../../../store';
import { cartSelector } from '../../../store/slices/cart/slice';
import { getPartOfString } from '../../../utils/getPartOfString';
import { Discount } from '../Discount/Discount';
import { CounterAndButton } from '../buttons/CounterAndButton';
import { SearchButton } from '../buttons/SearchButton';
import style from './card.module.scss';

type ProductQuantity = {
  id: string;
  price: number;
  quantity: number;
  restaurantId: string;
};

type Product = {
  discount: number;
  id: string;
  image: string;
  price: number;
  restaurantId: string;
  restaurantName: string;
  title: string;
};

type CardProps = {
  classNames: string;
  discount: number;
  handleAddProduct: (item: Product) => void;
  handleInputCount: (item: ProductQuantity) => void;
  handleRemoveProduct: (item: Product) => void;
  id: string;
  image: string;
  price: number;
  quantity?: number;
  restaurantId: string;
  restaurantName: string;
  title: string;
};

export const Card: FC<CardProps> = (props) => {
  const {
    classNames,
    discount,
    handleAddProduct,
    handleInputCount,
    handleRemoveProduct,
    id,
    image,
    price,
    restaurantId,
    restaurantName,
    title,
  } = props;

  const data: Product = { discount, id, image, price, restaurantId, restaurantName, title };

  const cart = useAppSelector(cartSelector);

  const quantity: number = cart[restaurantId]?.items[id]?.quantity;

  const handlePlusProduct = () => {
    handleAddProduct(data);
  };

  const handleMinusProduct = () => {
    handleRemoveProduct(data);
  };

  const handleInputQuantity = (quantity: number) => handleInputCount({ id, price, quantity, restaurantId });

  return (
    <div className={cn(style.card, classNames)}>
      <div className={style.card__up}>
        <Link className={style.card__upLink} to={`/restaurant/${restaurantId}/product/${id}`}>
          <img alt="food" className={style.card__image} src={process.env.PUBLIC_URL + image} />
          {discount > 0 && <Discount discount={discount} view={'smallLabel'} />}
        </Link>
      </div>

      <Link className={style.card__name} to={`/restaurant/${restaurantId}/product/${id}`}>
        {getPartOfString(title, 47)}
      </Link>

      <Link className={style.card__location} to={`/restaurant/${restaurantId}/product/${id}`}>
        <FontAwesomeIcon className={style.card__locationIcon} icon={faLocationDot} />
        {getPartOfString(restaurantName, 24)}
      </Link>

      <p className={style.card__price}>&#36; {price}</p>

      {quantity ? (
        <CounterAndButton
          handleInputQuantity={handleInputQuantity}
          handleMinusProduct={handleMinusProduct}
          handlePlusProduct={handlePlusProduct}
          quantity={quantity ? quantity : 0}
        />
      ) : (
        <SearchButton classNames={style.card__btn} handleClick={handlePlusProduct} label="Order Now" />
      )}
    </div>
  );
};
