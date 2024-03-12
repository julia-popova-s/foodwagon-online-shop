import cn from 'classnames';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

import { useAppSelector } from '../../../store';
import { cartSelector } from '../../../store/slices/cart/slice';
import { Product, ProductInfoQuantity } from '../../../store/slices/cart/types';
import { getListProducts } from '../../../utils/getListProducts';
import { getPartOfString } from '../../../utils/getPartOfString';
import { Discount } from '../../ui/Discount';
import { CounterAndButton } from '../../ui/buttons/CounterAndButton';
import { SearchButton } from '../../ui/buttons/SearchButton';
import style from './card.module.scss';

type CardProps = {
  classNames?: string;
  discount: number;
  handleAddProduct: (item: Product) => void;
  handleInputCount: (item: ProductInfoQuantity) => void;
  handleRemoveProduct: (item: Product) => void;
  id: string;
  image: string;
  ingredients: string[];
  price: number;
  restaurantId: string;
  restaurantName: string;
  title: string;
};

export const Card: FC<CardProps> = ({
  discount,
  handleAddProduct,
  handleInputCount,
  handleRemoveProduct,
  id,
  image,
  ingredients,
  price,
  restaurantId,
  restaurantName,
  title,
}) => {
  const handleMinusProduct = () => {
    const data = { discount, id, image, price, restaurantId, restaurantName, title };
    handleRemoveProduct(data);
  };

  const cart = useAppSelector(cartSelector);

  const quantity = cart[restaurantId]?.items[id]?.quantity;

  const handleInputQuantity = (quantity: number) => handleInputCount({ id, quantity, restaurantId });

  const handlePlusProduct = () => {
    handleAddProduct({
      discount,
      id,
      image,
      price,
      restaurantId,
      restaurantName,
      title,
    });
  };

  return (
    <div className={style.card}>
      <div className={style.card__left}>
        <img alt={title} className={style.card__image} src={`${process.env.PUBLIC_URL}${image}`} />
        {discount ? <Discount classNames={style.card__discount} discount={discount} /> : null}

        {!!discount && <Discount classNames={style.discount} discount={discount} view={'smallLabel'} />}
      </div>

      <div className={cn(style.card__info, style.info)}>
        <p className={style.info__title}>{title}</p>

        <p className={style.info__name}>
          <ReactSVG
            className={style.info__nameIcon}
            src={process.env.PUBLIC_URL + '/images/popular-items/map.svg'}
            wrapper="span"
          />

          <Link className={style.info__nameLink} to={''}>
            {restaurantName}
          </Link>
        </p>

        <div className={style.info__prices}>
          <div
            className={cn(style.info__price, {
              [style.info__price_theme]: discount,
            })}
          >
            &#36; {price}
          </div>

          {discount ? (
            <div className={style.info__price}>&#36; {(price - (price * discount) / 100).toFixed(2)}</div>
          ) : null}
        </div>

        <p className={style.info__ingredients}>Ingredients: {getPartOfString(getListProducts(ingredients), 215)}</p>

        <div className={cn(style.info__btns, style.buttons)}>
          {quantity ? (
            <CounterAndButton
              handleInputQuantity={handleInputQuantity}
              handleMinusProduct={handleMinusProduct}
              handlePlusProduct={handlePlusProduct}
              quantity={quantity ? quantity : 0}
            />
          ) : (
            <SearchButton classNames={style.buttons__order} handleClick={handlePlusProduct} label="Order Now" />
          )}
        </div>
      </div>
    </div>
  );
};
