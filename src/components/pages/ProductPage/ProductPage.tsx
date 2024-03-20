import { FC, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../store';
import { addProduct, deleteOneProduct, setProductCount } from '../../../store/slices/cart/slice';
import { Product, ProductInfoQuantity } from '../../../store/slices/cart/types';
import { fetchProduct, isLoadedSelector, productSelector } from '../../../store/slices/product/slice';
import { RestaurantPage } from '../RestaurantPage/RestaurantPage';
import { Card } from './Card';
import { LoaderLeft } from './LoaderLeft';
import { LoaderRight } from './LoaderRight';
import style from './productPage.module.scss';

export const ProductPage: FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const { pathname } = useLocation();

  const isLoaded = useAppSelector(isLoadedSelector);
  const [product] = useAppSelector(productSelector);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    dispatch(
      fetchProduct({
        id,
        limit: 1,
      }),
    );
  }, [id, dispatch]);

  const handleProductAdd = (product: Product) => {
    dispatch(addProduct(product));
  };

  const handleProductRemove = (product: Product) => {
    dispatch(deleteOneProduct(product));
  };

  const handleCountInput = (obj: ProductInfoQuantity) => {
    dispatch(setProductCount(obj));
  };

  const skeleton = new Array(1).fill(0).map((_, index) => (
    <div className={style.placeholder} key={index}>
      <LoaderLeft />
      <LoaderRight />
    </div>
  ));

  return (
    <>
      <div className={style.productPage}>
        <div className="container">
          <h1 className={style.title}>Restaurant menu</h1>
          <div className={style.product}>
            {isLoaded ? (
              <Card
                {...product}
                handleCountInput={handleCountInput}
                handleProductAdd={handleProductAdd}
                handleProductRemove={handleProductRemove}
              />
            ) : (
              skeleton
            )}
          </div>
        </div>
      </div>
      <RestaurantPage />
    </>
  );
};
