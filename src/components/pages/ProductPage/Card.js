import cn from 'classnames';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

import { getPartOfString } from '../../../utils/getPartOfString';
import { ButtonFind } from '../../ui/buttons/ButtonFind';
import { ButtonsWithCounter } from '../../ui/buttons/ButtonsWithCounter';
import style from './card.module.scss';

export function Card({
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
}) {
  const handleMinusProduct = () => {
    const data = { discount, id, image, price, restaurantId, restaurantName, title };
    handleRemoveProduct(data);
  };

  const { cart } = useSelector((state) => state.cart);

  const quantity = cart[restaurantId]?.items[id]?.quantity;

  const handleInputQuantity = (quantity) => handleInputCount({ id, price, quantity, restaurantId });

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

        {discount ? (
          <div className={style.card__discount}>
            {discount}
            <div className={style.card__discount_size}>%</div>
            <div className={style.card__discount_off}>off</div>
          </div>
        ) : null}
      </div>

      <div className={cn(style.card__info, style.info)}>
        <p className={style.info__title}>{title}</p>

        <p className={style.info__name}>
          <ReactSVG
            className={style.info__nameIcon}
            src={process.env.PUBLIC_URL + '/images/popular-items/map.svg'}
            wrapper="span"
          />

          <Link className={style.info__nameLink}>{restaurantName}</Link>
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

        <p className={style.info__ingredients}>Ingredients: {getPartOfString(ingredients.join(', '), 215)}</p>

        <div className={cn(style.info__btns, style.buttons)}>
          {quantity ? (
            <ButtonsWithCounter
              handleInputQuantity={handleInputQuantity}
              handleMinusProduct={handleMinusProduct}
              handlePlusProduct={handlePlusProduct}
              quantity={quantity ? quantity : 0}
            />
          ) : (
            <ButtonFind classNames={style.buttons__order} handleClick={handlePlusProduct} label="Order Now" />
          )}
        </div>
      </div>
    </div>
  );
}
