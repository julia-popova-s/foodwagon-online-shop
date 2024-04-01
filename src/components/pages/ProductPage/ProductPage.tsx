import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useScrollTo } from '../../../hooks/useScrollTo';
import { useAppDispatch, useAppSelector } from '../../../store';
import { addProduct, deleteOneProduct, setProductCount } from '../../../store/slices/cart/slice';
import { Product, ProductInfoQuantity } from '../../../store/slices/cart/types';
import { fetchProduct, isLoadedSelector, productSelector } from '../../../store/slices/product/slice';
import { RestaurantMenu } from '../../blocks/RestaurantMenu';
import { ProductDetails } from '../../elements/ProductDetails';
import { LoaderLeft } from './LoaderLeft';
import { LoaderRight } from './LoaderRight';
import style from './productPage.module.scss';

export const ProductPage: FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const isLoaded = useAppSelector(isLoadedSelector);
  const product = useAppSelector(productSelector);
  const [productItem] = product;

  useScrollTo();

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
              <ProductDetails
                {...productItem}
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
      <RestaurantMenu />
    </>
  );
};
