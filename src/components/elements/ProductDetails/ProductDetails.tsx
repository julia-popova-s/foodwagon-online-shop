import cn from 'classnames';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

import { useAppSelector } from '../../../store';
import { cartSelector } from '../../../store/slices/cart/slice';
import { Product, ProductInfoQuantity } from '../../../store/slices/cart/types';
import { deliveryTypeSelector } from '../../../store/slices/location/slice';
import { DeliveryType } from '../../../store/slices/location/types';
import { listOfOperatingStatusSelector } from '../../../store/slices/restaurants/slice';
import { OpeningStatus } from '../../../store/utils/getOpenStatus';
import { getListProducts } from '../../../utils/getListProducts';
import { getPartOfString } from '../../../utils/getPartOfString';
import { Discount } from '../../ui/Discount';
import { CounterWithButton } from '../../ui/buttons/CounterWithButton';
import { SearchButton } from '../../ui/buttons/SearchButton';
import { OperatingStatus } from '../OperatingStatus';
import { PriceBlock } from '../PriceBlock';
import style from './productDetails.module.scss';

type ProductDetailsProps = {
  classNames?: string;
  discount: number;
  handleCountInput: (item: ProductInfoQuantity) => void;
  handleProductAdd: (item: Product) => void;
  handleProductRemove: (item: Product) => void;
  id: string;
  image: string;
  ingredients: string[];
  price: number;
  restaurantId: string;
  restaurantName: string;
  title: string;
};

export const ProductDetails: FC<ProductDetailsProps> = ({
  discount,
  handleCountInput,
  handleProductAdd,
  handleProductRemove,
  id,
  image,
  ingredients,
  price,
  restaurantId,
  restaurantName,
  title,
}) => {
  const handleProductMinus = () => {
    const data = { discount, id, image, price, restaurantId, restaurantName, title };
    handleProductRemove(data);
  };

  const cart = useAppSelector(cartSelector);
  const listOfOperatingStatus = useAppSelector(listOfOperatingStatusSelector);
  const deliveryType = useAppSelector(deliveryTypeSelector);

  const item = listOfOperatingStatus.find((el) => el.id === restaurantId);
  const status = deliveryType === DeliveryType.DELIVERY ? item?.deliveryEnabled : item?.pickupEnabled;

  const quantity = cart[restaurantId]?.items[id]?.quantity;

  const handleInputQuantity = (quantity: number) => handleCountInput({ id, quantity, restaurantId });

  const handleProductPlus = () => {
    handleProductAdd({
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

        <div className={style.info__name}>
          <Link className={style.info__nameLink} to={''}>
            <ReactSVG
              className={style.info__nameIcon}
              src={process.env.PUBLIC_URL + '/images/popular-items/map.svg'}
              wrapper="span"
            />
            {restaurantName}
          </Link>
          {status && (
            <OperatingStatus
              classNames={style.info__nameStatus}
              isClosed={status === OpeningStatus.CLOSED}
              isOpened={status === OpeningStatus.OPENED}
            />
          )}
        </div>
        <PriceBlock classNames={style.info__prices} discount={discount} price={price} />

        <p className={style.info__ingredients}>Ingredients: {getPartOfString(getListProducts(ingredients), 215)}</p>

        <div className={cn(style.info__btns, style.buttons)}>
          {quantity ? (
            <CounterWithButton
              classNames={style.info__btns_theme}
              handleProductMinus={handleProductMinus}
              handleProductPlus={handleProductPlus}
              handleQuantityInput={handleInputQuantity}
              quantity={quantity ? quantity : 0}
            />
          ) : (
            <SearchButton classNames={style.buttons__order} handleClick={handleProductPlus} label="Order Now" />
          )}
        </div>
      </div>
    </div>
  );
};
