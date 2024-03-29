import cn from 'classnames';
import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Counter } from '../../ui/Counter';
import { Discount } from '../../ui/Discount/Discount';
import { BrandName } from '../BrandName';
import { PriceBlock } from '../PriceBlock';
import style from './productCard.module.scss';

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

type Idx = { id: string; restaurantId: string };

type ProductCardProps = {
  amount: number;
  classNames?: string;
  discount: number;
  handleCountInput: (item: ProductQuantity) => void;
  handleProductAdd: (item: Product) => void;
  handleProductDelete: ({ id, restaurantId }: Idx) => void;
  handleProductRemove: (item: Idx) => void;
  id: string;
  image: string;
  price: number;
  quantity: number;
  restaurantId: string;
  restaurantName: string;
  title: string;
};

export const ProductCard: FC<ProductCardProps> = ({
  amount,
  discount,
  handleCountInput,
  handleProductAdd,
  handleProductDelete,
  handleProductRemove,
  id,
  image,
  price,
  quantity,
  restaurantId,
  restaurantName,
  title,
}) => {
  const [isReturned, setIsReturned] = useState(false);
  const handleProductExclusion = () => setIsReturned(true);

  const productInfo = {
    discount,
    id,
    image,
    price,
    restaurantId,
    restaurantName,
    title,
  };

  const handleProductPlus = () => handleProductAdd(productInfo);

  const handleProductMinus = () => handleProductDelete({ id, restaurantId });

  const handleProductReturn = () => setIsReturned(false);

  const handleQuantityInput = (quantity: number) => {
    if (!quantity) {
      setIsReturned(true);
    } else handleCountInput({ id, price, quantity, restaurantId });
  };

  useEffect(() => {
    if (isReturned) {
      const timer = setTimeout(() => {
        handleProductRemove({ id, restaurantId });
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isReturned]);

  return (
    <div className={style.product}>
      <div className={style.product__image}>
        <Link className={style.product__imageLink} to={`/restaurant/${restaurantId}/product/${id}`}>
          <img alt={title} className={style.product__img} src={process.env.PUBLIC_URL + image} />

          {discount > 0 && <Discount classNames={style.product__discount} discount={discount} view={'smallLabel'} />}
        </Link>
      </div>

      {!isReturned ? (
        <>
          <div className={cn(style.product__info, style.info)}>
            <p className={style.info__title}>
              <Link className={style.info__titleLink} to={`/restaurant/${restaurantId}/product/${id}`}>
                {title}
              </Link>
            </p>

            <BrandName
              classNames={style.info__name}
              id={id}
              restaurantId={restaurantId}
              restaurantName={restaurantName}
            />

            <PriceBlock discount={discount} price={price} />
          </div>

          <div className={cn(style.product__counter, style.counter)}>
            <Counter
              classNames={style.counter__btns}
              handleProductMinus={handleProductMinus}
              handleProductPlus={handleProductPlus}
              handleQuantityInput={handleQuantityInput}
              quantity={quantity}
            />

            <div className={style.counter__price}>&#36; {amount && amount.toFixed(2)}</div>

            <button className={cn(style.product__btnDelete, style.btnDelete)} onClick={handleProductExclusion}>
              {'x'}
            </button>
          </div>
        </>
      ) : (
        <div className={style.returnedBlock}>
          <button className={cn(style.btnReturn, style.product__btnReturn)} onClick={handleProductReturn}>
            Restore to cart
          </button>

          <div className={cn(style.loadingBar, style.product__loadingBar)}>
            <div className={style.loadingBar__inner}>
              <div className={style.loadingBar__shadow}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
