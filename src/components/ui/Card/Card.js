import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { getPartOfString } from '../../../utils/getPartOfString';
import { Discount } from '../../ui/Discount/Discount';
import { ButtonFind } from '../../ui/buttons/ButtonFind';
import { ButtonsWithCounter } from '../../ui/buttons/ButtonsWithCounter';
import style from './card.module.scss';

export function Card(props) {
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

  const data = { discount, id, image, price, restaurantId, restaurantName, title };
  const { cart } = useSelector((state) => state.cart);
  const quantity = cart[restaurantId]?.items[id]?.quantity;

  const handlePlusProduct = () => {
    handleAddProduct(data);
  };

  const handleMinusProduct = () => {
    handleRemoveProduct(data);
  };

  const handleInputQuantity = (quantity) => handleInputCount({ id, quantity, restaurantId });

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

      <Link className={style.card__location}>
        <FontAwesomeIcon className={style.card__locationIcon} icon={faLocationDot} />
        {getPartOfString(restaurantName, 24)}
      </Link>

      <p className={style.card__price}>&#36; {price}</p>

      {quantity ? (
        <ButtonsWithCounter
          handleInputQuantity={handleInputQuantity}
          handleMinusProduct={handleMinusProduct}
          handlePlusProduct={handlePlusProduct}
          quantity={quantity ? quantity : 0}
        />
      ) : (
        <ButtonFind classNames={style.card__btn} handleClick={handlePlusProduct} label="Order Now" />
      )}
    </div>
  );
}
