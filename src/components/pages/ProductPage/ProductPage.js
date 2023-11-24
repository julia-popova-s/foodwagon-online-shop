import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-use';

import { addProduct, deleteOneProduct, setProductCount } from '../../../store/reducers/cart';
import { fetchProduct, isLoadedSelector, productSelector } from '../../../store/reducers/product';
import { RestaurantPage } from '../RestaurantPage/RestaurantPage';
import { Card } from './Card';
import { LoaderLeft } from './LoaderLeft';
import { LoaderRight } from './LoaderRight';
import style from './productPage.module.scss';

function ProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { pathname } = useLocation();

  const isLoaded = useSelector(isLoadedSelector);
  const product = useSelector(productSelector);

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

  const handleAddProduct = product => {
    dispatch(addProduct(product));
  };

  const handleRemoveProduct = product => {
    dispatch(deleteOneProduct(product));
  };

  const handleInputCount = obj => {
    dispatch(setProductCount(obj));
  };

  return (
    <>
      <div className={style.productPage}>
        <div className="container">
          <div className={style.product}>
            {isLoaded && product
              ? product.map((item, i) => (
                  <Card
                    {...item}
                    handleAddProduct={handleAddProduct}
                    handleInputCount={handleInputCount}
                    handleRemoveProduct={handleRemoveProduct}
                    key={`${item.id}${i}`}
                  />
                ))
              : Array(1)
                  .fill(0)
                  .map((_, index) => (
                    <div className={style.placeholder} key={index}>
                      <LoaderLeft />
                      <LoaderRight />
                    </div>
                  ))}
          </div>
        </div>
      </div>
      <RestaurantPage />
    </>
  );
}
export default ProductPage;
