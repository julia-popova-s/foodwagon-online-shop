import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames';
import { FC } from 'react';
import { Link } from 'react-router-dom';

import { useAppSelector } from '../../../store';
import { cartSelector } from '../../../store/slices/cart/slice';
import { getPartOfString } from '../../../utils/getPartOfString';
import { PriceBlock } from '../../elements/PriceBlock';
import { Discount } from '../Discount/Discount';
import { CounterWithButton } from '../buttons/CounterWithButton';
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
  handleCountInput: (item: ProductQuantity) => void;
  handleProductAdd: (item: Product) => void;
  handleProductRemove: (item: Product) => void;
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
    handleCountInput,
    handleProductAdd,
    handleProductRemove,
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

  const handleProductPlus = () => {
    handleProductAdd(data);
  };

  const handleProductMinus = () => {
    handleProductRemove(data);
  };

  const handleQuantityInput = (quantity: number) => handleCountInput({ id, price, quantity, restaurantId });

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

      <PriceBlock classNames={style.card__price} discount={discount} price={price} />

      {quantity ? (
        <CounterWithButton
          classNames={style.card__counter}
          handleProductMinus={handleProductMinus}
          handleProductPlus={handleProductPlus}
          handleQuantityInput={handleQuantityInput}
          quantity={quantity ? quantity : 0}
        />
      ) : (
        <SearchButton classNames={style.card__btn} handleClick={handleProductPlus} label="Order Now" />
      )}
    </div>
  );
};
