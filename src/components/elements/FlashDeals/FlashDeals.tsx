import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  fetchProductsWithDiscount,
  productListSelector,
  statusSelector,
} from '../../../store/reducers/productsWithDiscount';
import { FlashDealCard } from './FlashDealCard';
import { Loader } from './Loader';
import style from './flashDeals.module.scss';

const restaurantId = '333f1471-d10f-4b1d-a654-d3c070cb3500';

export const FlashDeals: FC = () => {
  const dispatch = useDispatch<any>();

  const products = useSelector(productListSelector);
  const status = useSelector(statusSelector);

  useEffect(() => {
    dispatch(
      fetchProductsWithDiscount({
        limit: 4,
        order: 'desc',
        restaurantId,
        sortType: 'discount',
      }),
    );
  }, [restaurantId]);

  return (
    <div className={style.flashDeals}>
      <div className="container">
        <div className={style.discountBlock}>
          {status === 'resolve' && products
            ? products.map((item, i) => {
                return (
                  <Link key={`${item.id}_${i}`} to={`restaurant/${restaurantId}/product/${item.id}`}>
                    <FlashDealCard {...item} />
                  </Link>
                );
              })
            : new Array(4).fill(0).map((_, index) => <Loader key={index} />)}
        </div>
      </div>
    </div>
  );
};
